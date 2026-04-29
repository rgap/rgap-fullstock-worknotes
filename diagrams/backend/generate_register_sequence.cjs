const fs = require("fs");

let idC = 0;
function uid() { return `e${++idC}`; }
const els = [];
const ts = Date.now();
const rng = () => ~~(Math.random() * 2e9);

// ── Primitives ──────────────────────────────────────────────
function rect(x, y, w, h, o = {}) {
  const id = uid();
  els.push({
    id, type: "rectangle", x, y, width: w, height: h, angle: 0,
    strokeColor: o.sc || "#1e1e1e", backgroundColor: o.bg || "transparent",
    fillStyle: "solid", strokeWidth: o.sw || 2, strokeStyle: o.dash ? "dashed" : "solid",
    roughness: 0, opacity: 100, groupIds: [], frameId: null,
    roundness: o.round ? { type: 3 } : null,
    seed: rng(), version: 1, versionNonce: rng(),
    isDeleted: false, boundElements: [], updated: ts, link: null, locked: false,
  });
  return id;
}

function txt(x, y, text, o = {}) {
  const id = uid();
  const fs2 = o.fs || 14;
  const lh = 1.25;
  const lines = text.split("\n");
  const h = lines.length * fs2 * lh;
  const w = Math.max(...lines.map(l => l.length)) * fs2 * 0.6;
  els.push({
    id, type: "text", x, y, width: w, height: h, angle: 0,
    strokeColor: o.color || "#1e1e1e", backgroundColor: "transparent",
    fillStyle: "solid", strokeWidth: 1, strokeStyle: "solid",
    roughness: 0, opacity: 100, groupIds: [], frameId: null, roundness: null,
    seed: rng(), version: 1, versionNonce: rng(),
    isDeleted: false, boundElements: [], updated: ts, link: null, locked: false,
    text, fontSize: fs2, fontFamily: 3,
    textAlign: o.align || "left", verticalAlign: "top",
    containerId: null, originalText: text, autoResize: true, lineHeight: lh,
  });
  return id;
}

function line(x1, y1, x2, y2, o = {}) {
  els.push({
    id: uid(), type: "line", x: x1, y: y1,
    width: Math.abs(x2 - x1) || 1, height: Math.abs(y2 - y1) || 1, angle: 0,
    strokeColor: o.color || "#adb5bd", backgroundColor: "transparent",
    fillStyle: "solid", strokeWidth: o.sw || 1, strokeStyle: o.dash ? "dashed" : "solid",
    roughness: 0, opacity: 100, groupIds: [], frameId: null, roundness: null,
    seed: rng(), version: 1, versionNonce: rng(),
    isDeleted: false, boundElements: [], updated: ts, link: null, locked: false,
    points: [[0, 0], [x2 - x1, y2 - y1]],
    lastCommittedPoint: null, startBinding: null, endBinding: null,
    startArrowhead: null, endArrowhead: null,
  });
}

function arrow(x1, y1, x2, y2, o = {}) {
  els.push({
    id: uid(), type: "arrow", x: x1, y: y1,
    width: Math.abs(x2 - x1) || 1, height: Math.abs(y2 - y1) || 1, angle: 0,
    strokeColor: o.color || "#1e1e1e", backgroundColor: "transparent",
    fillStyle: "solid", strokeWidth: o.sw || 2, strokeStyle: o.dash ? "dashed" : "solid",
    roughness: 0, opacity: 100, groupIds: [], frameId: null, roundness: { type: 2 },
    seed: rng(), version: 1, versionNonce: rng(),
    isDeleted: false, boundElements: [], updated: ts, link: null, locked: false,
    points: [[0, 0], [x2 - x1, y2 - y1]],
    lastCommittedPoint: null, startBinding: null, endBinding: null,
    startArrowhead: null, endArrowhead: "arrow",
  });
}

// ── Layout ──────────────────────────────────────────────────
const COL_W = 260;
const HEAD_Y = 0;
const HEAD_H = 50;
const BOX_W = 200;

