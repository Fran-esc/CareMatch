from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Proveedor, Contacto, Solicitud, DocumentoVerificacion, Evaluacion

class UserSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(write_only=True, required=False)
    rol = serializers.CharField(source='perfil.rol', default='solicitante')
    telefono = serializers.CharField(source='perfil.telefono', default='', allow_blank=True)
    profesion = serializers.CharField(source='perfil.profesion', default='', allow_blank=True)
    experiencia = serializers.CharField(source='perfil.experiencia', default='', allow_blank=True)
    certificado = serializers.FileField(source='perfil.certificado', required=False, allow_null=True)
    fecha_creacion = serializers.DateTimeField(source='perfil.fecha_creacion', read_only=True)
    fecha_actualizacion = serializers.DateTimeField(source='perfil.fecha_actualizacion', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'nombre', 'rol', 'telefono', 'profesion', 'experiencia', 'certificado', 'fecha_creacion', 'fecha_actualizacion']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        nombre = validated_data.pop('nombre', '')
        perfil_data = validated_data.pop('perfil', {})

        # Usar el email como username cuando no se provea uno explícito
        email = validated_data.get('email')
        if email:
            validated_data['username'] = email

        # Si se envía nombre completo, separar en nombre y apellido
        if nombre and not validated_data.get('first_name'):
            parts = nombre.strip().split()
            validated_data['first_name'] = parts[0]
            validated_data['last_name'] = ' '.join(parts[1:]) if len(parts) > 1 else ''

        user = User.objects.create_user(**validated_data)
        from .models import PerfilUsuario
        PerfilUsuario.objects.create(usuario=user, **perfil_data)
        return user

    def update(self, instance, validated_data):
        nombre = validated_data.pop('nombre', None)
        perfil_data = validated_data.pop('perfil', {})
        password = validated_data.pop('password', None)

        instance = super().update(instance, validated_data)
        if password:
            instance.set_password(password)
            instance.save()

        if nombre:
            parts = nombre.strip().split()
            instance.first_name = parts[0]
            instance.last_name = ' '.join(parts[1:]) if len(parts) > 1 else ''
            instance.save()

        from .models import PerfilUsuario
        try:
            perfil = instance.perfil
        except PerfilUsuario.DoesNotExist:
            perfil = PerfilUsuario.objects.create(usuario=instance)

        if 'rol' in perfil_data:
            perfil.rol = perfil_data['rol']
        if 'telefono' in perfil_data:
            perfil.telefono = perfil_data['telefono']
        if 'profesion' in perfil_data:
            perfil.profesion = perfil_data['profesion']
        if 'experiencia' in perfil_data:
            perfil.experiencia = perfil_data['experiencia']
        if 'certificado' in perfil_data:
            perfil.certificado = perfil_data['certificado']
        perfil.save()

        return instance

class ProveedorSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)

    class Meta:
        model = Proveedor
        fields = ['id', 'nombre', 'comuna', 'tipo_servicio', 'especialidad', 'experiencia', 'imagen', 'usuario']

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = ['id', 'nombre', 'telefono', 'correo', 'mensaje', 'fecha', 'estado']

class SolicitudSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    proveedor = ProveedorSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(source='usuario', queryset=User.objects.all(), write_only=True, required=False)
    proveedor_id = serializers.PrimaryKeyRelatedField(source='proveedor', queryset=Proveedor.objects.all(), write_only=True)

    class Meta:
        model = Solicitud
        fields = ['id', 'usuario', 'proveedor', 'usuario_id', 'proveedor_id', 'descripcion', 'fecha_requerida', 'estado', 'fecha_solicitud']


class DocumentoVerificacionSerializer(serializers.ModelSerializer):
    perfil_usuario = serializers.StringRelatedField(source='perfil.usuario.username', read_only=True)

    class Meta:
        model = DocumentoVerificacion
        fields = ['id', 'perfil', 'perfil_usuario', 'tipo_documento', 'descripcion', 'archivo', 'fecha_subida', 'estado', 'notas_verificacion']
        read_only_fields = ['fecha_subida', 'estado']


class EvaluacionSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.StringRelatedField(source='usuario', read_only=True)
    proveedor_nombre = serializers.StringRelatedField(source='proveedor', read_only=True)

    class Meta:
        model = Evaluacion
        fields = ['id', 'usuario', 'usuario_nombre', 'proveedor', 'proveedor_nombre', 'solicitud', 'calificacion', 'comentario', 'fecha_evaluacion']
        read_only_fields = ['fecha_evaluacion']