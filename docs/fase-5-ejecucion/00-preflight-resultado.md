# Fase 5 — Etapa 0: resultado del preflight

Fecha: 22/08/2026  
CWD: `C:\Users\scabu\OneDrive\Escritorio\PAGINA WEB\PAGINA WEB`  
Servidor: Vite 5 ya levantado en `http://127.0.0.1:5173/`  
Node usado: `C:\Users\scabu\AppData\Local\Programs\cursor\resources\app\resources\helpers\node.exe` (v22.22.1)  
`npm`: no está en PATH.

**No se modificó `src/`, mocks, CSS, rutas, localStorage del usuario ni se descargaron assets. No se inició Etapa 1.**

Guion: `docs/fase-4-plan-implementacion/01-preflight.md` (alineado a las 3 correcciones) + puntos extra pedidos.

---

## 1. Maqueta levanta

**SÍ.** `GET /` → HTTP 200. Título `PietraItaly`. Home muestra hero de catálogo (`CatalogCarousel`), marcas, destacados y ofertas.

---

## 2. Rutas principales

Vite es SPA: casi todo responde **200 + `index.html`**. Lo que importa es si hay ruta React y contenido.

| URL | HTTP | Contenido real (ahora) |
|---|---|---|
| `/` | 200 | Home viva |
| `/buscar` | 200 | Catálogo. **30 productos disponibles.** Filtro **Solo ofertas** visible (visitante) |
| `/login` | 200 | Form + botones demo |
| `/ofertas` | 200 | Vitrina ofertas (7 vía `priceOffer`) |
| `/marca/pietra` `/marca/mota` `/marca/fv` | 200 | Rubros de marca (rol que se retira en E3) |
| `/catalogo` `/empresa` `/quiero-ser-cliente` | 200 | Vivas |
| `/producto/pie-001` | 200 | Ficha viva |
| `/favoritos` | 200 | Página existe (cliente) |
| `/mi-cuenta` | 200 | Existe; sin sesión redirige a `/login` |
| `/admin` | 200 | Guard: sin admin → Home |
| `/revisar-pedido` | 200 HTML vacío en `<main>` | **No hay ruta.** No es 404 de servidor; la página no existe |
| `/marcas` `/categorias` | 200 HTML vacío | **No hay ruta** todavía (E3) |

Header visitante **hoy**: Secciones, **Ofertas** (`/ofertas`), Catálogo, Empresa, Ingresar, Quiero ser cliente.  
Home “Ver todas →” **hoy** apunta a `/ofertas` (no aviso; no `/buscar?offer=1`).

---

## 3. Login demo cliente

**Botón “Entrar como Cliente (modo demo)” / `setClientDemoMode`: VERIFICADO.**

- Aterriza en `/mi-cuenta`.
- Header pasa a Favoritos / Carrito / Mi cuenta / Salir.
- Datos demo y descuento **55%** (“Pagás 45% del precio de lista”).
- **No usa `require()`.**

**Formulario CUIT: NO VERIFICADO** de forma concluyente. `loginClient` en `auth.ts` usa `require('../store/clientStore')` (eslint `no-var-requires`). El submit sintético del preflight no dejó sesión. Para la reunión: **usar el botón demo**, no el form.

No se persistió ninguna sesión en este informe.

---

## 4. Login demo admin

**`setAdminMode` / botón “Entrar como Admin (modo demo)”: VERIFICADO.**

- Aterriza en `/admin`.
- Dashboard: 30 productos, **3 marcas**, 9 rubros, 1 catálogo, 2 banners.
- Sigue el chrome público + Admin (doble header). Fuera de alcance.

---

## 5. localStorage actual

**No se leyó ni se borró el perfil de Chrome/Edge del usuario.** Solo una sesión headless nueva (perfil temporal).

### Claves que la app escribe

| Clave | Quién | ¿Apareció en sesión headless? |
|---|---|---|
| `pietra_auth` | `auth.ts` | Sí, tras demo cliente (`role: client`) |
| `pietra_current_client` | `clientStore` / demo | Sí |
| `pietra_clients` | `clientStore` | Sí (lista mock + demo) |
| `pietra_cart_{cuit}` | `clientStore` | Sí, `pietra_cart_11111111111` |
| `pietra_admin_store` | `adminStore.saveToStorage` | **No** en la sesión limpia |

En una máquina donde alguien haya guardado desde Admin, **sí puede existir** `pietra_admin_store` (rehidrata `products`, `catalogs`, `banners`). `brands` y `categories` se pisan con el mock en cada load.

---

## 6. `pietra_admin_store`

Código: `loadFromStorage` **sí** rehidrata `products` y `banners`. `normalizeCategories()` pisa rubros. `normalizeProducts()` reasigna `categoryId` inválido al “primer rubro de la marca” (`c.brandId`).

