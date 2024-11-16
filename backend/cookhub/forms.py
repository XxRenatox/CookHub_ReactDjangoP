from django import forms
from cookhub.models import Receta

class RecetaForm(forms.ModelForm):
    class Meta:
        model = Receta
        fields = ['id','titulo','imagen','instrucciones','categoria','area','youtube_link','ingredientes','calificacion','nivel_dificultad','nombre_usuario']
        widgets = {
            'id': forms.TextInput(attrs={'readonly': 'readonly', 'class': 'form-control'}),
            'titulo': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Título de la receta'}),
            'imagen': forms.FileInput(attrs={'class': 'form-control', 'placeholder': 'URL de la imagen'}),
            'instrucciones': forms.Textarea(attrs={'class': 'form-control', 'rows': 5, 'placeholder': 'Escribe las instrucciones aquí'}),
            'categoria': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Categoría'}),
            'area': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Región de origen'}),
            'youtube_link': forms.URLInput(attrs={'class': 'form-control', 'placeholder': 'Enlace a YouTube'}),
            'ingredientes': forms.Textarea(attrs={'class': 'form-control', 'rows': 3, 'placeholder': 'Ingredientes en formato JSON'}),
            'calificacion': forms.NumberInput(attrs={'class': 'form-control', 'min': 0, 'max': 5, 'step': 0.1}),
            'nivel_dificultad': forms.Select(attrs={'class': 'form-control'}),
            'nombre_usuario': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nombre del usuario'}),
        }