# 1. Arquitectura general de FullStock

FullStock se comporta como una aplicación ecommerce full-stack donde el frontend React funciona como cliente web, consume una API REST del backend Express y el backend accede a PostgreSQL mediante SQL usando el driver `pg`.

**Flujo de datos de alto nivel:**

```text
Frontend
↓ HTTP / REST
Backend API
↓ SQL / pg Driver
Database
```

| Clasificación                                | ¿FullStock la sigue? | Por qué                                                                                                                      |
| -------------------------------------------- | -------------------: | ---------------------------------------------------------------------------------------------------------------------------- |
| Synchronous Communication / Request Response |                   Sí | El frontend solicita datos y acciones al backend mediante peticiones HTTP y recibe respuestas JSON.                          |
| Client Server                                |                   Sí | Hay un cliente frontend React y un servidor backend Express.                                                                 |
| 3-Tier Architecture                          |                   Sí | Se distingue frontend, backend API y base de datos PostgreSQL.                                                               |
| N-Tier Architecture                          |              Parcial | Tiene 3 niveles principales; no es un sistema distribuido con muchos niveles especializados.                                 |
| REST API Architecture                        |                   Sí | El backend expone endpoints como `/api/categories`, `/api/products/:id`, `/api/login`, `/api/register`.                      |
| Request Driven Backend                       |                   Sí | El backend responde principalmente a requests HTTP del frontend.                                                             |
| Monolith                                     |              Parcial | El backend es una API monolítica; el sistema completo no es un único monolito porque frontend y backend están separados.     |
| Layered Architecture                         |                   Sí | Frontend y backend están organizados por responsabilidades: rutas, componentes, servicios, controladores, repositorios, etc. |
| Package by Layer                             |                   Sí | El backend está claramente separado por carpetas de capa: `routes`, `controllers`, `services`, `repositories`, `models`.     |
| Component Based Architecture                 |                   Sí | El frontend React se construye con componentes reutilizables.                                                                |
| Database Transaction Pattern                 |              Parcial | Hay persistencia SQL, pero no se observan transacciones explícitas en el código mostrado.                                    |
| Environment Configuration Pattern            |                   Sí | El backend usa `.env.example` y `src/env.ts` para `DATABASE_URL`, `SESSION_SECRET`, `PORT`, etc.                             |

## Resumen general

```text
FullStock
└── Architectural Styles
    ├── Runtime Interaction Styles
    │   ├── Synchronous Communication
    │   │   └── Request Response
    │   └── Runtime Structure Styles
    │       └── Client Server
    ├── Deployment / System Composition Styles
    │   ├── 3-Tier Architecture
    │   └── Backend Monolith
    ├── Frontend Rendering / Delivery Architecture Styles
    │   └── Single Page Application Architecture
    ├── Backend API / Processing Architecture Styles
    │   ├── REST API Architecture
    │   └── Request Driven Backend
    └── Internal Application Structure Styles
        ├── Layered Architecture
        └── Component Based Architecture
```

---

# 2. Frontend

El frontend de FullStock es una aplicación React con TypeScript y Vite. Usa React Router para navegación, componentes reutilizables para UI, Context API para estado global y servicios para acceder a datos.

En el código pegado, los archivos de `services` todavía muestran datos mock, promesas y `localStorage`; bajo la condición del prompt, esos servicios se interpretan como la capa que consume la API real del backend.

**Flujo de datos en el frontend:**

```text
routes / router
↓
route pages
↓
components
↓
contexts
↓
providers
↓
services
↓
Backend API
```

