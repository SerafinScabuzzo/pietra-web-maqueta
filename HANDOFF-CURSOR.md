# HANDOFF — Maqueta PietraItaly (Cursor)

Este archivo es la fuente de continuidad para un **nuevo Agent de Cursor** en otra computadora. Leelo entero antes de tocar código.

**Fecha de este handoff:** 22/08/2026  
**Estado:** maqueta lista para demo (reunión 31/08/2026) + ajustes posteriores de menú/Home.  
**Repo Git:** privado `https://github.com/SerafinScabuzzo/pietra-web-maqueta.git` — rama `main`.

---

## 0. Dónde está el proyecto (crítico)

Hay **dos carpetas** llamadas “PAGINA WEB”:

| Ruta | Qué es |
|---|---|
| `...\Escritorio\PAGINA WEB` | Contenedor. Tiene un `.docx` y la carpeta del proyecto. **No es el repo.** |
| `...\Escritorio\PAGINA WEB\PAGINA WEB` | **Proyecto real.** Aquí están `package.json`, `src/`, `public/`, `docs/`, `.gitignore`, `.git`. **Trabajá exclusivamente acá.** |

Si Cursor abre la carpeta de afuera, el código vive un nivel adentro.

**No hay backend.** No hay PHP. No hay APIs reales. Todo es frontend React + mocks + `localStorage`.

**Nunca** incluyas ni commitees contraseñas, tokens, API keys ni credenciales de la web productiva.

---

## 1. Objetivo de la maqueta

Prototipo **frontend** para mostrar al programador de producción, el **31/08/2026**, cómo debería sentirse la web **después de cambios puntuales**.

Frase de la reunión: *“tu web actual + estos cambios concretos”*.

No es un rediseño. No es producción. No es un reemplazo del sitio vivo.

Sirve para:

- Conservar identidad visual (colores, Header, Footer, ProductCard).
- Cambiar **cómo se encuentran productos** y **cómo se arma el pedido**.
- Entregar un recorte navegable (público + cliente + Admin mínimo) con datos mock.

---

## 2. Relación web productiva vs maqueta

Hay **dos sistemas distintos**. No mezclarlos.

### Web real (producción)

- URL de referencia: `https://pietraitaly.com.ar/index_2026.php`
- La desarrolló un programador contratado, **sin IA**.
- Backend, clientes reales, admin, pedidos, sync TXT, etc.
- **Fuente de verdad de identidad** si no se pidió cambiar algo: paleta, logo, Header/Footer, cards.

### Maqueta local (este repo)

- React 18 + Vite 5 + TypeScript + Tailwind + React Router 6.
- Nombre npm: `pietra-italy`.
- Mocks + `localStorage`. Confirmación de pedido **mock**.
- Es el código a adaptar / el artefacto de la reunión.

### Jerarquía de fuentes (no revertir)

1. **Web real** = conservar si no se pidió cambiar.
2. **Documento de cambios / fases 3–5** = prioridad funcional.
3. **Mockups IA** = layout de lo **nuevo**, no Header/colores/Footer accidentales del mockup.
4. **Maqueta** = implementación actual a mantener y ajustar con cambios chicos.

La maqueta **no** define política comercial ni matching de login de producción. Preguntas para el programador: `docs/fase-5-ejecucion/preguntas-programador.md` y `docs/fase-5-ejecucion/resumen-para-programador.md`.

Auditorías previas (no rehacer):

- Web real: `docs/auditoria-web-real/`
- Maqueta original: `docs/auditoria-maqueta/`
- Resultado deseado: `docs/fase-3-resultado-deseado/`
- Plan: `docs/fase-4-plan-implementacion/`
- Ejecución: `docs/fase-5-ejecucion/`

---

## 3. Qué se implementó finalmente

