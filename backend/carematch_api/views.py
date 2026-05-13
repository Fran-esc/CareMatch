from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Proveedor, Contacto, Solicitud, DocumentoVerificacion, Evaluacion
from .serializers import UserSerializer, ProveedorSerializer, ContactoSerializer, SolicitudSerializer, DocumentoVerificacionSerializer, EvaluacionSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def registro(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        username = request.data.get('username') or request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            serializer = self.get_serializer(user)
            return Response({
                'user': serializer.data,
                'token': 'dummy-token'
            })
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['get', 'put', 'patch'], permission_classes=[AllowAny])
    def perfil(self, request):
        """Obtener y actualizar el perfil del usuario autenticado o por username/email."""
        user = request.user if request.user.is_authenticated else None
        if user is None:
            username = request.query_params.get('username') or request.data.get('username') or request.data.get('email')
            if username:
                try:
                    user = User.objects.get(username=username)
                except User.DoesNotExist:
                    return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'error': 'Debe enviar username, email o autenticación'}, status=status.HTTP_400_BAD_REQUEST)

        if request.method in ['PUT', 'PATCH']:
            serializer = self.get_serializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = self.get_serializer(user)
            return Response(serializer.data)

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

    def get_queryset(self):
        queryset = Proveedor.objects.all()
        tipo = self.request.query_params.get('tipo', None)
        if tipo is not None:
            queryset = queryset.filter(tipo_servicio=tipo)
        return queryset

class ContactoViewSet(viewsets.ModelViewSet):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer

class SolicitudViewSet(viewsets.ModelViewSet):
    queryset = Solicitud.objects.all()
    serializer_class = SolicitudSerializer

    def get_queryset(self):
        queryset = Solicitud.objects.all()
        usuario_id = self.request.query_params.get('usuario_id', None)
        if usuario_id is not None:
            queryset = queryset.filter(usuario_id=usuario_id)
        return queryset


class DocumentoVerificacionViewSet(viewsets.ModelViewSet):
    queryset = DocumentoVerificacion.objects.all()
    serializer_class = DocumentoVerificacionSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        queryset = DocumentoVerificacion.objects.all()
        perfil_id = self.request.query_params.get('perfil_id', None)
        if perfil_id is not None:
            queryset = queryset.filter(perfil_id=perfil_id)
        return queryset


class EvaluacionViewSet(viewsets.ModelViewSet):
    queryset = Evaluacion.objects.all()
    serializer_class = EvaluacionSerializer

    def get_queryset(self):
        queryset = Evaluacion.objects.all()
        usuario_id = self.request.query_params.get('usuario_id', None)
        proveedor_id = self.request.query_params.get('proveedor_id', None)
        if usuario_id is not None:
            queryset = queryset.filter(usuario_id=usuario_id)
        if proveedor_id is not None:
            queryset = queryset.filter(proveedor_id=proveedor_id)
        return queryset