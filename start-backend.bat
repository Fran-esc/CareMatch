@echo off
REM Script para iniciar el backend de CareMatch

echo ========================================
echo  CareMatch - Backend Iniciando...
echo ========================================
echo.

cd backend

REM Verificar si node_modules existe
if not exist "node_modules\" (
    echo Instalando dependencias...
    call npm install
)

echo.
echo Iniciando servidor en http://localhost:3001
echo.
call npm run dev

pause
