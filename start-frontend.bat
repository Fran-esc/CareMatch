@echo off
REM Script para iniciar el frontend de CareMatch

echo ========================================
echo  CareMatch - Frontend Iniciando...
echo ========================================
echo.

cd frontend

REM Verificar si node_modules existe
if not exist "node_modules\" (
    echo Instalando dependencias...
    call npm install
)

echo.
echo Iniciando servidor en http://localhost:8080
echo.
call npx http-server -p 8080 -c-1 -o

pause
