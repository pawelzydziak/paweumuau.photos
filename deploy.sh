#!/bin/bash
set -e

APP_NAME="paweumuau.photos"
PROJECT_DIR="/var/www/paweumuau.photos"

echo "🚀 [1/5] Pull..."
cd "$PROJECT_DIR"
git pull origin main

echo "📦 [2/5] Install..."
npm install

echo "🔨 [3/5] Build..."
npm run build

echo "♻️ [4/5] Restart PM2 ($APP_NAME)..."
pm2 restart "$APP_NAME"

echo "🌀 [5/5] Reload Nginx..."
systemctl reload nginx

echo "✅ Deployed!"