// 7 actors in the order requested
const actors = [
  { label: "Client",       col: 0, bg: "#e7f5ff", sc: "#1971c2" },
  { label: "Routes",       col: 1, bg: "#f3f0ff", sc: "#7048e8" },
  { label: "Controllers",  col: 2, bg: "#fff4e6", sc: "#e8590c" },
  { label: "Services",     col: 3, bg: "#ebfbee", sc: "#2f9e44" },
  { label: "Repositories", col: 4, bg: "#e6fcf5", sc: "#0ca678" },
  { label: "Database",     col: 5, bg: "#fff9db", sc: "#f08c00" },
  { label: "Shared",       col: 6, bg: "#f8f0fc", sc: "#862e9c" },
];

function cx(col) { return col * COL_W + BOX_W / 2; }
function colX(col) { return col * COL_W; }

// ── Title ───────────────────────────────────────────────────
txt(0, HEAD_Y - 80, "Diagrama de Secuencia — POST /auth/register", { fs: 22, color: "#1971c2" });
txt(0, HEAD_Y - 50, "Body: { email: string, password: string, confirmPassword: string }", { fs: 13, color: "#495057" });

// ── Lifeline end Y (will be computed after messages) ────────
let LIFE_END = 5600;

// ── Draw actor headers + lifelines ──────────────────────────
actors.forEach(a => {
  const x = colX(a.col);
  // Top box
  rect(x, HEAD_Y, BOX_W, HEAD_H, { bg: a.bg, sc: a.sc, round: true });
  txt(x + 15, HEAD_Y + 14, a.label, { fs: 16, color: a.sc });
  // Lifeline (dashed)
  line(cx(a.col), HEAD_Y + HEAD_H, cx(a.col), LIFE_END, { color: "#ced4da", dash: true });
  // Bottom box
  rect(x, LIFE_END + 5, BOX_W, HEAD_H, { bg: a.bg, sc: a.sc, round: true });
  txt(x + 15, LIFE_END + 19, a.label, { fs: 16, color: a.sc });
});

// ── Messages ────────────────────────────────────────────────
let y = HEAD_Y + HEAD_H + 60;
const GAP = 170;

function msg(step, from, to, label, detail, isDash, color) {
  const curY = y;
  const x1 = cx(from);
  const x2 = cx(to);

  if (from === to) {
    // Self-call: small loop to the right
    const lw = 70;
    arrow(x1 + 2, curY, x1 + lw, curY, { color });
    line(x1 + lw, curY, x1 + lw, curY + 20, { color, sw: 2 });
    arrow(x1 + lw, curY + 20, x1 + 2, curY + 20, { color, dash: true });
    txt(x1 + lw + 10, curY - 16, `${step}. ${label}`, { fs: 12, color });
    if (detail) txt(x1 + lw + 10, curY + 14, detail, { fs: 10, color: "#868e96" });
  } else {
    arrow(x1, curY, x2, curY, { color, dash: isDash, sw: 2 });
    const lx = from < to ? x1 + 8 : x2 + 8;
    const topLines = label.split("\n");
    const topH = topLines.length * 16;
    txt(lx, curY - topH - 12, `${step}. ${label}`, { fs: 12, color });
    if (detail) txt(lx, curY + 10, detail, { fs: 10, color: "#868e96" });
  }
  y += GAP;
}

function note(text, atCol, color, width) {
  const x = colX(atCol) - 10;
  const lines = text.split("\n");
  const h = 14 + lines.length * 14;
  rect(x, y - 10, width || 440, h, { sc: color, bg: color + "12", sw: 1, round: true, dash: true });
  txt(x + 8, y - 5, text, { fs: 10, color });
  y += h + 25;
}

// ═══════════════════════════════════════════════════════════
// DETAILED SEQUENCE — 28 STEPS
// ═══════════════════════════════════════════════════════════

// ── Middleware note ─────────────────────────────────────────
note(
  "Middleware chain (src/app.ts):\n" +
  "  1. morgan(\"dev\")         → Log: POST /api/register 201\n" +
  "  2. express.json()        → Parsea JSON body a req.body\n" +
  "  3. sessionMiddleware     → express-session (store: connect-pg-simple → PostgreSQL tabla sessions)\n" +
  "  4. routes                → Enruta al Router principal (src/routes.ts)",
  0, "#495057", 680
);

// 1
msg(1, 0, 1,
  "POST /api/register",
  "Content-Type: application/json\nBody: { email, password, confirmPassword }",
  false, "#1971c2");

// 2
msg(2, 1, 1,
  "router.use(\"/api/\", authRoutes)",
  "src/routes.ts:8 → Delega a src/routes/auth.routes.ts",
  false, "#7048e8");

