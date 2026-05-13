# 📖 Instrucciones de Configuración del Monorepo

## ✅ Lo que se ha hecho

Tu proyecto CareMatch ya está convertido en un **monorepo** con la siguiente estructura:

```
carematch_app/
├── frontend/              # Frontend con HTML, CSS y JavaScript
├── backend/               # API REST con Express.js
└── package.json           # Configuración del monorepo
```

## 🚀 Pasos para empezar

### 1. Instalar Node.js (si no lo tienes)
Descarga desde https://nodejs.org/ (versión LTS recomendada)

### 2. Instalar dependencias del Backend

```powershell
cd backend
npm install
```

Esto instalará:
- express (framework web)
- cors (manejo de peticiones cross-origin)
- dotenv (variables de entorno)
- bcryptjs (encriptación)
- jsonwebtoken (autenticación)
- nodemon (desarrollo automático)

### 3. Instalar dependencias del Frontend

```powershell
cd ../frontend
npm install
```

Para el frontend se recomienda instalar http-server:
```powershell
npm install -g http-server
```

### 4. Ejecutar el Backend

```powershell
cd backend
npm run dev
```

El servidor estará disponible en: **http://localhost:3001**

Verifica que funcione visitando:
- http://localhost:3001/health

### 5. Ejecutar el Frontend

En otra terminal:
```powershell
cd frontend
npx http-server -p 8080 -c-1 -o
```

Abrirá automáticamente http://localhost:8080

## 📋 Pruebas de API

### Probar obtener proveedores de cuidado
```
GET http://localhost:3001/api/providers/cuidado
```

### Probar registro de usuario
```
POST http://localhost:3001/api/usuarios/registro
Content-Type: application/json

{
  "nombre": "Juan García",
  "email": "juan@example.com",
  "password": "123456",
  "rol": "solicitante"
}
```

### Probar login
```
POST http://localhost:3001/api/usuarios/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "123456"
}
```

## 🔧 Mejoras Futuras

1. **Base de Datos**: Conectar MongoDB
   ```bash
   npm install mongoose --save
   ```

2. **Autenticación JWT**: Implementar tokens
   - Ya instalado bcryptjs y jsonwebtoken

3. **Validación**: Agregar express-validator
   ```bash
   npm install express-validator
   ```

4. **Pruebas**: Agregar Jest
   ```bash
   npm install --save-dev jest
   ```

## 📝 Estructura de carpetas explicada

### Backend (`/backend/src`)
- `server.js`: Archivo principal que configura Express
- `routes/providers.js`: API de proveedores
- `routes/usuarios.js`: API de usuarios (registro/login)
- `routes/contactos.js`: API de formularios de contacto
- `routes/solicitudes.js`: API de solicitudes de servicio

### Frontend (`/frontend`)
- `index.html`: Página de inicio
- `servicios.html`: Catálogo de servicios
- `cuidado.html`, `asistencia.html`, `acompanamiento.html`: Listados de proveedores
- `contacto.html`: Formulario de contacto
- `login.html`: Página de autenticación
- `app.js`: Lógica de JavaScript (búsqueda, filtros, formularios)
- `styles.css`: Estilos CSS

## ⚠️ Notas Importantes

1. El frontend intenta conectar con el backend en `http://localhost:3001/api`
2. Si el backend no está disponible, usa datos locales (fallback)
3. Los datos actualmente se guardan en memoria (se pierden al reiniciar)
4. Las contraseñas NO están encriptadas (implementar en producción)

## ❓ Problemas Comunes

**Error: "Cannot find module 'express'"**
→ Ejecuta `npm install` en la carpeta backend

**Puerto 3001 en uso**
→ Cambia PORT en `.env` o en el archivo server.js

**Frontend no se abre**
→ Instala globalmente: `npm install -g http-server`

## 📞 Soporte

Si necesitas ayuda, verifica:
- Que Node.js esté instalado: `node -v`
- Que npm esté actualizado: `npm -v`
- Que los puertos 3001 (backend) y 8080 (frontend) estén disponibles