| Clasificación                        |   ¿La sigue? | Evidencia en el proyecto                                                                                           | Qué es en corto                                                       |
| ------------------------------------ | -----------: | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Single Page Application Architecture |           Sí | `index.html`, `src/main.tsx`, `RouterProvider`, `createBrowserRouter`                                              | Una app React renderizada en el navegador con navegación interna.     |
| Client Side Routing                  |           Sí | `src/router.tsx`, `createBrowserRouter`, rutas como `/cart`, `/checkout`, `/products/:id`                          | Las rutas se manejan desde el frontend.                               |
| Nested Routing                       |           Sí | `Root` contiene `children` y usa `<Outlet />`                                                                      | Rutas hijas renderizadas dentro de una ruta padre.                    |
| Route Layout Pattern                 |           Sí | `src/routes/root/index.tsx` con header, footer y `<Outlet />`                                                      | Layout común para varias páginas.                                     |
| Component Based Architecture         |           Sí | `src/components/ui`, `src/routes/*/components`                                                                     | La UI se construye con componentes reutilizables.                     |
| Component Composition                |           Sí | `Root`, `HeaderMain`, `MainNav`, `AuthNav`, `HeaderActions`, `ProductCard`                                         | Componentes pequeños se combinan para formar pantallas.               |
| Provider Pattern                     |           Sí | `ThemeProvider`, `AuthProvider`, `CartProvider` en `main.tsx`                                                      | Proveedores envuelven la app y exponen estado global.                 |
| React Context Provider               |           Sí | `AuthContext`, `CartContext`, `ThemeProviderContext`                                                               | Context API para autenticación, carrito y tema.                       |
| State Management Patterns            |           Sí | `useState`, `useEffect`, `useAuth`, `useCart`, `useTheme`                                                          | Manejo de estado local y global.                                      |
| Service Layer Pattern                |           Sí | `src/services/category.service.ts`, `auth.service.ts`, `cart.service.ts`, etc.                                     | Servicios separan acceso a datos de los componentes.                  |
| API Client Pattern                   |      Parcial | Carpeta `services`; si se reemplazan mocks por `fetch`, sería API client real                                      | Capa que concentra llamadas al backend.                               |
| Custom Hook Data Access Pattern      |      Parcial | `useAuth`, `useCart`, `useTheme` consumen contextos; no hay hooks dedicados tipo `useProducts`                     | Hooks encapsulan acceso a estado, no tanto a datos remotos.           |
| Query / Cache Pattern                | No / Parcial | No se observa React Query ni cache HTTP dedicada                                                                   | No hay capa fuerte de caché de servidor.                              |
| Protected Route Pattern              |      Parcial | Hay auth global, pero no se ve un componente `ProtectedRoute`                                                      | Existe autenticación, pero no una protección formal de rutas.         |
| Page Component Service               |           Sí | Rutas como `Home`, `Category`, `Product` llaman servicios                                                          | Página → servicio.                                                    |
| Route Component Context Service      |           Sí | Rutas usan componentes, contextos y servicios                                                                      | Ruta → componente → contexto/servicio.                                |
| Component First Organization         |           Sí | `components/ui` centraliza piezas reutilizables                                                                    | Organización basada en componentes reutilizables.                     |
| Route Based Organization             |           Sí | `src/routes/home`, `category`, `product`, `cart`, etc.                                                             | Cada ruta tiene su carpeta.                                           |
| Context Based State Organization     |           Sí | `src/contexts`                                                                                                     | Estado global definido por contextos.                                 |
| Provider Based State Organization    |           Sí | `src/providers`                                                                                                    | Providers implementan la lógica del contexto.                         |
| Service Layer Organization           |           Sí | `src/services`                                                                                                     | Servicios separados para productos, carrito, usuarios, órdenes.       |
| Model Based Service Organization     |           Sí | `src/models` + `src/services`                                                                                      | Servicios trabajan con tipos como `Product`, `Cart`, `User`, `Order`. |
| Atomic Design                        |      Parcial | Hay componentes UI base como `Button`, `Input`, `Label`, `Container`, pero no carpetas `atoms/molecules/organisms` | Se parece a Atomic Design, pero no lo sigue formalmente.              |

---

## Lo que más representa al frontend