// 3
msg(3, 1, 2,
  "router.post(\"/register\", authController.register)",
  "src/routes/auth.routes.ts:6\nauthController.register(req, res, next)",
  false, "#7048e8");

// 4
msg(4, 2, 2,
  "Extraer campos del body",
  "const body = req.body as Partial<RegisterRequest>\nemail = body.email?.trim() ?? \"\"\npassword = body.password ?? \"\"\nconfirmPassword = body.confirmPassword ?? \"\"\nsrc/controllers/auth.controller.ts:12-15",
  false, "#e8590c");

// 5
msg(5, 2, 6,
  "Validar campos → ValidationError si falla",
  "src/controllers/auth.controller.ts:17-41 + src/shared/errors.ts:8-16\n!email → \"El campo email es obligatorio\"\n!email.includes(\"@\") → \"Formato de correo inválido\"\n!password → \"El campo contraseña es obligatorio\"\npassword.length < 6 → \"La contraseña debe tener al menos 6 caracteres\"\n!confirmPassword → \"El campo confirmar contraseña es obligatorio\"\npassword !== confirmPassword → \"Las contraseñas no coinciden\"\nSi errors no vacío → throw new ValidationError(\"Error de validación\", errors)",
  false, "#e03131");

// ALT: validation error path
note(
  "[alt] Si validación falla:\n" +
  "  throw new ValidationError(\"Error de validación\", errors)\n" +
  "  → catch(error) → next(error)\n" +
  "  → src/middlewares/error.middleware.ts:35-37\n" +
  "  → instanceof ValidationError → res.status(422).json({ error: \"Error de validación\", errors: {...} })",
  2, "#e03131", 600
);

// 6
msg(6, 2, 3,
  "usersService.createUser(email, password)",
  "src/controllers/auth.controller.ts:43\nPasa email (limpio, trimmed) y password (plano) al servicio",
  false, "#2f9e44");

// 7
msg(7, 3, 4,
  "usersRepository.findByEmail(email)",
  "src/services/users.service.ts:13\nVerifica si ya existe un usuario registrado con ese email",
  false, "#0ca678");

// 8
msg(8, 4, 5,
  "query<User>(\"SELECT * FROM users WHERE email = $1\", [email])",
  "src/repositories/users.repository.ts:6-8\nQuery parametrizada para prevenir SQL injection",
  false, "#f08c00");

// 9
msg(9, 5, 5,
  "pool.query(text, params)",
  "src/db/index.ts:14\nconst start = Date.now()\nres = await pool.query<User>(text, params)\nconsole.log(\"executed query\", { text, duration, rows: res.rowCount })\nreturn { ...res, rows: camelcaseKeys(res.rows) as User[] }",
  false, "#f08c00");

// 10
msg(10, 5, 4,
  "return { rows: [] }  (usuario no encontrado)",
  "rowCount: 0 — No existe usuario con ese email\ncamelcaseKeys aplicado (sin efecto en array vacío)",
  true, "#f08c00");

// 11
msg(11, 4, 3,
  "return result.rows[0] || null → null",
  "src/repositories/users.repository.ts:9",
  true, "#0ca678");

// ALT: conflict error
note(
  "[alt] Si existingUser !== null (email ya registrado):\n" +
  "  src/services/users.service.ts:15-17\n" +
  "  throw new ConflictError(\"Correo electrónico ya registrado\")\n" +
  "  → catch → next(error) → errorHandler\n" +
  "  → src/middlewares/error.middleware.ts:38-40\n" +
  "  → instanceof ConflictError → res.status(409).json({ error: \"Correo electrónico ya registrado\" })",
  3, "#e03131", 600
);

// 12
msg(12, 3, 6,
  "hashPassword(password)",
  "src/services/users.service.ts:19 → src/shared/hash.ts:3-6\nconst saltRounds = 10\nreturn bcrypt.hash(password, saltRounds)\nAlgoritmo: bcrypt, 10 rondas de sal",
  false, "#862e9c");

// 13
msg(13, 6, 3,
  "return hashedPassword: string",
  "Ej: \"$2a$10$N9qo8uLOickgx2ZMRZoMye...\" (60 caracteres)\nbcrypt hash con sal embebida",
  true, "#862e9c");

