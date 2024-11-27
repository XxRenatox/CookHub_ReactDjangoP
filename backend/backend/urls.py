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
    path('api/recetas/setfav/<uuid:user_id>/<uuid:recipe_id>/', views.set_fav, name='set_fav'),

    # Authentication
    path('api/login/', views.login_user, name="login_user"),
    path('api/register/', views.register_user, name="register_user"),
    
    # User
    path('api/user/addpreference/<uuid:user_id>/', views.add_preference, name='add_preference'),
    
    #Admin
    
    path('api/admin/getdata', views.get_datausers_datasubs, name='get_datausers'),
    
    # Subscriptions
    
    path('api/subs/subscribe/', views.subscribe, name='subscribe'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)