```text
Frontend
└── Single Page Application Architecture
    ├── Client Side Routing
    │   ├── createBrowserRouter
    │   ├── Root Layout
    │   └── Route Pages
    ├── Component Based Architecture
    │   ├── UI Components
    │   ├── Route Components
    │   └── Feature Components
    ├── State Management Patterns
    │   ├── React Context Provider
    │   ├── Provider Pattern
    │   └── Local State with useState/useEffect
    ├── Frontend Data Access Patterns
    │   ├── Service Layer Pattern
    │   └── API Client Pattern
    └── Code Organization
        ├── Routes Components Contexts Services Models
        ├── Route Based Organization
        ├── Component First Organization
        └── Context / Provider Based State Organization
```

---

## Variante exacta del frontend

Component-Based React SPA

Component-Based React SPA (Single Page Application) with Client-Side Routing, Context Provider State Management, Route-Based Pages, reusable UI components, and a Service Layer used as the frontend API/data access boundary.

---

## Organización de código frontend

El frontend usa principalmente:

Package by Layer

Porque las carpetas principales están separadas por tipo técnico o responsabilidad:

```text
src/routes
src/components
src/contexts
src/providers
src/services
src/models
src/styles
```

También tiene algo de Package by Feature dentro de algunas rutas, por ejemplo:

```text
src/routes/category/components/price-filter
src/routes/category/components/product-card
src/routes/root/components/header-main
src/routes/root/components/main-nav
```

Entonces, la descripción más exacta sería:

```text
Package by Layer with route-local feature components
```

---

## En términos de capas frontend

```text
Routes / Pages
Components
Providers / Contexts
Services
Models
```

El frontend no sigue Clean Architecture estricta. Más bien mezcla una organización React práctica por rutas, componentes, contextos, providers, servicios y modelos. Tiene separación de responsabilidades, pero no tiene capas formales como `domain`, `application`, `infrastructure` o `interface adapters`.

---

# 3. Backend

El backend de FullStock es una API REST construida con Express, TypeScript y PostgreSQL. Su estructura sí muestra una arquitectura por capas bastante clara.

**Flujo de datos en el backend:**

```text
routes
↓
controllers
↓
services
↓
repositories
↓
database
```