- Un solo catálogo: ruta `/buscar`. Visitante ve **PRODUCTOS**; cliente ve **ARMAR PEDIDO**.
- Rubros **globales** (no “rubro de una marca”). Marca + Rubro + Subrubro viven en el **producto**.
- 8 marcas. Página `/marcas` filtra el catálogo (`/buscar?brand=`). Ya no hay taxonomía Marca → Rubros.
- Home: banners Admin → destacados (`isFeatured`) → ofertas (`isOffer`) → CTA **Ver todos los productos** → Footer. **Sin** grilla de marcas.
- Header público sin Secciones y **sin Ofertas**.
- Header cliente **sin Ofertas** y **sin Quiero ser cliente**. Catálogos **antes** de Favoritos.
- Login: label visible **Usuario**. Botones **[DEMO]** discretos para entrar como Cliente o Admin (no usar credenciales de producción).
- Post-login: **Mi Cuenta** + CTA naranja **ARMAR PEDIDO**.
- Armar Pedido desktop: **Filtros | Productos | CartPanel** (abierto, no overlay, minimizable).
- Header Carrito → `/revisar-pedido` (no abre drawer).
- Revisar Pedido: resumen expandido. **Sin** envío, pago, observaciones ni wizard. Confirmar = mock `PED-XXXXXX` + vaciar carrito.
- Precio unificado Card = carrito = Revisar (`getEffectiveUnitPrice`).
- Admin mínimo: rubros globales, producto con Marca/Rubro/Subrubro/Oferta/Destacado, banners = Home.
- Ajustes post-Etapa 5 (ya en código, no necesariamente en docs viejos):
  - Se **quitó Ofertas del menú** cliente (estaba entre Marcas y Favoritos).
  - Se **intercambiaron Catálogos y Favoritos** → orden: Marcas → Catálogos → Favoritos.
  - Home: botón **Ver todos los productos** debajo de Ofertas especiales → `/buscar`.

---

## 4. Las 5 etapas (Fase 5) — ya cerradas

No rehacerlas. Documentación en `docs/fase-5-ejecucion/`.

| Etapa | Doc | Qué |
|---|---|---|
| 0 Preflight | `00-preflight-resultado.md` | Baseline, storage, precio Card vs carrito |
| 1 Modelo | `01-etapa-modelo.md` | 8 marcas, rubros globales, `isOffer` / `isFeatured` |
| 2 Catálogo | `02-etapa-catalogo-navegacion.md` | `/buscar` único, filtros, `/categorias`, `/marcas` |
| 3 Header/Home | `03-etapa-header-home.md` | Menús, Home, autocomplete, Login Usuario, CTA Mi Cuenta |
| 4 Compra | `04-etapa-flujo-compra.md` | 3 columnas, Revisar Pedido, confirmación mock, precios unificados |
| 5 Revisión | `05-revision-final.md` | Demo ready 31/08/2026 |

Guiones de reunión (pueden estar **desactualizados** en el ítem “Header → Ofertas”; el menú ya **no** tiene Ofertas):

- `docs/fase-5-ejecucion/guion-reunion-31-08.md`
- `docs/fase-5-ejecucion/demo-click-by-click.md`
- `docs/fase-5-ejecucion/resumen-para-programador.md`
- `docs/fase-5-ejecucion/preguntas-programador.md`

Si un doc de etapa contradice este HANDOFF, **gana este archivo** (estado del código al 22/08/2026 noche).

---

## 5. Arquitectura final

Stack: React 18, Vite 5, TypeScript, Tailwind 3, React Router 6. **Sin** Redux/Zustand/Context global extra.

```
src/
  app/providers/router.tsx     Rutas + Header/Footer + fondo azul
  components/                  UI reutilizable
  pages/                       Páginas públicas/cliente
  pages/admin/                 Admin mínimo
  data/mocks/                  Seed de marcas, rubros, productos, clientes, catálogos
  store/adminStore.ts          Productos, banners, marcas, rubros (localStorage)
  store/clientStore.ts         Clientes, carrito, favoritos (localStorage)
  types/                       Brand, Category, Subcategory, Product, Client
  utils/auth.ts                Sesión mock
  utils/pricing.ts             Precio efectivo
  utils/search.ts              Query + filtros + sort (Pietra primero)
  utils/catalogParams.ts       Querystring del catálogo
  utils/cartView.ts            Líneas/totales + nro pedido mock
  utils/catalogInvariants.ts   Checks del modelo (dev)
  styles/index.css             Incluye .btn-accent
public/uploads/                Logos, banners, portadas
docs/                          Auditorías y fases (no borrar)
```

