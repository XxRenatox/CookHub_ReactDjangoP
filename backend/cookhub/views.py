from django.shortcuts import render, redirect
from cookhub.forms import RecetaForm
from cookhub.models import Receta
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backend.settings import SUPABASE_KEY, SUPABASE_URL
import io
import json
import datetime
import jwt
from supabase import create_client, Client

url = SUPABASE_URL
key = SUPABASE_KEY

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
    cantidad = request.GET.get('cantidad', None)

    query = supabase.table("recetas").select("*").limit(cantidad)

    if pop:
        query = query.order("calificacion", desc=True).limit(cantidad)  # Cambié a 'desc=True'

    if categoria:
        query = query.eq("categoria", categoria).limit(cantidad)

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

@csrf_exempt
def create_recipe(request):
    if request.method == "POST":
        try:
            # Obtener datos desde request.POST y archivo desde request.FILES
            titulo = request.POST.get("titulo")
            instrucciones = request.POST.get("instrucciones")
            ingredientes = request.POST.get("ingredientes")
            categoria = request.POST.get("categoria")
            area = request.POST.get("area")
            dificultad = request.POST.get("dificultad")
            nombre_usuario = request.POST.get("usuario")
            image_file = request.FILES.get("imagen")

            # Validación de datos
            if not titulo or not instrucciones or not ingredientes:
                return JsonResponse({'error': 'Faltan campos obligatorios.'}, status=400)

            # Guardar la imagen en Supabase Storage
            image_url = None
            if image_file:
                bucket_name = 'recetas'
                image_path = f"{titulo}_{image_file.name}"

                # Leer el contenido del archivo directamente en memoria
                image_data = image_file.read()

                # Subir el archivo a Supabase
                upload_response = supabase.storage.from_(bucket_name).upload(image_path, image_data)

                # Verificar si la carga fue exitosa
                if upload_response.status_code == 201:
                    # Obtener la URL pública de la imagen
                    image_url = supabase.storage.from_(bucket_name).get_public_url(image_path)
                else:
                    return JsonResponse({'error': 'Error al subir la imagen.'}, status=upload_response.status_code)

            # Guardar la receta en la tabla `recetas`
            response = supabase.table('recetas').insert({
                "titulo": titulo,
                "imagen": image_url,
                "instrucciones": instrucciones,
                "ingredientes": ingredientes,
                "categoria": categoria,
                "area": area,
                "calificacion":0,
                "nivel_dificultad": dificultad,
                "nombre_usuario": nombre_usuario
            }).execute()

            if response.status_code == 201:
                return JsonResponse({'message': 'Receta creada con éxito'}, status=201)
            else:
                return JsonResponse({'error': 'Error al guardar la receta en la base de datos'}, status=response.status_code)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Error en el formato de los datos enviados. Asegúrate de enviar un JSON válido.'}, status=400)
        except Exception as e:
            print(e)  # Para depuración
            return JsonResponse({'error': 'Error interno del servidor. Inténtalo nuevamente más tarde.'}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)