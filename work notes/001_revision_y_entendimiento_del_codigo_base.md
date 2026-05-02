# Issue #1 - Revisión y Entendimiento del Código Base

## 1. Objetivo del issue

Obtener una visión general de la arquitectura y estructura del frontend del proyecto FullStock (React + TypeScript + Vite). El objetivo es entender cómo está organizado el código y cómo se simula actualmente el backend (datos, autenticación, carrito), con la finalidad de prepararnos para integrar un backend real mediante una API.

## 2. Subtareas

### 1. Explora la estructura del proyecto

El proyecto frontend está ubicado en la carpeta `FRONTEND` y es una aplicación basada en React, TypeScript y Vite. La carpeta principal de código es `FRONTEND/src/` y se divide en las siguientes carpetas clave:

- `routes/`: Páginas o vistas completas de la aplicación (la capa de enrutamiento usando React Router).
- `components/`: Componentes visuales y reutilizables. Se subdivide en `icons/` (iconos SVG) y `ui/` (componentes atómicos como botones, inputs, separadores).
- `contexts/`: Definición de los contextos globales (como estado de autenticación, carrito y tema).
- `providers/`: Componentes que inyectan los contextos a la aplicación.
- `services/`: Archivos encargados de la lógica de negocio y llamadas a datos. Actualmente, simulan peticiones a un backend mediante promesas y localStorage.
- `models/`: Definición de las interfaces y tipos de TypeScript para mantener fuertemente tipada la app.
- `styles/`: Configuración global de estilos y variables CSS (CSS Modules y propiedades custom).
- `assets/`: Archivos estáticos como imágenes o recursos multimedia.
- `lib/`: Funciones utilitarias o configuraciones generales.

- `main.tsx` y `router.tsx`: Puntos de entrada de la aplicación y configuración de las rutas.

Estructura de arbol:

```text
src
|-- routes
|   |-- cart
|   |-- category
|   |   `-- components
|   |       |-- price-filter
|   |       `-- product-card
|   |-- checkout
|   |-- home
|   |-- login
|   |-- not-found
|   |-- order-confirmation
|   |-- product
|   |-- root
|   |   `-- components
|   |       |-- auth-nav
|   |       |-- header-actions
|   |       |-- header-main
|   |       `-- main-nav
|   `-- signup
|-- components
|   |-- icons
|   `-- ui
|       |-- button
|       |-- container
|       |-- container-loader
|       |-- input
|       |-- input-field
|       |-- label
|       |-- section
|       |-- select
|       |-- select-field
|       `-- separator
|-- contexts
|-- providers
|-- services
|-- models
|-- styles
|   |-- 1-settings
|   |-- 3-generic
|   |-- 4-elements
|   |-- 5-objects
|   `-- 7-utilities
|-- assets
`-- lib
```

### 2. Lee la documentación y verifica con el código

Según el `README.md` del proyecto, los puntos clave del proyecto son:
- **Stack**: Construida con React, TypeScript y Vite.
- **Estado actual**: **No tiene conexión a un backend real**. Las operaciones se simulan usando promesas y `localStorage` en la carpeta `src/services/`.

**Verificación contra el código (`src/`):**
- ✅ **Catálogo, Categorías y Carrito**: Concuerda. Existen los servicios que devuelven datos en crudo (Polos, Tazas, Stickers) y el carrito guarda en `localStorage` (visto en `cart.service.ts`).
- ❌ **Manejo de temas**: **Incompleto**. Aunque la lógica del contexto (`theme-provider.tsx`) existe y el `<ThemeProvider>` envuelve la aplicación, **no hay ningún botón ni componente en la UI que utilice el hook `useTheme`** para permitirle al usuario cambiar de tema manualmente.
- ❌ **Rutas protegidas**: **Incompleto**. Aunque el `README.md` menciona "Rutas protegidas", tras revisar `src/router.tsx` y las rutas individuales (como `checkout`), **no existe ninguna capa de protección real ni un componente `ProtectedRoute`**. Por ejemplo, se puede entrar al Checkout y realizar la orden sin tener una sesión activa.

**Siguiente paso lógico:**
Para conectar con la API real, la documentación especifica que debemos reemplazar la lógica interna de los archivos en `src/services/` por llamadas HTTP usando `fetch`.


### 3. Analiza la simulación de backend

La carpeta `src/services/` contiene 6 archivos. Cada uno simula una funcionalidad distinta:

| Archivo | Mecanismo de simulación | Notas |
| ------- | ---------------------- | ----- |
| `auth.service.ts` | Promesas con `setTimeout` de 1s. Sesión guardada en una cookie (`full-stock-session`) con expiración de 24h. | La contraseña válida para cualquier usuario es siempre `"letmein"` (hardcodeada). No valida la contraseña real al registrarse, la ignora. |
| `user.service.ts` | Datos en `localStorage` (clave `"users"`). | Incluye una función `findOrCreateGuestUser` que crea un usuario invitado si el email no existe. |
| `product.service.ts` | Array estático de 23 productos hardcodeados directamente en el archivo. Promesas con `setTimeout` de 500ms. | No hay paginación ni búsqueda. Solo filtra por `categoryId` o busca por `id`. |
| `category.service.ts` | Array estático de 3 categorías (Polos, Tazas, Stickers) hardcodeadas. Promesas con `setTimeout` de 500ms. | Solo busca por `slug` o devuelve todas. |
| `cart.service.ts` | Datos persistidos en `localStorage` (clave `"cart"`). Promesas con `setTimeout` de 350ms. | `removeCartItem` es la única función **síncrona** del proyecto (no retorna Promise). |
| `order.service.ts` | Array en memoria (`const orders: Order[] = []`). Promesas con `setTimeout` de 1s. | El campo `total` siempre se guarda como `0` (hay un comentario `// This should be calculated based on cart items`). Las órdenes se pierden al recargar la página. |

**Patrón común:** Todas las funciones asíncronas usan el mismo patrón `new Promise((resolve) => setTimeout(() => resolve(datos), ms))` para simular la latencia de red. Al integrar la API real, estas funciones serán reemplazadas por llamadas `fetch`.

### 4. Revisa los contextos globales



### 5. Identifica componentes reutilizables


### 6. Verifica estilos y arquitectura CSS


### 7. Ejecuta el proyecto localmente


### 8. Documenta dudas y hallazgos

