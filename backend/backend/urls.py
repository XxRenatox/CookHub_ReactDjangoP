"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from cookhub import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path('api/productos', views.getProducts),
    path('api/recetas', views.getRecipes),
    path('api/recetas/<uuid:recipe_id>/calificacion', views.submit_rating, name='submit_rating'),
    path('api/login/', views.loginUser, name="login_user"),
    path('api/register/', views.registerUser, name="register_user")
]