| Clasificación                                     |   ¿La sigue? | Evidencia en el proyecto                                                                                                  | Qué es en corto                                                                      |
| ------------------------------------------------- | -----------: | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| REST API Architecture                             |           Sí | `auth.routes.ts`, `categories.routes.ts`, `products.routes.ts`                                                            | Backend expone recursos y acciones mediante HTTP.                                    |
| Request Driven Backend                            |           Sí | Express recibe requests y ejecuta controladores                                                                           | El backend reacciona a solicitudes HTTP.                                             |
| Layered Architecture                              |           Sí | `routes`, `controllers`, `services`, `repositories`, `db`                                                                 | Separación por capas internas.                                                       |
| N-Layer Architecture                              |           Sí | Routes → Controllers → Services → Repositories → Database                                                                 | Más de tres capas lógicas internas.                                                  |
| API Application Domain Infrastructure Persistence |      Parcial | Hay API/controllers, services y persistence/repositories, pero no hay dominio rico separado                               | Se parece, pero no está dividido formalmente en `domain/application/infrastructure`. |
| Controller Service Repository                     |           Sí | `controllers`, `services`, `repositories`                                                                                 | Variante clásica de backend por capas.                                               |
| Route Handler Service Repository                  |           Sí | `routes/*.routes.ts` conectan con controllers, y estos con services/repositories                                          | Ruta/controlador → servicio → repositorio.                                           |
| REST Resource Controller Pattern                  |           Sí | `productsController`, `categoriesController`, `authController`                                                            | Controladores manejan recursos/endpoints REST.                                       |
| Controller Pattern                                |           Sí | `src/controllers/*.controller.ts`                                                                                         | Reciben request, llaman servicios y responden.                                       |
| Route Handler Pattern                             |           Sí | `src/routes/*.routes.ts`                                                                                                  | Define qué función maneja cada endpoint.                                             |
| Middleware Pattern                                |           Sí | `session.middleware.ts`, `error.middleware.ts`, `express.json()`, `morgan()`                                              | Funciones intermedias en el pipeline HTTP.                                           |
| Service Layer Pattern                             |           Sí | `products.service.ts`, `users.service.ts`, `categories.service.ts`                                                        | Capa de lógica de negocio.                                                           |
| Application Service Pattern                       |      Parcial | Los servicios coordinan casos simples, pero no están nombrados como casos de uso                                          | Servicios de aplicación simples.                                                     |
| Use Case / Interactor Pattern                     |      Parcial | `createUser`, `getProductById`, `listProductsByCategoryId` parecen casos de uso, pero no están separados como interactors | Acciones de negocio encapsuladas en services.                                        |
| Transaction Script                                |      Parcial | Cada método ejecuta una operación concreta de negocio                                                                     | Lógica procedural por operación.                                                     |
| Domain Model Pattern                              |      Parcial | Hay interfaces `User`, `Product`, `Category`, pero sin comportamiento de dominio                                          | Modelos de datos, no dominio rico.                                                   |
| Repository Pattern                                |           Sí | `categories.repository.ts`, `products.repository.ts`, `users.repository.ts`                                               | Encapsula consultas SQL.                                                             |
| DAO Pattern                                       |      Parcial | Los repositories funcionan como acceso a datos                                                                            | Similar a DAO, aunque nombrado como Repository.                                      |
| Data Mapper Pattern                               |      Parcial | `camelcaseKeys` transforma filas SQL a objetos TypeScript                                                                 | Mapeo simple entre DB y modelo.                                                      |
| Query Object Pattern                              |      Parcial | Hay función `query<T>()`, pero no objetos de consulta especializados                                                      | Consulta centralizada, no patrón formal completo.                                    |
| DTO Pattern                                       |           Sí | `UserDto = Omit<User, "password">`, `toUserDto()`                                                                         | Evita exponer `password` al cliente.                                                 |
| Mapper / Assembler Pattern                        |      Parcial | `toUserDto()` transforma `User` a `UserDto`                                                                               | Mapeo básico de respuesta.                                                           |
| Input Validation Pattern                          |           Sí | Validaciones en `auth.controller.ts` y `products.controller.ts`                                                           | Valida datos antes de llamar servicios.                                              |
| Exception Handler Pattern                         |           Sí | `errorHandler` centralizado                                                                                               | Errores van a middleware global.                                                     |
| Error Response Pattern                            |           Sí | Respuestas `{ error: ... }` y `{ error, errors }`                                                                         | Formato común de errores.                                                            |
| Authentication Middleware                         |           Sí | `session.middleware.ts`                                                                                                   | Manejo de sesión en cada request.                                                    |
| Session Management Pattern                        |           Sí | `express-session`, `connect-pg-simple`, tabla `sessions`                                                                  | Sesiones server-side en PostgreSQL.                                                  |
| Token Based Authentication                        |           No | No usa JWT; usa sesiones                                                                                                  | No aplica.                                                                           |
| Role Based Access Control                         | No / Parcial | No se observan roles                                                                                                      | No hay autorización por roles.                                                       |
| Configuration Provider Pattern                    |           Sí | `src/env.ts` centraliza variables                                                                                         | Configuración desde entorno.                                                         |
| Environment Configuration Pattern                 |           Sí | `.env.example`, `dotenv`, `DATABASE_URL`, `SESSION_SECRET`                                                                | Config por variables de entorno.                                                     |
| Secrets Management Pattern                        |      Parcial | `SESSION_SECRET` viene de `.env`                                                                                          | Manejo básico de secretos, no vault externo.                                         |
| Dependency Injection                              |      Parcial | Services importan repositories directamente; no hay contenedor DI                                                         | Dependencias explícitas por imports.                                                 |
| Composition Root                                  |      Parcial | `app.ts` y `server.ts` ensamblan middlewares, rutas y servidor                                                            | Punto de composición básico.                                                         |
| Logging Pattern                                   |           Sí | `morgan("dev")`, logging de queries en `db/index.ts`                                                                      | Registro de requests y queries.                                                      |
| Health Check Pattern                              |      Parcial | `testConnection()` valida DB al iniciar                                                                                   | Verificación interna, no endpoint `/health`.                                         |
| Database Organization                             |           Sí | `db/schema.sql`, `db/migrations`, `src/db/index.ts`                                                                       | Organización clara de base de datos.                                                 |
| Migration / Modernization Pattern                 |      Parcial | Usa dbmate migrations                                                                                                     | Migraciones SQL versionadas.                                                         |
| Error Handling Organization                       |           Sí | `src/middlewares/error.middleware.ts`, `src/shared/errors.ts`                                                             | Errores organizados por middleware y clases.                                         |
| Auth Organization                                 |           Sí | `auth.routes.ts`, `auth.controller.ts`, `users.service.ts`, sessions                                                      | Auth separada del resto.                                                             |
| Config Organization                               |           Sí | `src/env.ts`, `.env.example`                                                                                              | Configuración separada.                                                              |

