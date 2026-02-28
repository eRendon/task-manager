# To-Do App Ionic

Aplicación de lista de tareas desarrollada con Ionic 8 y Angular Standalone.

## Funcionalidades Implementadas

*   **Tablero Kanban**: Organización de tareas por columnas de estado (Backlog, Nuevo, Activo, Impedimento, Cerrado).
*   **Gestión de Tareas**: Funcionalidad completa para crear, editar y eliminar tareas.
*   **Detalle de Tarea**: Vista en profundidad de cada tarea con opción de edición.
*   **Búsqueda**: Buscador integrado en la cabecera para filtrar tareas por ID.
*   **Firebase Remote Config**: Integración para controlar características (como el botón de agregar) remotamente.
*   **Optimización**: Uso de estrategias `OnPush` y `trackBy` para alto rendimiento.

## Requisitos Previos

*   **Node.js** (versión LTS recomendada)
*   **pnpm** (Gestor de paquetes)
*   **Ionic CLI**: `npm install -g @ionic/cli`
*   **Android Studio**: Para compilar y ejecutar en Android.
*   **Xcode**: Para compilar y ejecutar en iOS (Solo macOS).

## Instalación

1.  Clonar el repositorio.
2.  Instalar dependencias:
    ```bash
    pnpm install
    ```

## Ejecución en Navegador

Para desarrollo local:
```bash
ionic serve
```

## Compilación para Móviles

Esta aplicación utiliza **Capacitor** (el sucesor moderno de Cordova).

### Android

1.  Generar el build de producción:
    ```bash
    ionic build --prod
    ```
2.  Agregar la plataforma Android (si no existe):
    ```bash
    npx cap add android
    ```
3.  Sincronizar los cambios con el proyecto nativo:
    ```bash
    npx cap sync android
    ```
4.  Abrir el proyecto en Android Studio:
    ```bash
    npx cap open android
    ```
5.  **Generar APK**:
    *   En Android Studio, ve al menú **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
    *   El archivo `.apk` se generará en `android/app/build/outputs/apk/debug/app-debug.apk`.
    *   Para ejecutar directamente, presiona el botón **Run** (triángulo verde).

### Solución de Problemas

*   **Error de permisos (EPERM)**: Si encuentras errores al instalar paquetes o compilar, asegúrate de detener el servidor de desarrollo (`ionic serve`) antes de ejecutar comandos.
*   **Sincronización**: Si haces cambios en el código web (HTML/TS/CSS), recuerda ejecutar siempre `ionic build` y `npx cap sync` para que se reflejen en la app nativa.
*   **Error de versión AGP**: Si tienes problemas con la versión de Gradle, abre el proyecto en Android Studio (`npx cap open android`) y usa el asistente de actualización (AGP Upgrade Assistant) o verifica que la versión en `android/build.gradle` sea válida (ej. `8.2.1`).

### iOS

> **Nota:** Se requiere un entorno macOS para compilar la versión de iOS.

1.  Generar el build de producción:
    ```bash
    ionic build --prod
    ```
2.  Sincronizar los cambios:
    ```bash
    npx cap sync ios
    ```
3.  Abrir el proyecto en Xcode:
    ```bash
    npx cap open ios
    ```
4.  Seleccionar el simulador o dispositivo y ejecutar.