**Estado de sesión** (nombres de claves, no valores):

| Clave | Uso |
|---|---|
| `pietra_auth` | Sesión (cliente / admin) |
| `pietra_current_client` | CUIT del cliente activo |
| `pietra_clients` | Lista de clientes mock |
| `pietra_cart_{cuit}` | Carrito por cliente |
| `pietra_admin_store` | Productos/banners/etc. versión `1` |

Eventos window: `pietra_auth_changed`, `pietra_cart_changed`, `pietra_favorites_changed`.

Si `pietra_admin_store` existe **sin** `version === 1`, el store **borra esa clave una vez** y rehidrata mocks. No borrar a mano salvo corrupción.

**Huérfanos (no borrar salvo pedido explícito):** `CartDrawer.tsx`, `CatalogCarousel.tsx`, `pages/Admin.tsx`.

---

## 6. Rutas finales

| Ruta | Qué hace |
|---|---|
| `/` | Home |
| `/buscar` | Catálogo único. Query: `q`, `brand`, `category`, `subcategory`, `offer=1`, `sort`, `page` |
| `/categorias` | 9 rubros globales |
| `/categorias/:categoryId` | Subrubros del rubro |
| `/marcas` | 8 marcas |
| `/marca/:brandId` | Redirect → `/buscar?brand=` |
| `/marca/:brandId/rubro/:categoryId` | Página Rubro legacy (evitar en flujos nuevos) |
| `/ofertas` | Redirect → `/buscar?offer=1` (ruta vieja; **no** está en el menú) |
| `/producto/:productId` | Ficha |
| `/catalogo` | Catálogos PDF/portadas mock |
| `/empresa` | Quiénes somos (H1 de página sigue diciendo “Empresa”) |
| `/login` | Ingresar |
| `/quiero-ser-cliente` | Formulario alta (mock) |
| `/favoritos` | Cliente |
| `/mi-cuenta` | Cliente |
| `/revisar-pedido` | Cliente; visitante → `/login` |
| `/admin` | Dashboard (requiere admin) |
| `/admin/productos` `/marcas` `/rubros` `/catalogos` `/banners` `/clientes` | Admin mínimo |

No crear `/productos` ni `/armar-pedido` como paths extra. Se reutiliza `/buscar`.

Paginación: **24** fijos (`PAGE_SIZE`). Orden default: marca Pietra A–Z primero (`applyDefaultSort`).

---

## 7. Navegación público / cliente

### Público (no logueado)

Inicio · Productos · Categorías · Marcas · Catálogos · Quiénes somos · Ingresar · Quiero ser cliente

Sin Secciones. Sin Ofertas. Sin Favoritos. Sin Carrito. Sin Mi Cuenta.

### Cliente

Inicio · Armar Pedido · Categorías · Marcas · Catálogos · Favoritos · Carrito · Mi Cuenta · Salir

Sin Quiero ser cliente. **Sin Ofertas en el menú** (pedido explícito posterior a Etapa 5).

Las ofertas **siguen existiendo** como:

- bloque “Ofertas especiales” en Home;
- filtro `offer=1` en `/buscar`;
- flag `isOffer` en producto;
- redirect de `/ofertas`.

No reponer el ítem Ofertas en el Header.

---

## 8. Productos / Armar Pedido (`/buscar`)

Misma página, distinto H1:

- Visitante: **PRODUCTOS** (no ve precios B2B; CTA de compra pide login).
- Cliente: **ARMAR PEDIDO**.

Si hay `q=`, el H1 **no** cambia a “Resultados para…”. La query va en **subtítulo**.

Filtros: Marca, Rubro, Subrubro (dependientes del universo filtrado), Solo ofertas, chips, Limpiar. Sort opcional.

