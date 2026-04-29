from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from carematch_api.models import Proveedor

class Command(BaseCommand):
    help = 'Load initial provider data'

    def handle(self, *args, **options):
        # Crear usuarios para proveedores
        users_data = [
            {'username': 'maria_garcia', 'first_name': 'María', 'last_name': 'García', 'email': 'maria@example.com'},
            {'username': 'juan_perez', 'first_name': 'Juan', 'last_name': 'Pérez', 'email': 'juan@example.com'},
            {'username': 'ana_lopez', 'first_name': 'Ana', 'last_name': 'López', 'email': 'ana@example.com'},
            {'username': 'carlos_rodriguez', 'first_name': 'Carlos', 'last_name': 'Rodríguez', 'email': 'carlos@example.com'},
            {'username': 'laura_martinez', 'first_name': 'Laura', 'last_name': 'Martínez', 'email': 'laura@example.com'},
            {'username': 'pedro_sanchez', 'first_name': 'Pedro', 'last_name': 'Sánchez', 'email': 'pedro@example.com'},
        ]

        providers_data = [
            {
                'nombre': 'María García',
                'comuna': 'Santiago Centro',
                'tipo_servicio': 'cuidado',
                'especialidad': 'Cuidado de adultos mayores',
                'experiencia': '5 años de experiencia en cuidado de adultos mayores. Especializada en pacientes con Alzheimer.',
                'imagen': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
                'user_index': 0
            },
            {
                'nombre': 'Juan Pérez',
                'comuna': 'Providencia',
                'tipo_servicio': 'asistencia',
                'especialidad': 'Asistencia médica domiciliaria',
                'experiencia': 'Enfermero titulado con 8 años de experiencia en atención domiciliaria.',
                'imagen': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
                'user_index': 1
            },
            {
                'nombre': 'Ana López',
                'comuna': 'Las Condes',
                'tipo_servicio': 'acompanamiento',
                'especialidad': 'Acompañamiento terapéutico',
                'experiencia': 'Psicóloga especializada en acompañamiento terapéutico para personas con discapacidad.',
                'imagen': 'https://images.unsplash.com/photo-1594824804732-ca8db723f8fa?w=400',
                'user_index': 2
            },
            {
                'nombre': 'Carlos Rodríguez',
                'comuna': 'Ñuñoa',
                'tipo_servicio': 'cuidado',
                'especialidad': 'Cuidado infantil',
                'experiencia': 'Educadora de párvulos con experiencia en cuidado de niños con necesidades especiales.',
                'imagen': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
                'user_index': 3
            },
            {
                'nombre': 'Laura Martínez',
                'comuna': 'Vitacura',
                'tipo_servicio': 'asistencia',
                'especialidad': 'Fisioterapia domiciliaria',
                'experiencia': 'Fisioterapeuta con especialización en rehabilitación neurológica.',
                'imagen': 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400',
                'user_index': 4
            },
            {
                'nombre': 'Pedro Sánchez',
                'comuna': 'La Reina',
                'tipo_servicio': 'acompanamiento',
                'especialidad': 'Acompañamiento social',
                'experiencia': 'Trabajador social con experiencia en acompañamiento de personas en situación de vulnerabilidad.',
                'imagen': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                'user_index': 5
            },
        ]

        # Crear usuarios
        users = []
        for user_data in users_data:
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    'first_name': user_data['first_name'],
                    'last_name': user_data['last_name'],
                    'email': user_data['email'],
                }
            )
            users.append(user)
            if created:
                user.set_password('password123')  # Contraseña por defecto
                user.save()
                self.stdout.write(f'Created user: {user.username}')

        # Crear proveedores
        for provider_data in providers_data:
            user = users[provider_data['user_index']]
            provider, created = Proveedor.objects.get_or_create(
                usuario=user,
                defaults={
                    'nombre': provider_data['nombre'],
                    'comuna': provider_data['comuna'],
                    'tipo_servicio': provider_data['tipo_servicio'],
                    'especialidad': provider_data['especialidad'],
                    'experiencia': provider_data['experiencia'],
                    'imagen': provider_data['imagen'],
                }
            )
            if created:
                self.stdout.write(f'Created provider: {provider.nombre}')

        self.stdout.write(self.style.SUCCESS('Successfully loaded initial data'))