// 14
msg(14, 3, 4,
  "usersRepository.create({ email, password: hashedPassword })",
  "src/services/users.service.ts:20-23\nPasa email y password ya hasheado al repositorio",
  false, "#0ca678");

// 15
msg(15, 4, 5,
  "query<User>(\"INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *\",\n  [email, hashedPassword])",
  "src/repositories/users.repository.ts:13-16\nRETURNING * devuelve la fila recién insertada",
  false, "#f08c00");

// 16
msg(16, 5, 5,
  "pool.query(INSERT SQL, [email, hash])",
  "src/db/index.ts:14 — Ejecuta INSERT en PostgreSQL\nTabla users:\n  id: SERIAL PRIMARY KEY (auto-increment)\n  email: text NOT NULL UNIQUE\n  password: text NOT NULL (bcrypt hash 60 chars)\n  created_at: timestamptz DEFAULT CURRENT_TIMESTAMP\n  updated_at: timestamptz DEFAULT CURRENT_TIMESTAMP\nconsole.log(\"executed query\", { text, duration, rows: 1 })",
  false, "#f08c00");

// 17
msg(17, 5, 4,
  "return { rows: camelcaseKeys([{ id, email, password, created_at, updated_at }]) }",
  "camelcaseKeys transforma:\n  created_at → createdAt\n  updated_at → updatedAt\nrowCount: 1",
  true, "#f08c00");

// 18
msg(18, 4, 3,
  "return result.rows[0]! → User",
  "src/repositories/users.repository.ts:22\nUser: { id: number, email: string, password: string,\n        createdAt: string, updatedAt: string }",
  true, "#0ca678");

// 19
msg(19, 3, 2,
  "return User (objeto completo con password hasheado)",
  "src/services/users.service.ts:25\nRetorna al controller para continuar el flujo",
  true, "#2f9e44");

// 20
msg(20, 2, 6,
  "commitSession(req, { userId: user.id })",
  "src/controllers/auth.controller.ts:45 → src/shared/session.ts:11-36\n1. req.session.regenerate(callback)\n   → Destruye sesión anterior, crea nueva con nuevo sid\n2. Object.assign(req.session, { userId: user.id })\n   → Almacena userId en los datos de sesión\n3. req.session.save(callback)\n   → Persiste sesión en el store",
  false, "#862e9c");

// 21
msg(21, 6, 5,
  "connect-pg-simple → INSERT INTO sessions (sid, sess, expire)",
  "src/middlewares/session.middleware.ts:10-28\nStore: PgSession({ pool, tableName: \"sessions\" })\nTabla sessions:\n  sid: text PRIMARY KEY (ej: \"abc123...\")\n  sess: jsonb { cookie: {...}, userId: N }\n  expire: timestamp (now + SESSION_MAX_AGE_HOURS * 3600000)\nCookie configurada:\n  name: env.SESSION_NAME (default: \"sessionId\")\n  httpOnly: true, sameSite: \"strict\"\n  secure: true (si NODE_ENV === production)\n  maxAge: env.SESSION_MAX_AGE_HOURS * 3600000",
  false, "#862e9c");

// 22
msg(22, 5, 6,
  "Session insertada en PostgreSQL ✓",
  "sid almacenado en tabla sessions\nCookie Set-Cookie preparada en response headers",
  true, "#862e9c");

// 23
msg(23, 6, 2,
  "Promise<void> resolved — sesión guardada",
  "commitSession completado exitosamente\nHeaders Set-Cookie listos en res",
  true, "#862e9c");

// 24
msg(24, 2, 6,
  "toUserDto(user) → UserDto",
  "src/controllers/auth.controller.ts:47 → src/models/user.model.ts:11-14\nconst { password: _, ...userDto } = user\nElimina el campo password del objeto User\ntype UserDto = Omit<User, \"password\">\nResultado: { id, email, createdAt, updatedAt }",
  false, "#862e9c");

// 25
msg(25, 6, 2,
  "return UserDto",
  "{ id: number, email: string,\n  createdAt: string, updatedAt: string }\nSin password — seguro para enviar al cliente",
  true, "#862e9c");