Cliente: layout 3 columnas. `CartPanel` a la derecha, **abierto por default**, no overlay, minimizable. El carrito **sobrevive** al cambiar filtros.

`addToCart` incrementa la línea si el SKU ya está.

ProductCard: badge Oferta = `isOffer`. Botón **✓ En carrito** si ya está. No rediseñar la card.

---

## 9. Categorías / Rubros / Subrubros

- **Rubro = Category global.** Sin `brandId`. 9 ids: `herramientas`, `plomeria`, `bano`, `herramientas-manuales`, `corte-perforacion`, `medicion`, `griferia`, `repuestos`, `valvulas`.
- **Subrubro = Subcategory** con `categoryId` padre (14 en mocks).
- Flujo: `/categorias` → click rubro → subrubros → click subrubro → `/buscar?category=&subcategory=`.
- El producto tiene `brandId` + `categoryId` + `subcategoryId`.
- Admin Rubros: **sin** filtro “por marca”.

No volver a atar rubros a una marca. No usar rubro OFERTA/LIQUIDACION: la oferta es `isOffer`.

---

## 10. Marcas

8 ids (orden de producción): `pietra`, `mota`, `prive`, `rao`, `fv`, `tramontina`, `ingco`, `solyon`.

`/marcas` → click → `/buscar?brand={id}`.

Home **no** muestra BrandGrid.

---

## 11. Home

Orden:

1. `BannerSlider` con `getBanners()` (Admin es la fuente).
2. Productos destacados: `isFeatured === true`, máx. 6.
3. Ofertas especiales: `isOffer === true`, máx. 6. “Ver todas →”: cliente va a `/buscar?offer=1`; visitante ve `OffersLoginModal` (Ingresar / Quiero ser cliente).
4. Botón **Ver todos los productos** → `/buscar` (público = Productos, cliente = Armar Pedido).
5. Footer.

Hero de banners ~560px desktop. Sin grilla de marcas.

---

## 12. Buscador (Header)

`SearchBar`: autocomplete SKU + nombre, máx. 8, debounce 250 ms.

- Click sugerencia → `/producto/:id`
- Enter → `/buscar?q=`

No romper este contrato.

---

## 13. Carrito

- Persistido por cliente en `pietra_cart_{cuit}`.
- `CartPanel` solo en `/buscar` logueado.
- Icono Carrito del Header → `/revisar-pedido`. **No** reabrir `CartDrawer`.
- Visitante no compra.

---

## 14. Revisar Pedido

- Solo cliente. Visitante → `/login`.
- Resumen: imagen, SKU, precio unitario, qty, subtotal, eliminar, totales (productos / unidades / $).
- **Sin** envío, pago, observaciones, wizard.
- Confirmar: genera `PED-XXXXXX` (`generateOrderNumber` en `cartView.ts`), muestra pantalla de éxito, `clearCart()`.
- En producción el programador debe enganchar **su** endpoint real; la maqueta no lo simula.

---

## 15. Lógica de precios (demo, no política comercial)

`src/utils/pricing.ts` → `getEffectiveUnitPrice`:

1. Si `priceOffer > 0` → usar `priceOffer`.
2. Si no → `priceList × (1 − client.discountRate)`.

Visitante **no** llama esta función (no ve precios).

`isProductOnOffer` usa **solo** el flag `isOffer`, no compara precios.

Card, `CartPanel` y Revisar Pedido **deben** mostrar el mismo unitario. Si tocás precio, verificá las tres superficies.

El cliente demo tiene descuento 55% (paga 45%) en mocks. Eso es coherencia de prototipo, no una regla nueva para producción.

---

## 16. Admin mínimo

Ruta `/admin/*` detrás de `AdminRoute`.

Usar: Dashboard, Productos, Marcas, Rubros, Catálogos, Banners, Clientes.

Producto: Marca, Rubro, Subrubro, Oferta (`isOffer`), Destacado (`isFeatured`).

Banners del Admin = Home.

