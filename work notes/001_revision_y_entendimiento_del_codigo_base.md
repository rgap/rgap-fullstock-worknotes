# Issue #1 - Revisión y Entendimiento del Código Base

## Contexto y Objetivo

El proyecto FullStock Frontend fue desarrollado por otro equipo como un MVP (Producto Mínimo Viable) y ahora es responsabilidad de tu equipo completarlo para llevarlo a producción, conectándolo con un backend real. Antes de iniciar la integración, es fundamental revisar y comprender el código base. Esto permitirá identificar la estructura del proyecto, cómo se simulan actualmente las funcionalidades y qué áreas requerirán cambios para la integración con la API.

## Archivos modificados

Ninguno

## Tareas

### 1. Explora la estructura del proyecto

`FRONTEND` y `BACKEND` estan especificados en el Figma de manera visual. Realmente lo más util fue realizar los proyectos progresivos.

### 2. Lee la documentación y verifica con el código

No le veo sentido a esa documentacion extremadamente extensa.

### 3. Analiza la simulación de backend

**Patrón común:** Todas las funciones dentro de SERVICES usan el mismo patrón `new Promise((resolve) => setTimeout(() => resolve(datos), ms))` para simular la latencia de red. 

Al integrar la API real, estas funciones serán reemplazadas por llamadas `fetch`.

### 4. Revisa los contextos globales

Son estos:

- ThemeProvider
- AuthProvider
- CartProvider

### 5. Identifica componentes reutilizables

Los componentes usan iconos hechos en svg y radix ui y algunos hechos a mano.

### 6. Verifica estilos y arquitectura CSS

CSS modules, arquitectura ITCSS.

### 7. Ejecuta el proyecto localmente

✅

### 8. Documenta dudas y hallazgos

✅