// 26
msg(26, 2, 0,
  "res.status(201).json({ data: UserDto })",
  "HTTP 201 Created\nHeaders:\n  Set-Cookie: sessionId=s%3A...; Path=/; HttpOnly; SameSite=Strict\n  Content-Type: application/json\nBody:\n  {\n    \"data\": {\n      \"id\": 1,\n      \"email\": \"user@example.com\",\n      \"createdAt\": \"2026-04-26T22:46:00.000Z\",\n      \"updatedAt\": \"2026-04-26T22:46:00.000Z\"\n    }\n  }",
  true, "#1971c2");

// ── LEGEND ──────────────────────────────────────────────────
y += 30;
const legendY = y;
txt(0, legendY, "LEYENDA", { fs: 16, color: "#1e1e1e" });
const legendItems = [
  ["─── → (sólida)", "Llamada / request", "#1e1e1e"],
  ["- - - → (punteada)", "Respuesta / return", "#868e96"],
  ["█ Client", "Browser o Postman (HTTP)", "#1971c2"],
  ["█ Routes", "src/routes.ts + src/routes/auth.routes.ts", "#7048e8"],
  ["█ Controllers", "src/controllers/auth.controller.ts", "#e8590c"],
  ["█ Services", "src/services/users.service.ts", "#2f9e44"],
  ["█ Repositories", "src/repositories/users.repository.ts", "#0ca678"],
  ["█ Database", "src/db/index.ts → PostgreSQL (Pool)", "#f08c00"],
  ["█ Shared", "shared/errors.ts, hash.ts, session.ts + models/user.model.ts", "#862e9c"],
  ["[alt] Rojo", "Caminos de error alternativos", "#e03131"],
];
legendItems.forEach((item, i) => {
  txt(0, legendY + 28 + i * 22, `${item[0]}  —  ${item[1]}`, { fs: 12, color: item[2] });
});

// ── FILES LIST ──────────────────────────────────────────────
const filesY = legendY + 28 + legendItems.length * 22 + 25;
txt(0, filesY, "ARCHIVOS INVOLUCRADOS", { fs: 16, color: "#1e1e1e" });
const filesList = [
  "src/app.ts                             → Middlewares: morgan, express.json, session, routes, errorHandler",
  "src/routes.ts                          → router.use(\"/api/\", authRoutes)                       [línea 8]",
  "src/routes/auth.routes.ts              → router.post(\"/register\", authController.register)     [línea 6]",
  "src/controllers/auth.controller.ts     → register(): validar body, llamar service, crear sesión [líneas 10-51]",
  "src/types/auth.types.ts                → RegisterRequest { email, password, confirmPassword }",
  "src/services/users.service.ts          → createUser(): check email, hash pwd, repo.create       [líneas 12-26]",
  "src/repositories/users.repository.ts   → findByEmail(), create(): SQL parametrizado             [líneas 5-23]",
  "src/db/index.ts                        → Pool PG, query() con logging y camelcaseKeys           [líneas 9-24]",
  "src/shared/errors.ts                   → ValidationError(msg, errors), ConflictError(msg)",
  "src/shared/hash.ts                     → hashPassword(pwd): bcrypt.hash(pwd, 10)                [líneas 3-6]",
  "src/shared/session.ts                  → commitSession(req, data): regenerate+assign+save       [líneas 11-36]",
  "src/models/user.model.ts               → User, UserDto = Omit<User,\"password\">, toUserDto()     [líneas 1-14]",
  "src/middlewares/session.middleware.ts   → express-session + connect-pg-simple (PgSession)        [líneas 1-30]",
  "src/middlewares/error.middleware.ts     → errorHandler: Error class → HTTP status code           [líneas 18-44]",
  "db/schema.sql                          → CREATE TABLE users (id, email, password, timestamps)",
  "db/schema.sql                          → CREATE TABLE sessions (sid, sess, expire)",
];
filesList.forEach((f, i) => {
  txt(0, filesY + 28 + i * 18, f, { fs: 11, color: "#495057" });
});

// ── Output ──────────────────────────────────────────────────
const doc = {
  type: "excalidraw",
  version: 2,
  source: "https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor",
  elements: els,
  appState: { gridSize: 20, gridStep: 5, gridModeEnabled: false, viewBackgroundColor: "#ffffff" },
  files: {},
};

const out = __dirname + "/05_register-sequence.excalidraw";
fs.writeFileSync(out, JSON.stringify(doc, null, 2));
console.log("✅ Created:", out, "—", els.length, "elements");