Esa rama **se rompe** cuando Etapa 1 quite `brandId` de `Category`.

En la sesión headless de este preflight **la clave no existía**. En la máquina de demo del usuario: **desconocido** (no se inspeccionó). Antes de Etapa 1 hay que mirar DevTools → Application → Local Storage.

---

## 7. Estrategia de datos legacy (decisión; NO ejecutada)

**Recomendada: B — limpiar mocks incompatibles.**

| | A migrar/normalizar | B limpiar |
|---|---|---|
| Qué | Ampliar `normalizeProducts` (ids viejos → globales + flags + `subcategoryId`) y convivir con `pietra_admin_store` sucio | Borrar **una vez** `pietra_admin_store` en la máquina de demo y arrancar desde mocks nuevos |
| Pros | Conserva productos editados en Admin | Simple. 8 marcas + flags + subrubros salen limpios |
| Contras | Fácil dejar huérfanos; banners viejos con JPG 404 | Se pierden edits locales de Admin |

Prioridad: **simplicidad demo**. Etapa 1 escribe mocks (8 marcas + mínimo de productos) y, si la clave existe, se borra en ese momento (paso explícito, documentado en `checkpoint-modelo`). **No se hizo ahora.**

---

## 8. Assets banners existentes

En `public/uploads/`:

| Archivo | Bytes | Uso |
|---|---|---|
| `banner principal.jpg` | 389864 | `Catalogo.tsx` / fallback carrusel |
| `portadaCatalogo.png` | 845521 | `catalogs.ts` cover — **usable como seed de banner** |
| `LOGO PIETRA 4.1.png` | 20369 | Logo Pietra |
| `LOGO PIETRA 4.png` | 13362 | Sin referencia |
| `motaPortada.png` | 22086 | Hero Mota |
| `portadaFV.jpg` | 77537 | Hero FV |
| `CARATULA FV.png` | 227667 | Sin referencia en código |

No hay otros JPG/PNG de banner en `public/`.

---

## 9. Referencias rotas de banners

Seed `adminStore.ts`:

- `imageUrl: /uploads/banner-1.jpg` → **NO EXISTE** en disco. Vite sirve `index.html` (200, `Content-Type: text/html`).
- `imageUrl: /uploads/banner-2.jpg` → **igual**.
- `buttonLink` banner-2: `/ofertas`.

Home **hoy no consume** estos banners (`CatalogCarousel`). En Etapa 4 el Home **sí** los usará: hay que cambiar el seed a un archivo existente (p. ej. `portadaCatalogo.png` / `banner principal.jpg`) **en Etapa 1**, sin descargar nada.

---

## 10. TypeScript baseline — NO arreglado

`node.exe node_modules/typescript/bin/tsc --noEmit --pretty false` → **exit 2, 15 errores** (mismo set que Fase 2).

| Archivo | Error |
|---|---|
| `OfferProductCard.tsx` 72, 74 | `shortDescription` no existe en `Product` |
| `SearchFilters.tsx` 9 | `onClose` unused |
| `AdminProductos.tsx` 75 | `categoryId` `string \| undefined` |
| `AdminProductos.tsx` 97 | `productCategory` unused |
| `AdminProductos.tsx` 296–307 | `shortDescription` / `ean` no están en el type |
| `Buscar.tsx` 10 | `setSearchParams` unused |
| `Favoritos.tsx` 8 | `navigate` unused |
| `Login.tsx` 86 | `handleDemoLogin` unused |
| `MiCuenta.tsx` 2 | `Link` unused |
| `adminStore.ts` 20 | `ALLOWED_BRAND_IDS` unused |
| `clientStore.ts` 1 | import `CartItem` unused |

---

## 11. ESLint baseline — NO arreglado

`eslint . --ext ts,tsx --max-warnings 0` → **exit 1, 13 errores** (mismo set que Fase 2).

| Archivo | Error |
|---|---|
| `CatalogCarousel.tsx` 27 | `useEffect` condicional (`rules-of-hooks`) |
| `SearchFilters.tsx` 9 | `onClose` unused |
| `Buscar.tsx` 10 | `setSearchParams` unused |
| `Favoritos.tsx` 8 | `navigate` unused |
| `Login.tsx` 86 | `handleDemoLogin` unused |
| `MiCuenta.tsx` 2 | `Link` unused |
| `AdminProductos.tsx` 97 | `productCategory` unused |
| `adminStore.ts` 20, 153 | `ALLOWED_BRAND_IDS` / `_` unused |
| `clientStore.ts` 1 | `CartItem` unused |
| `auth.ts` 60 | `require()` |
| `auth.ts` 169, 185 | `any` |

---

## 12. Clase A vs B

Sin cambios respecto de `01-preflight.md`. Revalidado el conteo.

### Clase A — arreglar DENTRO de la etapa que abre el archivo