---

## Lo que más representa al backend

```text
Backend
└── Layered Monolithic REST API
    ├── REST API Architecture
    │   ├── /api/register
    │   ├── /api/login
    │   ├── /api/me
    │   ├── /api/logout
    │   ├── /api/categories
    │   ├── /api/categories/:categoryId/products
    │   └── /api/products/:id
    ├── Request Driven Backend
    │   └── Express request / response lifecycle
    ├── N-Layer Architecture
    │   ├── Routes
    │   ├── Controllers
    │   ├── Services
    │   ├── Repositories
    │   └── Database
    ├── Backend Application Patterns
    │   ├── Controller Pattern
    │   ├── Service Layer Pattern
    │   ├── Repository Pattern
    │   ├── DTO Pattern
    │   ├── Middleware Pattern
    │   ├── Session Management Pattern
    │   └── Exception Handler Pattern
    └── Backend Infrastructure Organization
        ├── Config Organization
        ├── Database Organization
        ├── Middleware Organization
        ├── Auth Organization
        └── Error Handling Organization
```

---

## Variante exacta del backend

Layered Monolithic REST API

Monolithic REST API with N-Layer Architecture using Routes / Controllers / Services / Repositories / Database layers, session-based authentication, centralized error handling, SQL repositories, and PostgreSQL persistence.

---

## Organización de código backend

El backend usa principalmente:

Package by Layer

Porque la estructura está organizada por tipo de responsabilidad técnica:

```text
src/routes
src/controllers
src/services
src/repositories
src/models
src/middlewares
src/db
src/shared
```

Esto significa que todos los controladores viven juntos, todos los servicios viven juntos y todos los repositorios viven juntos.

No usa principalmente Package by Feature, porque no existe una estructura como esta:

```text
src/features/products
  products.routes.ts
  products.controller.ts
  products.service.ts
  products.repository.ts

src/features/auth
  auth.routes.ts
  auth.controller.ts
  users.service.ts
  users.repository.ts
```

Entonces, la descripción más exacta sería:

```text
Classic Layered Folders / Controller Service Repository
```

---

## En términos de capas backend

```text
Routes
Controllers
Services
Repositories
Database
```

El backend no sigue Clean Architecture estricta. Tiene separación por capas y se parece parcialmente a Clean Architecture porque separa controllers, services y repositories, pero mezcla dependencias por imports directos y no tiene una división formal entre `entities`, `use cases`, `interface adapters` e `infrastructure`.

---

# Conclusión corta

```text
Arquitectura general
└── Full-stack 3-Tier Client-Server Architecture
    ├── Frontend React SPA
    ├── Backend REST API
    └── PostgreSQL Database

Frontend
└── Component-Based React SPA
    ├── Client Side Routing
    ├── Route Layout Pattern
    ├── React Context Provider
    ├── Service Layer
    └── Package by Layer with route-local components

Backend
└── Layered Monolithic REST API
    ├── Routes
    ├── Controllers
    ├── Services
    ├── Repositories
    └── PostgreSQL Database
```

> FullStock es una aplicación ecommerce full-stack de arquitectura Client-Server y 3-Tier, con un frontend Component-Based React SPA que usa Client-Side Routing, Context Provider Pattern y Service Layer Pattern, y con un backend Layered Monolithic REST API organizado en rutas, controladores, servicios, repositorios y base de datos.
