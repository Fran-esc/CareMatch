# Generated migration for DocumentoVerificacion and Evaluacion models

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('carematch_api', '0002_perfilusuario'),
    ]

    operations = [
        migrations.CreateModel(
            name='DocumentoVerificacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_documento', models.CharField(choices=[('licencia', 'Licencia Profesional'), ('certificado', 'Certificado de Capacitación'), ('credencial', 'Credencial Médica'), ('otro', 'Otro documento')], max_length=20)),
                ('descripcion', models.CharField(max_length=255)),
                ('archivo', models.FileField(upload_to='documentos_verificacion/')),
                ('fecha_subida', models.DateTimeField(auto_now_add=True)),
                ('estado', models.CharField(choices=[('pendiente', 'Pendiente'), ('aprobado', 'Aprobado'), ('rechazado', 'Rechazado')], default='pendiente', max_length=20)),
                ('notas_verificacion', models.TextField(blank=True, help_text='Notas del verificador')),
                ('perfil', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documentos_verificacion', to='carematch_api.perfilusuario')),
            ],
            options={
                'ordering': ['-fecha_subida'],
            },
        ),
        migrations.CreateModel(
            name='Evaluacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calificacion', models.IntegerField(help_text='Calificación de 1 a 5 estrellas', validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)])),
                ('comentario', models.TextField(blank=True, help_text='Comentario detallado sobre el servicio')),
                ('fecha_evaluacion', models.DateTimeField(auto_now_add=True)),
                ('proveedor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='evaluaciones_recibidas', to='carematch_api.proveedor')),
                ('solicitud', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='evaluacion', to='carematch_api.solicitud')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='evaluaciones_realizadas', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-fecha_evaluacion'],
                'unique_together': {('usuario', 'proveedor')},
            },
        ),
    ]
