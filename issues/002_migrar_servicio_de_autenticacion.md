# Issue #2 - Migrar Servicio de Autenticación

## 1. Resumen del issue

El issue solicita migrar el servicio de autenticación del frontend para que deje de usar lógica simulada y empiece a comunicarse con la API real del backend.

El servicio actual permite simular funciones como login, registro, logout y recuperación de sesión, pero ahora debe adaptarse a los endpoints reales disponibles en el backend.

## 2. Objetivo

Conectar las funciones de `auth.service.ts` con la API real de autenticación.

El objetivo principal es reemplazar la lógica temporal del MVP por llamadas HTTP reales, adaptando los datos enviados y recibidos según la estructura definida por el backend.

## 3. Contexto inicial

El proyecto FullStock Frontend fue desarrollado inicialmente como un MVP. Por esa razón, el servicio de autenticación fue implementado con datos simulados o promesas locales.

Ahora que el backend ya existe, el frontend debe consumir endpoints reales para manejar correctamente los flujos de autenticación.

Los flujos principales relacionados con este issue son:

- Login.
- Registro.
- Logout.
- Recuperación o validación de sesión.
- Manejo de errores de autenticación.

## 4. Archivos y carpetas relacionados

| Archivo / carpeta | Propósito | Observación |
| ----------------- | --------- | ----------- |
| `src/services/auth.service.ts` | Servicio principal de autenticación | Debe migrarse para consumir la API real |
| `src/contexts/AuthContext.tsx` | Manejo global del estado de autenticación | Puede requerir ajustes según la respuesta del backend |
| `src/routes/Login` | Pantalla o ruta de inicio de sesión | Debe validarse con el nuevo flujo real |
| `src/routes/Register` | Pantalla o ruta de registro | Debe validarse con el nuevo endpoint real |
| `src/services` | Carpeta de servicios del frontend | Puede requerir una estructura común para peticiones HTTP |
| `README.md` | Documentación del proyecto | Puede requerir actualización si cambia el uso de autenticación |

## 5. Análisis realizado

Se revisó el servicio actual de autenticación para identificar qué funciones están simuladas y cuáles deben conectarse con la API real.

Funciones a revisar:

| Función | Comportamiento actual | Cambio esperado |
| ------- | -------------------- | --------------- |
| `login` | Pendiente de completar | Usar endpoint real de login |
| `register` | Pendiente de completar | Usar endpoint real de registro |
| `logout` | Pendiente de completar | Usar endpoint real o limpiar sesión según definición del backend |
| `getCurrentUser` | Pendiente de completar | Recuperar sesión real desde backend o token |
| `recoverSession` | Pendiente de completar | Validar si sigue siendo necesaria |

También se deben revisar los endpoints disponibles en el backend:

| Endpoint | Método | Propósito | Estado |
| -------- | ------ | --------- | ------ |
| `/auth/login` | `POST` | Iniciar sesión | Pendiente de confirmar |
| `/auth/register` | `POST` | Registrar usuario | Pendiente de confirmar |
| `/auth/logout` | `POST` | Cerrar sesión | Pendiente de confirmar |
| `/auth/me` | `GET` | Obtener usuario autenticado | Pendiente de confirmar |

## 6. Cambios realizados

Pendiente de completar.

Ejemplos posibles:

- Se reemplazó la lógica simulada de `auth.service.ts` por llamadas HTTP reales.
- Se adaptó la función `login` para enviar credenciales al backend.
- Se adaptó la función `register` para crear usuarios usando la API.
- Se ajustó el manejo de sesión según la respuesta del backend.
- Se eliminaron funciones temporales que ya no eran necesarias.
- Se actualizaron los tipos o interfaces usados por el servicio.
- Se actualizaron ejemplos o documentación relacionada.

## 7. Decisiones tomadas

| Decisión | Motivo |
| -------- | ------ |
| Mantener la lógica de autenticación centralizada en `auth.service.ts` | Evitar llamadas directas a la API desde componentes |
| Adaptar el frontend a los contratos reales del backend | No asumir que los datos del MVP coinciden con la API real |
| Revisar `AuthContext` después de migrar el servicio | Confirmar que el estado global siga funcionando correctamente |
| Documentar endpoints usados | Facilitar futuras tareas de integración y mantenimiento |

## 8. Pruebas o verificaciones

Pendiente de completar.

Pruebas sugeridas:

- Ejecutar el proyecto localmente con `npm run dev`.
- Probar login con credenciales válidas.
- Probar login con credenciales incorrectas.
- Probar registro con datos válidos.
- Probar registro con email ya existente.
- Probar logout.
- Recargar la página y verificar si la sesión se mantiene o se pierde según el comportamiento esperado.
- Revisar errores en consola del navegador.
- Revisar errores de red en la pestaña Network.
- Confirmar que el frontend consume la URL correcta del backend.

## 9. Hallazgos importantes

Pendiente de completar.

Ejemplos:

- El servicio anterior simulaba la autenticación sin usar una API real.
- Algunas funciones pueden quedar obsoletas después de conectar el backend.
- La estructura de respuesta del backend puede ser diferente a la estructura usada por el MVP.
- El manejo de tokens o sesión debe confirmarse antes de cerrar completamente la integración.

## 10. Pendientes o dudas

Pendiente de completar.

Ejemplos:

- Confirmar si la autenticación usa JWT, cookies o sesiones.
- Confirmar si el token se almacena en memoria, `localStorage`, `sessionStorage` o cookie.
- Confirmar si existe endpoint para recuperar el usuario actual.
- Confirmar si `logout` requiere llamada al backend.
- Confirmar formato exacto de errores enviados por el backend.
- Confirmar si se necesita refresh token.

## 11. Resultado final

Pendiente de completar.

Ejemplo:

El servicio de autenticación fue migrado para consumir la API real del backend. Los flujos principales de login, registro y logout fueron probados desde el frontend y funcionan correctamente según los endpoints disponibles.

## 12. Relación con GitHub

Issue relacionado:

`#2`

Estado:

`En progreso`