| Archivo | Etapa |
|---|---|
| `adminStore.ts` (`ALLOWED_BRAND_IDS`) | 1 |
| `SearchFilters.tsx` (`onClose`) | 2 |
| `Buscar.tsx` (`setSearchParams`) | 2 |
| `Login.tsx` (`handleDemoLogin`) | 7 |
| `MiCuenta.tsx` (`Link`) | 7 |
| `AdminProductos.tsx` (categoryId / productCategory / shortDescription / ean) | 8 |

### Clase B — NO TOCAR

| Archivo | Por qué B |
|---|---|
| `OfferProductCard.tsx` | `/ofertas` deja de ser catálogo |
| `CatalogCarousel.tsx` | Home deja de importarlo en E4 |
| `Favoritos.tsx` | No se toca Favoritos |
| `clientStore.ts` import unused | No se reemplaza el store |
| `auth.ts` `require` / `any` | Botones demo no pasan por `require` |
| `adminStore.ts` `_` unused | Cosmético |

---

## 13. Coherencia precios Card → Carrito

**VERIFICADO. Hay inconsistencia. Fórmula no tocada.**

Producto de prueba: **Disco diamantado 115mm** (`pie-001`), cliente demo (descuento 55%).

| Superficie | Qué muestra | Número |
|---|---|---|
| Card (`ProductCard`) | `priceOffer` naranja + `priceList` tachado. **No** aplica `discountRate` | **$1.200** / ~~$1.500~~ |
| Carrito (`CartDrawer`) | Unidad = `priceList * (1 - discountRate)`. **Ignora** `priceOffer` | **$675** |
| Resumen drawer | Subtotal lista $1.500; descuento 55% −$825; total $675 | $675 |

Código:

- Card: si hay `priceOffer`, pinta ese número; si no, `priceList`.
- Drawer: siempre `priceList`; nunca `priceOffer`.
- `Revisar Pedido` no existe todavía.

Misma línea, dos importes. Etapas 5–6 deben unificar (plan F4). **Etapa 0 no cambia la fórmula.**

---

## 14. Assets de las 8 marcas (no se descargó nada)

Hoy el mock solo tiene **Pietra, Mota, FV**. `AdminMarcas` lista ids extra (`tramontina`, `ingco`, `prive`, `rao`, `mozart`, `varios-*`) pero **no hay registros**.

| Marca | id planificado | Logo local | Imagen usable | Estado |
|---|---|---|---|---|
| Pietra | `pietra` | `/uploads/LOGO PIETRA 4.1.png` | la misma | **disponible** |
| Mota | `mota` | `/uploads/mota-logo.png` **ausente** (Vite devuelve HTML) | `/uploads/motaPortada.png` | logo **faltante**; hero usable |
| F.V | `fv` | `/uploads/fv-logo.png` **ausente** | `/uploads/portadaFV.jpg` (y `CARATULA FV.png` huérfana) | logo **faltante**; imagen usable |
| Prive | `prive` | no existe | no existe | **faltante** |
| Rao | `rao` | no existe | no existe | **faltante** |
| Tramontina | `tramontina` | no existe | no existe | **faltante** |
| Ingco | `ingco` | no existe | no existe | **faltante** |
| Solyon Argentina SA | `solyon` | no existe | no existe | **faltante** |

Etapa 1: alta visual de las 5 faltantes + 1 producto mínimo c/u. Logos ausentes → `onError` / placeholder. **No descargar.**

---

## Screenshots baseline

Carpeta: `docs/fase-5-ejecucion/screenshots/` (no en `src/assets`).

| Archivo | Qué |
|---|---|
| `01-home.png` | Home visitante |
| `02-buscar.png` | `/buscar` 30 productos |
| `03-mi-cuenta.png` | Tras demo cliente |
| `04-admin.png` | Dashboard admin |
| `05-carrito.png` | Drawer con PIE-001; Card $1.200 vs línea $675 |

---

## Estado actual de la maqueta (resumen)

- App navegable. 3 marcas, ~30 productos, 9 rubros atados a marca.
- Home: catálogo-como-hero, grilla de marcas, destacados = primeros 6, ofertas = `priceOffer < priceList`.
- Visitante ve ofertas y **tiene** Ofertas en el menú (`/ofertas`).
- `/buscar` ya tiene checkbox Solo ofertas (visitante).
- Carrito = overlay Header. “Finalizar compra” **inerte**. No existe `/revisar-pedido`.
- Banners Admin no alimentan Home; sus JPG seed no existen.

---

## Criterios de aceptación de Etapa 0

- [x] Maqueta navegable
- [x] Tabla A/B tsc/eslint
- [x] Decisión `pietra_admin_store` (**B**, no ejecutada)
- [x] Decisión imágenes de banner (usar asset existente en E1)
- [x] Inventario 8 marcas
- [x] Precios Card vs carrito documentados
- [x] Nada de `src/` modificado
