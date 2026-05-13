from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class PerfilUsuario(models.Model):
    ROLES = [
        ('solicitante', 'Solicitante de servicio'),
        ('cuidador', 'Cuidador/a'),
        ('profesional', 'Profesional de salud'),
        ('acompañante', 'Acompañante'),
    ]

    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    rol = models.CharField(max_length=20, choices=ROLES, default='solicitante')
    telefono = models.CharField(max_length=20, blank=True)
    profesion = models.CharField(max_length=100, blank=True, help_text="Profesión específica (solo para profesionales de salud)")
    experiencia = models.TextField(blank=True, help_text="Experiencia laboral y formación")
    certificado = models.FileField(upload_to='certificados/', blank=True, null=True, help_text="Certificado o documentación de validación")
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.usuario.get_full_name() or self.usuario.username} - {self.rol}"

    def es_profesional_salud(self):
        return self.rol == 'profesional'


class DocumentoVerificacion(models.Model):
    TIPOS_DOCUMENTO = [
        ('licencia', 'Licencia Profesional'),
        ('certificado', 'Certificado de Capacitación'),
        ('credencial', 'Credencial Médica'),
        ('otro', 'Otro documento'),
    ]
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('aprobado', 'Aprobado'),
        ('rechazado', 'Rechazado'),
    ]

    perfil = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, related_name='documentos_verificacion')
    tipo_documento = models.CharField(max_length=20, choices=TIPOS_DOCUMENTO)
    descripcion = models.CharField(max_length=255)
    archivo = models.FileField(upload_to='documentos_verificacion/')
    fecha_subida = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')
    notas_verificacion = models.TextField(blank=True, help_text="Notas del verificador")

    def __str__(self):
        return f"{self.perfil.usuario.username} - {self.tipo_documento}"

    class Meta:
        ordering = ['-fecha_subida']

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


class Evaluacion(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='evaluaciones_realizadas')
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name='evaluaciones_recibidas')
    solicitud = models.OneToOneField(Solicitud, on_delete=models.CASCADE, related_name='evaluacion', null=True, blank=True)
    calificacion = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], help_text="Calificación de 1 a 5 estrellas")
    comentario = models.TextField(blank=True, help_text="Comentario detallado sobre el servicio")
    fecha_evaluacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Evaluación de {self.usuario} a {self.proveedor} ({self.calificacion}★)"

    class Meta:
        ordering = ['-fecha_evaluacion']
        unique_together = ('usuario', 'proveedor')