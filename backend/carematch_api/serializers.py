from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Proveedor, Contacto, Solicitud

class UserSerializer(serializers.ModelSerializer):
    rol = serializers.CharField(default='solicitante')
    telefono = serializers.CharField(default='')

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'rol', 'telefono']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        rol = validated_data.pop('rol', 'solicitante')
        telefono = validated_data.pop('telefono', '')
        user = User.objects.create_user(**validated_data)
        # Aquí podríamos guardar el rol y teléfono en un perfil extendido si fuera necesario
        return user

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

    class Meta:
        model = Solicitud
        fields = ['id', 'usuario', 'proveedor', 'descripcion', 'fecha_requerida', 'estado', 'fecha_solicitud']