# To-Do App Ionic

Aplicación de lista de tareas desarrollada con Ionic 8 y Angular Standalone.

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

### Android

1.  Generar el build de producción:
    ```bash
    ionic build
    ```
2.  Sincronizar los cambios con el proyecto nativo:
    ```bash
    npx cap sync android
    ```
3.  Abrir el proyecto en Android Studio:
    ```bash
    npx cap open android
    ```
4.  Desde Android Studio, presionar el botón **Run** (triángulo verde) seleccionando un emulador o dispositivo conectado.

### iOS

> **Nota:** Se requiere un entorno macOS para compilar la versión de iOS.

1.  Generar el build de producción:
    ```bash
    ionic build
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
