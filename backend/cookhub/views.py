from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backend.settings import SUPABASE_KEY, SUPABASE_URL, SECRET_KEY, JWT_EXPIRATION_SECONDS
from supabase import create_client, Client
from django.utils import timezone
from datetime import datetime, timedelta
import jwt
import json
import bcrypt

# Configura tu cliente Supabase
url = SUPABASE_URL
key = SUPABASE_KEY
supabase: Client = create_client(url, key)

# Página de inicio
def home(request):
    return render(request, 'index.html')

# Obtener productos
def get_products(request):
    try:
        query = supabase.table("productos").select("*").execute()
        data = query.data if query.data else []
        return JsonResponse({"products": data}, status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"error": "Error interno al obtener productos"}, status=500)

# Obtener recetas con filtros
def get_recipes(request):
    try:
        categoria = request.GET.get('categoria')
        filtro = request.GET.get('filtro')
        pop = request.GET.get('calificacion')
        cantidad = request.GET.get('cantidad', 10)  # Valor por defecto

        query = supabase.table("recetas").select("*").limit(cantidad)

        if pop:
            query = query.order("calificacion", desc=True)

        if categoria:
            query = query.eq("categoria", categoria)

        if filtro:
            query = query.eq("nivel_dificultad", filtro)

        query_result = query.execute()
        data = query_result.data if query_result.data else []

        return JsonResponse({'recipes': data}, status=200)
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Error interno al obtener recetas'}, status=500)

