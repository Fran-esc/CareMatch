from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProveedorViewSet, ContactoViewSet, SolicitudViewSet

router = DefaultRouter()
router.register(r'usuarios', UserViewSet)
router.register(r'proveedores', ProveedorViewSet)
router.register(r'contactos', ContactoViewSet)
router.register(r'solicitudes', SolicitudViewSet)

urlpatterns = router.urls