**No** hay Pedidos Admin. **No** hay Listas. **No** hay importación TXT. **No** hay módulo Admin Ofertas aparte (son flags del producto).

El Admin todavía muestra el Header público arriba (legacy; no es ticket salvo pedido).

Entrada a Admin en demo: botón **[DEMO] Entrar como Admin** en Login. No documentar ni pedir credenciales de producción.

---

## 17. Mocks

| Archivo | Contenido |
|---|---|
| `src/data/mocks/brands.ts` | 8 marcas |
| `src/data/mocks/categories.ts` | 9 rubros |
| `src/data/mocks/subcategories.ts` | 14 subrubros |
| `src/data/mocks/products.ts` | 37 productos (7 `isOffer`, 6 `isFeatured`) |
| `src/data/mocks/clients.ts` | 2 clientes mock (códigos de demo en código; **no copiarlos a docs ni chats**) |
| `src/data/mocks/catalogs.ts` | Catálogos de portada |

Imágenes de productos/rubros: muchas Unsplash (hace falta red; hay fallback de nombre). Logos/banners locales en `public/uploads/`.

---

## 18. Archivos / componentes importantes

Tocar con cuidado (flujos de demo):

- `src/components/Header.tsx` — menús público/cliente
- `src/pages/Home.tsx`
- `src/pages/Buscar.tsx`
- `src/components/SearchFilters.tsx` + `ActiveFiltersChips.tsx`
- `src/components/CartPanel.tsx`
- `src/components/ProductCard.tsx` — **no rediseñar**
- `src/pages/RevisarPedido.tsx`
- `src/pages/Login.tsx` + `src/utils/auth.ts`
- `src/pages/MiCuenta.tsx`
- `src/store/clientStore.ts` + `adminStore.ts`
- `src/utils/pricing.ts` + `catalogParams.ts` + `search.ts` + `cartView.ts`
- `src/app/providers/router.tsx`

Páginas de navegación: `Categorias.tsx`, `CategoriaRubro.tsx`, `Marcas.tsx`, `Producto.tsx`, `Favoritos.tsx`.

---

## 19. Decisiones que NO deben revertirse

Salvo pedido **explícito** del usuario:

1. No rediseñar paleta, Header visual, Footer, ProductCard, botones.
2. Un solo catálogo: `/buscar`. No duplicar en `/productos` o `/armar-pedido`.
3. Rubros globales. Marcas independientes. Click marca = filtro, no árbol de rubros.
4. Home sin BrandGrid. Destacados/ofertas por **flags**, no “primeros N”.
5. Oferta = `isOffer`, no inferir por precio ni por rubro OFERTA.
6. **Ofertas fuera del menú** (público y cliente).
7. Orden cliente: Catálogos **antes** de Favoritos.
8. Label Login = **Usuario** (el matching interno de producción no se replica).
9. Post-login = Mi Cuenta, no Home. CTA Armar Pedido.
10. Carrito de Armar Pedido = panel lateral, no overlay. Header Carrito = Revisar Pedido.
11. Revisar Pedido sin checkout de envío/pago.
12. Precio efectivo unificado; no volver a fórmulas distintas en Card vs carrito.
13. No reemplazar stores por Redux/Zustand. No sacar Tailwind. No cambiar de router.
14. No “igualar producción al 100%” (miles de productos/clientes).
15. No campaña masiva de tsc/eslint. Solo arreglar lo que abras si rompe la demo.
16. No force push. No reescribir historia Git sin pedido.
17. No commitear `node_modules/`, `dist/`, `.env`, secretos.

---

## 20. Fuera de alcance (permanece fuera)

- Backend, PHP, sync TXT, `enviar_pedido.php`, stock real.
- Recupero de contraseña.
- Mi Cuenta: pedidos reales, facturas, listas, cambio de email de producción.
- Pedidos Admin, Listas, ABM SubRubros dedicado, módulo Ofertas Admin.
- Wizard envío/pago/observaciones.
- UX mobile nueva del layout 3 columnas (hoy se apila; no es rediseño).
- Paridad 2258 productos / 47 rubros / 205 subrubros.
- Copiar header/estilo de mockups IA.
- Favicon Vite, Footer redes/WhatsApp, doble header Admin.