# Enviar calificación
@csrf_exempt
def submit_rating(request, recipe_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nueva_calificacion = data.get('calificacion')

            if nueva_calificacion is None:
                return JsonResponse({'message': 'Calificación no proporcionada'}, status=400)

            receta = supabase.table("recetas").select("calificacion").eq("id", recipe_id).execute()
            if not receta.data:
                return JsonResponse({'message': 'Receta no encontrada'}, status=404)

            calificacion_anterior = receta.data[0]["calificacion"] or 0
            nueva_calificacion_final = (calificacion_anterior + nueva_calificacion) / 2

            supabase.table("recetas").update({"calificacion": nueva_calificacion_final}).eq("id", recipe_id).execute()
            return JsonResponse({'message': 'Calificación actualizada', 'status': 'success'}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Error al procesar los datos'}, status=400)
        except Exception as e:
            print(e)
            return JsonResponse({'message': 'Error interno del servidor'}, status=500)
    return JsonResponse({'message': 'Método no permitido'}, status=405)

# Iniciar sesión

@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("correo_electronico")
            passwd = data.get("contrasena")

            if not email or not passwd:
                return JsonResponse({'error': 'Faltan campos obligatorios'}, status=400)

            usuario = supabase.table("usuarios").select("id, correo_electronico, contrasena, nombre, es_premium").eq("correo_electronico", email).execute()
            if not usuario.data:
                return JsonResponse({'error': 'Credenciales incorrectas'}, status=401)

            user = usuario.data[0]
            if not bcrypt.checkpw(passwd.encode('utf-8'), user["contrasena"].encode('utf-8')):
                return JsonResponse({'error': 'Credenciales incorrectas'}, status=401)

            # Generar el token JWT
            payload = {
                "user_id": user["id"],
                "nombre": user["nombre"],
                "correo_electronico": user["correo_electronico"],
                "premium": user["es_premium"],
                "exp": datetime.utcnow() + timedelta(seconds=JWT_EXPIRATION_SECONDS),
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

            return JsonResponse({'token': token, 'message': 'Inicio de sesión exitoso'}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato de datos inválido'}, status=400)
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Error interno del servidor'}, status=500)
    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get("correo_electronico")
            passwd = data.get("contrasena")
            username = data.get("nombre")

            if not email or not passwd or not username:
                return JsonResponse({'error': 'Faltan campos obligatorios'}, status=400)

            # Verificar si el correo ya existe
            existing_user = supabase.table("usuarios").select("*").eq("correo_electronico", email).execute()
            if existing_user.data:
                return JsonResponse({'error': 'Este correo ya está registrado'}, status=409)

            # Crear el nuevo usuario
            hashed_password = bcrypt.hashpw(passwd.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            new_user = supabase.table("usuarios").insert({
                "nombre": username,
                "correo_electronico": email,
                "contrasena": hashed_password,
                "fecha_creacion": timezone.now().strftime("%Y-%m-%d")
            }).execute()

            if not new_user.data:
                return JsonResponse({'error': 'Error al crear el usuario'}, status=500)

            # Generar el token JWT
            user_id = new_user.data[0]['id']
            payload = {
                "user_id": user_id,
                "correo_electronico": email,
                "nombre":username,
                "exp": datetime.utcnow() + timedelta(seconds=JWT_EXPIRATION_SECONDS),
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

            return JsonResponse({'message': 'Usuario creado con éxito', 'token': token}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato de datos inválido'}, status=400)
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Error interno del servidor'}, status=500)
    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def create_recipe(request):
    if request.method != "POST":
        return JsonResponse({'error': 'Método no permitido'}, status=405)

    try:
        # Leer datos del formulario
        titulo = request.POST.get("titulo")
        instrucciones = request.POST.get("instrucciones")
        ingredientes = request.POST.get("ingredientes")
        categoria = request.POST.get("categoria")
        area = request.POST.get("area")
        dificultad = request.POST.get("dificultad")
        nombre_usuario = request.POST.get("usuario")
        user_id = request.POST.get("id")
        image_file = request.FILES.get("imagen")

        # Validar campos obligatorios
        if not titulo or not instrucciones or not ingredientes:
            return JsonResponse(
                {'error': 'Faltan campos obligatorios (título, instrucciones, ingredientes).'},
                status=400
            )

        # Convertir los ingredientes de la cadena JSON a una lista de diccionarios
        try:
            ingredientes_parsed = json.loads(ingredientes)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato de ingredientes inválido.'}, status=400)

        # Manejar la subida de la imagen
        image_url = None
        if image_file:
            bucket_name = 'recetasUsuarios'
            image_path = f"{titulo}_{image_file.name}"

            try:
                # Subir la imagen a Supabase
                supabase.storage.from_(bucket_name).upload(image_path, image_file.read())

                # Obtener URL pública de la imagen
                image_url = supabase.storage.from_(bucket_name).get_public_url(image_path)
            except Exception as e:
                return JsonResponse(
                    {'error': f'El Titulo de la receta ya esta ingresado'},
                    status=500
                )

        # Preparar los datos para insertar
        receta_data = {
            "titulo": titulo,
            "imagen": image_url,
            "instrucciones": instrucciones,
            "categoria": categoria,
            "area": area,
            "youtube_link": "",
            "ingredientes": ingredientes_parsed,  # Aquí usamos los ingredientes procesados
            "calificacion": 0,
            "nivel_dificultad": dificultad,
            "usuario_id":str(user_id),
            "creador_nombre": nombre_usuario
        }

        # Insertar la receta en la tabla 'recetas'
        response = supabase.table('recetas').insert([receta_data]).execute()
        
        supabase.table('recetas_usuarios').insert({"receta_id":response.data[0]['id'], "usuario_id": user_id}).execute()

        return JsonResponse({'message': 'Receta creada con éxito'}, status=201)

    except Exception as e:
        print(f"Error interno: {e}")
        return JsonResponse({'error': 'Error interno del servidor'}, status=500)

@csrf_exempt
def subscribe(request):
    if request.method != "POST":
        return JsonResponse({'error': 'Método no permitido'}, status=405)

    try:
        # Leer datos del formulario
        data = json.loads(request.body)
        
        # Validación de campos
        required_fields = [
            "nombre", "correo", "direccion", "ciudad", "estado",
            "codigoPostal", "pais", "metodoPago", "numeroTarjeta",
            "fechaVencimiento", "cvv"
        ]
        for field in required_fields:
            if not data.get(field):
                return JsonResponse({"message": f"El campo {field} es obligatorio."}, status=400)
        
        # Validar número de tarjeta
        if len(data["numeroTarjeta"]) != 16 or not data["numeroTarjeta"].isdigit():
            return JsonResponse({"message": "Número de tarjeta no válido (16 dígitos requeridos)."}, status=400)
        
        # Validar fecha de vencimiento
        try:
            month, year = map(int, data["fechaVencimiento"].split("/"))
            if month < 1 or month > 12:
                return JsonResponse({"message": "Mes de vencimiento no válido."}, status=400)
        except ValueError:
            return JsonResponse({"message": "Formato de fecha de vencimiento no válido (MM/YY requerido)."}, status=400)

        # Encriptar la información de la tarjeta
        data["numeroTarjeta"] = bcrypt.hashpw(data["numeroTarjeta"].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        data["cvv"] = bcrypt.hashpw(data["cvv"].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Preparar los datos para insertar
        suscripcion_data = {
            "nombre": data["nombre"],
            "correo": data["correo"],
            "direccion": data["direccion"],
            "ciudad": data["ciudad"],
            "estado": data["estado"],
            "codigopostal": data["codigoPostal"],
            "pais": data["pais"],
            "metodopago": data["metodoPago"],
            "numerotarjeta": data["numeroTarjeta"],
            "fechavencimiento": data["fechaVencimiento"],
            "cvv": data["cvv"],
            "id_usuario": data["id_usuario"],
            "fecha_inicio": datetime.now().strftime("%Y-%m-%d"),
            "fecha_expiracion": (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
        }

        # Insertar la suscripción en la tabla 'subscripciones'
        response = supabase.table('subscripciones').insert([suscripcion_data]).execute()
        
        # Actualizar el campo es_premium del usuario
        supabase.table("usuarios").update({"es_premium": True}).eq("id", data["id_usuario"]).execute()
        
        return JsonResponse({'message': 'Suscripción realizada con éxito'}, status=201)

    except Exception as e:
        print(f"Error interno: {e}")
        return JsonResponse({'error': 'Error interno del servidor'}, status=500)