from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import json
from supabase import create_client, Client

url = 'https://owfqkurwrubndhcmsyzb.supabase.co'
key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93ZnFrdXJ3cnVibmRoY21zeXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxOTU0NTMsImV4cCI6MjA0Mzc3MTQ1M30.NbVrg2PMHyaVV9wafWqxGhyjrxPGH9W5dkD8-IWUKzU'

supabase: Client = create_client(url, key)

def home(request):
    return render(request, 'index.html')

def getProducts(request):
    query = supabase.table("productos").select("*").execute()

    data = query.data if query.data else []
    
    return JsonResponse({"products": data}, status=200)

def getRecipes(request):
    categoria = request.GET.get('categoria', None)
    filtro = request.GET.get('filtro', None)
    pop = request.GET.get('calificacion', None)

    query = supabase.table("recetas").select("*").limit(6)

    if pop:
        query = query.order("calificacion", desc=True).limit(3)  # Cambié a 'desc=True'

    if categoria:
        query = query.eq("categoria", categoria)

    if filtro:
        query = query.eq("nivel_dificultad", filtro)

    query_result = query.execute()
    data = query_result.data if query_result.data else []

    return JsonResponse({'recipes': data}, status=200)

@csrf_exempt  # Asegúrate de agregar esto si necesitas deshabilitar CSRF para pruebas
def submit_rating(request, recipe_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nueva_calificacion = data.get('calificacion', None)  # Cambié de data.GET a data.get

            if nueva_calificacion is None:
                return JsonResponse({'message': 'Calificación no proporcionada'}, status=400)

            # Obtener la calificación anterior
            receta = supabase.table("recetas").select("calificacion").eq("id", recipe_id).execute()
            print(receta)
            calificacion_anterior = receta.data[0]["calificacion"] if receta.data else 0
            
            # Calcular la nueva calificación (promedio, por ejemplo)
            nueva_calificacion_final = (calificacion_anterior + nueva_calificacion) / 2  # Cambia esto según tu lógica

            # Actualiza la calificación en la base de datos
            supabase.table("recetas").update({"calificacion": nueva_calificacion_final}).eq("id", recipe_id).execute()

            return JsonResponse({'message': 'Calificación actualizada', 'status': 'success'}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Error al procesar los datos'}, status=400)

    return JsonResponse({'message': 'Método no permitido'}, status=405)

            
@csrf_exempt
def loginUser(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            passwd = data.get("passwd")

            if not email or not passwd:
                return JsonResponse({'error': 'Faltan campos obligatorios (email, password)'}, status=400)

            # Intentar iniciar sesión
            response = supabase.auth.sign_in_with_password({"email": email, "password": passwd})

            # Verificar si hay un error en la respuesta
            if response.get("error"):
                error_message = response["error"]["message"]
                # Manejar errores específicos como "Credenciales incorrectas"
                if "Invalid login credentials" in error_message:
                    return JsonResponse({'error': 'Credenciales incorrectas. Verifica tu correo y contraseña.'}, status=401)
                return JsonResponse({'error': error_message}, status=400)

            # Verificar si la cuenta no está verificada
            if not response.get("user").get("confirmed_at"):
                return JsonResponse({'error': 'Cuenta no verificada. Por favor, verifica tu correo.'}, status=403)

            return JsonResponse({'message': 'Inicio de sesión exitoso'}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Error en el formato de los datos enviados. Asegúrate de enviar un JSON válido.'}, status=400)
        except Exception as e:
            print(e)  # Para depuración
            return JsonResponse({'error': 'Error interno del servidor. Inténtalo nuevamente más tarde.'}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def registerUser(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get("email")
            passwd = data.get("passwd")
            username = data.get("username")

            if not email or not passwd or not username:
                return JsonResponse({'error': 'Faltan campos obligatorios (email, password, username)'}, status=400)

            # Intentar registrar al usuario en Supabase
            response = supabase.auth.sign_up({"email": email, "password": passwd})

            # Verifica si hay un error en la respuesta
            if response.get("error"):
                error_message = response["error"]["message"]
                # Manejar errores específicos como "Usuario ya registrado"
                if "already registered" in error_message:
                    return JsonResponse({'error': 'Este correo ya está registrado'}, status=409)
                return JsonResponse({'error': error_message}, status=400)

            return JsonResponse({'message': 'Usuario creado con éxito'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Error en el formato de los datos enviados. Asegúrate de enviar un JSON válido.'}, status=400)
        except Exception as e:
            print(e)  # Para depuración
            return JsonResponse({'error': 'Error interno del servidor. Inténtalo nuevamente más tarde.'}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
