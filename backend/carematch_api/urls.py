from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProveedorViewSet, ContactoViewSet, SolicitudViewSet, DocumentoVerificacionViewSet, EvaluacionViewSet

router = DefaultRouter()
router.register(r'usuarios', UserViewSet)
router.register(r'proveedores', ProveedorViewSet)
router.register(r'contactos', ContactoViewSet)
router.register(r'solicitudes', SolicitudViewSet)
router.register(r'documentos', DocumentoVerificacionViewSet)
router.register(r'evaluaciones', EvaluacionViewSet)

urlpatterns = router.urls