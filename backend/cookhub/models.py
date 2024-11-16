from django.db import models



class Receta(models.Model):
        id = models.UUIDField(primary_key=True)
        titulo = models.CharField(max_length=255)
        imagen = models.FileField(upload_to='receta')
        instrucciones = models.TextField()
        categoria = models.CharField(max_length=60)
        area = models.CharField(max_length=60)
        youtube_link = models.CharField(max_length=255, blank=True, null=True)
        ingredientes = models.JSONField()
        calificacion = models.FloatField(blank=True, null=True)
        nivel_dificultad = models.CharField(max_length=60)
        nombre_usuario = models.CharField(max_length=60)

        def __str__(self):
            return self.titulo



