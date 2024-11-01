from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import json
import datetime
import jwt
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
            email = data.get("correo_electronico")
            passwd = data.get("contrasena")

            if not email or not passwd:
                return JsonResponse({'error': 'Faltan campos obligatorios (correo_electronico, contrasena)'}, status=400)

            # Intentar iniciar sesión verificando en la tabla usuarios
            usuario = supabase.table("usuarios").select("id nombre correo_electronico contrasena").eq("correo_electronico", email).eq("contrasena", passwd).execute()
            if not usuario.data:
                return JsonResponse({'error': 'Credenciales incorrectas. Verifica tu correo y contraseña.'}, status=401)

            user = usuario.data[0]  # Obtener el primer usuario

            payload = {
                'user_id': user['id'],  # O cualquier identificador único
                'nombre': user['nombre'],  # Asegúrate de tener este campo
                'correo_electronico': user['correo_electronico'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=2)  # Expira en 1 hora
            }
            token = jwt.encode(payload, key="xd" ,algorithm='HS256')

            return JsonResponse({'token': token, 'message': 'Inicio de sesión exitoso'}, status=200)

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
            email = data.get("correo_electronico")
            passwd = data.get("contrasena")
            username = data.get("nombre")

            if not email or not passwd or not username:
                return JsonResponse({'error': 'Faltan campos obligatorios (correo_electronico, contrasena, nombre)'}, status=400)

            # Verificar si el correo ya está registrado
            existing_user = supabase.table("usuarios").select("*").eq("correo_electronico", email).execute()
            if existing_user.data:
                return JsonResponse({'error': 'Este correo ya está registrado'}, status=409)

            # Registrar al nuevo usuario
            supabase.table("usuarios").insert({"nombre": username, "correo_electronico": email, "contrasena": passwd}).execute()

            return JsonResponse({'message': 'Usuario creado con éxito'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Error en el formato de los datos enviados. Asegúrate de enviar un JSON válido.'}, status=400)
        except Exception as e:
            print(e)  # Para depuración
            return JsonResponse({'error': 'Error interno del servidor. Inténtalo nuevamente más tarde.'}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
