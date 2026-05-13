
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
