from django.db import models
from django.contrib.auth.models import User

class Proveedor(models.Model):
    TIPOS_SERVICIO = [
        ('cuidado', 'Cuidado'),
        ('asistencia', 'Asistencia Médica'),
        ('acompanamiento', 'Acompañamiento'),
    ]

    nombre = models.CharField(max_length=100)
    comuna = models.CharField(max_length=50)
    tipo_servicio = models.CharField(max_length=20, choices=TIPOS_SERVICIO)
    especialidad = models.CharField(max_length=100)  # filtro
    experiencia = models.TextField()
    imagen = models.URLField()
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='proveedor_profile')

    def __str__(self):
        return f"{self.nombre} - {self.tipo_servicio}"

class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    correo = models.EmailField()
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, default='pendiente')

    def __str__(self):
        return f"Contacto de {self.nombre}"

class Solicitud(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('aceptada', 'Aceptada'),
        ('rechazada', 'Rechazada'),
        ('completada', 'Completada'),
    ]

    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='solicitudes')
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name='solicitudes')
    descripcion = models.TextField()
    fecha_requerida = models.DateTimeField()
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')
    fecha_solicitud = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Solicitud de {self.usuario} para {self.proveedor}"