---

## 21. Estado técnico final

- Vite **build OK**.
- tsc: **3** errores legacy (`OfferProductCard` `shortDescription` ×2; `Favoritos` `navigate` unused).
- eslint: **5** legacy (`CatalogCarousel` hooks, Favoritos unused, `adminStore` `_`, `auth.ts` `any` demo).
- Ninguno rompe Header/Home/Buscar/CartPanel/RevisarPedido.
- Consola de demo: 0 errores en el recorrido de Etapa 5.

Git (al momento del handoff):

- Repo inicializado **en la carpeta interna**.
- `origin` → `https://github.com/SerafinScabuzzo/pietra-web-maqueta.git`
- Historial reciente: `8330a36` maqueta + `7303cad` README GitHub + merge `25f10ed` en `main`.
- Rama local de seguridad: `backup-antes-de-integrar-readme` (apunta a `8330a36`).
- Este archivo `HANDOFF-CURSOR.md` puede **no** estar aún en Git hasta un commit posterior.

`.gitignore` excluye `node_modules/`, `dist/`, `.env`, `.env.*` y patrones de secretos.

---

## 22. Cómo levantar la maqueta

En la carpeta **interna**:

```bash
cd "C:\Users\scabu\OneDrive\Escritorio\PAGINA WEB\PAGINA WEB"
npm install
npm run dev
```

Abrir `http://127.0.0.1:5173/` (si 5173 está ocupado, Vite usa 5174).

En la PC original a veces `npm` no estaba en PATH. Alternativa que funcionó: el `node.exe` de Cursor ejecutando `node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173`.

Scripts: `dev`, `build` (`tsc && vite build`), `lint`, `preview`.

### Estado limpio para demo

DevTools → Application → Local Storage del origin local. Borrar solo:

- `pietra_auth`
- `pietra_current_client`
- cualquier `pietra_cart_*`

**No** borrar `pietra_admin_store` ni `pietra_clients` salvo corrupción.

Recargar Home **deslogueado**.

Para recorrer como cliente/admin: Login → sección **[DEMO]** → Entrar como Cliente / Entrar como Admin. **No uses ni documentes credenciales de la web real.**

Detalle click-by-click: `docs/fase-5-ejecucion/demo-click-by-click.md` (ojo: el paso “Header → Ofertas” quedó obsoleto; Ofertas ya no está en el menú).

---

## 23. Cómo seguir haciendo cambios chicos

1. Abrí **esta** carpeta (`PAGINA WEB\PAGINA WEB`), no la de afuera.
2. Leé este HANDOFF + el archivo de la zona que vas a tocar.
3. Cambio **mínimo**. No refactors. No “aprovechar y limpiar”.
4. No reintroducir Ofertas en el menú, BrandGrid en Home, CartDrawer, ni wizard de checkout.
5. Si tocás precio o carrito, verificá ProductCard + CartPanel + Revisar Pedido.
6. Si tocás Header, verificá menú **público y cliente**, desktop y mobile.
7. Si tocás Home, el CTA “Ver todos los productos” debe seguir yendo a `/buscar`.
8. Verificá en el navegador el flujo (no solo el screenshot).
9. No commitees ni pushees salvo que el usuario lo pida.
10. Si el usuario pide commit: no incluir `.env` ni secretos; no force push a `main`.

Preguntas abiertas para producción (no las “resuelvas” en la maqueta): flags `isOffer`/`isFeatured` vs TXT; rubro global vs sync; URL real de confirmar pedido; qué valor es “Usuario” en login productivo.

---

## 24. Mensaje para el próximo Agent

Sos continuador de una **maqueta de demo**, no del sitio productivo.  
Prioridad: cambios chicos, identidad intacta, un solo catálogo, rubros globales, menú sin Ofertas, carrito lateral, Revisar Pedido simple, precios unificados.  
Si dudás, conservá lo que ya está y preguntá. No rediseñes.
