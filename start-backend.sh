#!/bin/bash
# Script para iniciar el backend de CareMatch

echo "========================================"
echo " CareMatch - Backend Iniciando..."
echo "========================================"
echo ""

cd backend

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias..."
    npm install
fi

echo ""
echo "Iniciando servidor en http://localhost:3001"
echo ""
npm run dev
