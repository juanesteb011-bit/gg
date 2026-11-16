# Screenshot to Webpage — Instaladores Windows (.exe) y Android (.apk)

Paquete generado automáticamente para envolver `https://screenshot-to-webpage-34.lovable.app` como aplicación instalable de escritorio (Electron) y móvil (Capacitor Android).

- **ID de paquete:** `com.lovable.screenshottowebpage`
- **Versión:** `1.0.0`

## Opción recomendada: Compilación automática en GitHub Actions (sin instalar SDKs)

1. Crea un nuevo repositorio en GitHub (público o privado).
2. Descomprime este archivo ZIP y sube todo su contenido (incluyendo la carpeta `.github/`) a la rama `main`.
3. Abre la pestaña **Actions** en GitHub.
4. Cuando finalicen los dos trabajos paralelos (`Windows Installer (.exe)` y `Android Package (.apk)`), descarga los instaladores desde **Artifacts**:
   - `screenshot-to-webpage-windows-exe` -> archivo instalador `.exe`
   - `screenshot-to-webpage-android-apk` -> archivo instalador `app-debug.apk`

## Alternativa: Compilación local en tu PC

### Windows (.exe)
Requiere Node.js 20 o superior:
```bash
cd desktop
npm install
npm run dist
```
El instalador `.exe` aparecerá en `desktop/dist/`.

### Android (.apk)
Requiere Node.js 20+, Java JDK 17 y Android SDK:
```bash
cd mobile
npm install
npm run build:apk
```
El APK aparecerá en `mobile/android/app/build/outputs/apk/debug/app-debug.apk`.
