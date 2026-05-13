#!/bin/bash
# Script para iniciar el frontend de CareMatch

echo "========================================"
echo " CareMatch - Frontend Iniciando..."
echo "========================================"
echo ""

cd frontend

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias..."
    npm install
fi

echo ""
echo "Iniciando servidor en http://localhost:8080"
echo ""
npx http-server -p 8080 -c-1 -o
