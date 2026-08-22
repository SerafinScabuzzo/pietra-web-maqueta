# Etapa 4 — Header y Home

---

## OBJETIVO

Menús exactos de Fase 3. Home visitante: banners Admin protagonistas, sin marcas, sin CTA “Todos nuestros productos”, destacados por `isFeatured`, **tarjetas de oferta visibles** por `isOffer`. El visitante **no** tiene Ofertas en el menú. Click “Ver más” / “Ver todas las ofertas” → **aviso** (ofertas completas para clientes; Ingresar / Quiero ser cliente). Copy no hace falta perfecto. **No** navegar a `/buscar?offer=1` desde ese CTA visitante. El filtro Solo Ofertas en `/buscar` visitante **sigue existiendo** (otro camino). Cliente: menú Ofertas → `/buscar?offer=1`.

**Excepción de orden:** el ítem Header **Carrito** sigue abriendo `CartDrawer` overlay hasta la Etapa 6. Motivo: `/revisar-pedido` no existe. La maqueta permanece navegable.

---

## PRECONDICIONES

- Etapa 2: `/buscar` con `offer=1`.
- Etapa 3: `/categorias`, `/marcas` existen.
- Etapa 1: `getBanners()`, `isFeatured`, `isOffer`, imagen de banner seed usable.

---

## ARCHIVOS A MODIFICAR

| Path | Qué |
|---|---|
| `src/components/Header.tsx` | Reemplazar ítems. Quitar dropdown Secciones (`showSections`, `brandOrder` de menú, `sectionsRef`). Labels Catálogos / Quiénes somos. CTA naranja **solo visitante**. Ofertas **solo cliente** → `/buscar?offer=1`. Productos vs Armar Pedido. Conservar hamburguesa, logo, SearchBar, Favoritos, Ingresar, Admin si `isAdmin`, poll auth. **Carrito: no cambiar destino aún.** |
| `src/pages/Home.tsx` | Quitar `CatalogCarousel`, `BrandGrid`, bloque “Todos nuestros productos”. Importar `BannerSlider` + `getBanners()`. Destacados: `filter(isFeatured).slice(0,6)`. Ofertas: `filter(isOffer).slice(0,6)` — el visitante **sí** ve las tarjetas. “Ver más / Ver todas las ofertas”: **visitante** → aviso (ofertas completas para clientes + Ingresar / Quiero ser cliente); **cliente** → `/buscar?offer=1`. |
| `src/components/BannerSlider.tsx` | Hoy pinta **solo el primero**. Adaptar a carrusel de **todos** los banners (flechas, autoplay opcional copiando lo mínimo de `CatalogCarousel` **sin** copiar el bug de hooks). CTA interno `buttonLink`. |
| `src/store/adminStore.ts` | Si no se hizo en Etapa 1: `buttonLink` de banner-2 → `/buscar?offer=1`; `imageUrl` existente. |

---

## ARCHIVOS NUEVOS

Ninguno.

---

## ARCHIVOS INTACTOS

- `SearchBar.tsx` (autocomplete = Etapa 7; ENTER ya ok)
- `Footer.tsx` — **no** rediseñar redes/año en esta etapa salvo que se pida aparte. Identidad: **CONSERVAR** producción a largo plazo; no es el foco de esta etapa. **NO TOCAR** salvo regresión.
- `CatalogCarousel.tsx` — dejar el archivo; dejar de importarlo. No “arreglar” hooks (clase B).
- `ProductCard.tsx`
- Router: no hace falta ruta Home nueva. No crear `/secciones`.
- Tailwind config.

---

## CAMBIOS DE MODELO

Ninguno.

---

## RUTAS (lo que el Header debe apuntar)

### Visitante (orden)

1. Inicio → `/`
2. Productos → `/buscar`
3. Categorías → `/categorias`
4. Marcas → `/marcas`
5. Catálogos → `/catalogo` (label **Catálogos**)
6. Quiénes somos → `/empresa` (ruta **conservada**)
7. Ingresar → `/login`
8. Quiero ser cliente → `/quiero-ser-cliente` (CTA naranja)

No: Secciones, Ofertas, Armar Pedido, Favoritos, Carrito, Mi Cuenta, Salir. Admin solo si `isAdmin` (demo).

### Cliente (orden)

1. Inicio → `/`
2. Armar Pedido → `/buscar`
3. Categorías → `/categorias`
4. Marcas → `/marcas`
5. Ofertas → `/buscar?offer=1`
6. Favoritos → `/favoritos`
7. Catálogos → `/catalogo`
8. Mi Cuenta → `/mi-cuenta`
9. Salir → `logout()` + `/`

