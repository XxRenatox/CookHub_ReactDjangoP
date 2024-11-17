from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from cookhub import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # API Endpoints
    path('api/productos/', views.get_products, name='get_products'),
    path('api/recetas/', views.get_recipes, name='get_recipes'),
    path('api/recetas/<uuid:recipe_id>/calificacion/', views.submit_rating, name='submit_rating'),
    path('api/recetas/create/', views.create_recipe, name='create_recipe'),

    # Authentication
    path('api/login/', views.login_user, name="login_user"),
    path('api/register/', views.register_user, name="register_user"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)