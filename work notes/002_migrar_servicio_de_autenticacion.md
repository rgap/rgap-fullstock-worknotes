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

## Modificaciones








**Comandos ejecutados en FRONTEND**



## Tareas

### 1. Revisar y documentar las funciones actuales de auth.service.ts.

En FRONTEND.

Este es el function call tree de las que estan dentro.

```text
login() -- Retorna un new Promise que parece una simulacion de login con password hardcodeado y timeout para simular latencia de red.
└── setSessionCookie()
signup() -- Retorna un new Promise que parece una simulacion de registro generando con id aleatorio y solo con el correo actual. No parece guardar el password. Además lo almacena en un atributo users que esta en el local storage.
└── setSessionCookie()
logout() -- Solo restaura y elimina una cookie que parece de sesión.

getCurrentUser()
└── getSessionCookie()

getSessionCookie()
    (No realiza llamadas internas)
setSessionCookie()
    (No realiza llamadas internas)
```

### 2. Explorar los endpoints de autenticación en la API y la documentación sobre sus inputs/outputs.

En BACKEND.

Parecen ser estos:

```text
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.me);
router.post("/logout", authController.logout);
```

Parecen completos.

La doc no dice nada acerca de inputs/outputs.




### 3. Migrar cada función para que utilice la API real.

Cada funcion dentro de auth.service.ts debe ser migrada para que utilice la API real.

### 4. Eliminar o refactorizar funciones temporales que ya no sean necesarias.

### 5. Probar los flujos de autenticación en el frontend.

### 6. Actualizar la documentación y ejemplos de uso.
