# Issue #1 - Revisión y Entendimiento del Código Base

## 1. Resumen del issue

El issue solicita revisar y entender el código base del frontend de FullStock antes de iniciar la integración con un backend real.

## 2. Objetivo

Obtener una visión general de la estructura del proyecto, identificar cómo se simulan actualmente las funcionalidades y reconocer qué partes serán importantes para la futura integración con la API.

## 3. Contexto inicial

El frontend fue desarrollado como un MVP por otro equipo. Actualmente existen funcionalidades simuladas que deben ser entendidas antes de ser reemplazadas por llamadas reales al backend.

## 4. Archivos y carpetas relacionados

| Archivo / carpeta | Propósito | Observación |
| ----------------- | --------- | ----------- |
| `README.md` | Documentación inicial del proyecto | Describe la arquitectura, scripts y simulación de backend |
| `src/components` | Componentes reutilizables | Dividido en `ui` (elementos base) e `icons` (iconos) |
| `src/routes` | Rutas o páginas principales | Contiene las vistas mapeadas en el `router.tsx` |
| `src/services` | Servicios simulados | Contiene auth, cart, category, order, product y user (simulando API con promesas y localStorage) |
| `src/contexts` | Estado global | Contiene `auth.context.ts`, `cart.context.ts` y `theme.context.ts` |
| `src/styles` | Estilos globales o compartidos | Arquitectura CSS basada en carpetas (settings, generic, elements, objects, utilities) |

## 5. Análisis realizado

- **Arquitectura:** Aplicación React con Vite, TypeScript y enrutamiento (`router.tsx`).
- **Simulación Backend:** Se utilizan promesas con `setTimeout` y almacenamiento en `localStorage` (o en memoria) dentro de `src/services` para simular la persistencia y latencia de red.
- **Estado Global:** Patrón de Context API en `src/contexts` y `src/providers` para autenticación, carrito y cambio de tema oscuro/claro.
- **Estilos:** Uso de CSS puro/Modules estructurado en capas (Settings, Generic, Elements, Objects, Utilities).

## 6. Cambios realizados

Se creó este documento de notas de trabajo para registrar la revisión y entendimiento inicial del código base.

## 7. Decisiones tomadas

| Decisión | Motivo |
| -------- | ------ |
| Documentar el issue en `docs/issues` | Mantener un historial ordenado por issue |
| Usar el número del issue en el archivo | Facilitar la relación con GitHub |
| Usar el título del issue en el archivo | Hacer el documento fácil de identificar |

## 8. Pruebas o verificaciones

Pendiente de completar.

## 9. Hallazgos importantes

Pendiente de completar.

## 10. Pendientes o dudas

Pendiente de completar.

## 11. Resultado final

Pendiente de completar.

## 12. Relación con GitHub

Issue relacionado:

`#1`

Estado:

`En progreso`