No: Productos (lo reemplaza Armar Pedido), Ingresar, Quiero ser cliente, Secciones, Empresa.

Carrito (temporal): botón que abre drawer. A partir de Etapa 6: `Link` a `/revisar-pedido`.

Mismos destinos en menú mobile.

---

## VISUAL

### Imagen 1 — Home visitante

Orden de bloques:

1. Header (estética **producción**: blanco, logo, buscador, links, un CTA naranja). No copiar header de imagen IA.
2. **Banners** full width, primer bloque, más de un slide si hay 2 en Admin. Flechas/CTA naranja **idea** de producción, no Splide.
3. Productos destacados — grilla actual de `ProductCard` (no obligación de carrusel Splide). Criterio = flag.
4. Ofertas — grilla `ProductCard` (no `OfferProductCard`). Visitante **ve** las cards. “Ver más / Ver todas las ofertas” → aviso, **no** `/buscar?offer=1`. Cliente en Home: ese link sí puede ir a `/buscar?offer=1`.
5. Footer existente.

**Retirar:** “Marcas con las que trabajamos”, banda “Todos nuestros productos”.

**Conservar de producción:** cards, precios ocultos, texto “Ingresá para comprar”, fondo celeste, no modal de login nuevo.

Home logueado: **mismo layout**; cambian header y cards (precio). Sin CTA Armar Pedido en el Home.

`CatalogCarousel` **DEJAR DE USAR** como hero. Catálogos siguen en `/catalogo`.

---

## REUTILIZADOS

- `BannerSlider` (adaptar, no crear “Banners 2”)
- `getBanners` + `AdminBanners` (conectar)
- `ProductCard`
- `getAuth` / listeners del Header

---

## RIESGO

**MEDIO.** Header es el único menú (desktop + mobile). Un ítem mal condicionado muestra “Quiero ser cliente” logueado (bug actual) o Ofertas al visitante. Banners rotos si `imageUrl` 404 → Home hero vacío. Mitigación: Preflight + seed de imagen; probar ambos estados auth y hamburguesa.

---

## REGRESIONES

- Logo → `/`
- SearchBar presente
- Login / logout
- Favoritos
- `/catalogo` y `/empresa` accesibles con **nuevo** label
- No crear `/secciones`
- Admin link si admin

---

## VALIDACIÓN MANUAL

1. Visitante: menú exacto de 8 ítems (+ Admin si aplica). No Secciones. No Ofertas.
2. Click Productos → `/buscar` título Productos.
3. Click Quiénes somos → mismo texto de `Empresa.tsx`.
4. CTA naranja visible.
5. Cliente: menú exacto. Sin CTA naranja. Armar Pedido → `/buscar` título Armar Pedido. Ofertas → `offer=1`.
6. Home: primer bloque es banner(s), no PDF de catálogo. Si Admin tiene 2 banners, se puede pasar al segundo.
7. No hay bloque Marcas ni “Todos nuestros productos”.
8. Destacados: coinciden con `isFeatured` (cambiar un flag en mock/Admin más adelante; ahora verificar que no son “sí o sí los pie-001…006 en orden de archivo” si el mock ya es mixto).
9. Ofertas Home: `isOffer`. Visitante ve cards. “Ver todas” visitante → aviso (Ingresar / Quiero ser cliente), **no** `/buscar?offer=1`. Cliente: menú Ofertas → `offer=1`.
10. Visitante click “Ingresá para comprar” → `/login` (texto de card).
11. Resize: hamburguesa lista los **mismos** ítems.

---

## CRITERIOS DE ACEPTACIÓN

- [ ] Menús exactos público y cliente.
- [ ] Una fuente de hero: Admin Banners → Home.
- [ ] `CatalogCarousel` no se monta.
- [ ] Destacados = flag + `slice(0,6)`.
- [ ] Ofertas Home = `isOffer` + slice 6. Visitante ve las cards.
- [ ] “Ver todas” visitante = aviso (no `/buscar?offer=1`). Cliente menú Ofertas = `/buscar?offer=1`.
- [ ] Carrito header **aún** overlay (documentado).
- [ ] Responsive existente no roto.

---

## NO HACER EN ESTA ETAPA

- No autocomplete.
- No `/revisar-pedido`.
- No layout 3 columnas.
- No rediseñar header (colores, sticky glass, Barlow).
- No WhatsApp flotante / footer (fuera de este corte).
- No arreglar `CatalogCarousel` huérfano.
- No Home distinto para logueado.

Checkpoint: `checkpoint-header-home`.
