# Generated manually to add the PerfilUsuario model

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('carematch_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PerfilUsuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rol', models.CharField(choices=[('solicitante', 'Solicitante de servicio'), ('cuidador', 'Cuidador/a'), ('profesional', 'Profesional de salud'), ('acompañante', 'Acompañante')], default='solicitante', max_length=20)),
                ('telefono', models.CharField(blank=True, max_length=20)),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='perfil', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
