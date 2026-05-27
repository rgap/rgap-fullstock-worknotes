# Issue #2 - Migrar Servicio de Autenticación

## Contexto

El servicio de autenticación fue implementado originalmente para simular el flujo de login, registro y logout sin una API real. Ahora que el equipo ha desarrollado el backend, es momento de migrar este servicio para que interactúe directamente con los endpoints de autenticación.

## Objetivo

Conectar todas las funciones de auth.service.ts con la API real, eliminando la lógica temporal y adaptando el frontend a los flujos y datos que provee el backend.

## Consideraciones

- Explora los endpoints disponibles en la API para login, registro, logout y recuperación de sesión.

- No asumas que los inputs o outputs serán idénticos a los simulados en el MVP. Adapta el frontend según sea necesario.

- Algunas funciones del servicio podrían ser deprecadas tras la migración. Elimina o refactoriza según corresponda.

- Si es necesario, puedes proponer cambios en el backend para mejorar la integración.

## Archivos modificados



## Tareas

### 1. Revisar y documentar las funciones actuales de auth.service.ts.



### 2. Explorar los endpoints de autenticación en la API y la documentación sobre sus inputs/outputs.

### 3. Migrar cada función para que utilice la API real.

Cada funcion dentro de auth.service.ts debe ser migrada para que utilice la API real.

### 4. Eliminar o refactorizar funciones temporales que ya no sean necesarias.

### 5. Probar los flujos de autenticación en el frontend.

### 6. Actualizar la documentación y ejemplos de uso.
