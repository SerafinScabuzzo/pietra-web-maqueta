# Header y Home

Screenshots: `screenshots/01-home.png`, `04-login.png` (mismo header). Runtime verificado en `http://127.0.0.1:5173/`.

---

## Header — menús y piezas

Archivo: `src/components/Header.tsx`. Sticky `bg-white/70 backdrop-blur`. Desktop `md:flex`; hamburguesa `< md`.

### Desktop (izquierda → derecha)

1. Logo ` /uploads/LOGO PIETRA 4.1.png` (existe, ~20 KB) + texto “PietraItaly” → `/`
2. `SearchBar` (ancho ~480px)
3. Secciones (dropdown marcas pietra/mota/fv en ese orden) → `/marca/{id}`
4. Ofertas → `/ofertas`
5. Catálogo → `/catalogo`
6. Empresa → `/empresa`
7. Si admin: Admin → `/admin`
8. Si cliente: Favoritos · Carrito (abre drawer) · Mi cuenta · Salir
9. Si no cliente: Ingresar → `/login`
10. CTA naranja “Quiero ser cliente” → `/quiero-ser-cliente` (**siempre**, también logueado)

No hay link a `/secciones`. No hay WhatsApp en el header.

### Buscador en header

Ver `06-busqueda-filtros.md`. Botón “Buscar” visible. ENTER envía el form.

### Carrito / favoritos

Solo si `auth.isClient`. Badge rojo = `getCartItemCount()` = **número de líneas**, no suma de cantidades. El drawer se documenta en `08`.

### Responsive

Mobile: logo + hamburguesa; SearchBar y menú aparecen al abrir. Dropdown Secciones anidado. Carrito también abre el drawer.

### Tabla observacional Header

| Pieza | Maqueta | Producción |
|---|---|---|
| Logo imagen + wordmark | PietraItaly, archivo local | `logo_pietraitaly_top_2026.png` + PietraItaly |
| Buscador central | Sí + botón Buscar | `input#busqueda` placeholder “Buscar...”, maxlength 30, form POST misma página |
| Secciones | Dropdown de 3 marcas | Dropdown de 8 marcas + link `/secciones` |
| Ofertas | Link `/ofertas` | Link `/ofertas` |
| Catálogo(s) | “Catálogo” `/catalogo` | “Catálogos” `/catalogos-productos` |
| Empresa | `/empresa` | `/empresa` |
| Ingresar | `/login` | `/ingreso` |
| Quiero ser cliente | Botón naranja, **no se oculta al loguear** | Botón naranja, **desaparece** al loguear |
| Favoritos / Carrito / Mi Cuenta / Salir | Solo cliente | Solo cliente |
| Sticky / fondo | Blanco translúcido | Blanco |
| WhatsApp header | No | No (WhatsApp es flotante) |

---

## Home — bloques en orden

Archivo: `src/pages/Home.tsx`. Datos: `getBrands()`, `getProducts()`, `getCatalogs()` (store, no mocks directos).

### 1. Hero / carrusel

- Componente: `CatalogCarousel` con `catalogs`
- **No usa** `getBanners()` ni `BannerSlider`
- Con 1 catálogo mock: un slide “Catálogo Pietra 2025”, subtítulo fijo “Descubrí nuestra colección de productos”, CTA “Ver catálogo” → PDF Drive
- Imagen: `coverUrl` (`/uploads/portadaCatalogo.png`, existe) o fallback `/uploads/banner principal.jpg` (existe)
- Autoplay 5s y dots **solo si hay más de 1 catálogo** (hoy no se ven)
- Runtime (screenshot): banner con wordmark pietra + botón naranja

Vs prod: 2 banners Admin (Catálogo 2026 PDF `/banners/1.pdf` y “Herramientas…”). Flechas naranjas.

### 2. Marcas con las que trabajamos

- Título igual al de prod
- `BrandGrid` — 3 cards. Imagen: `heroImageUrl || logoUrl`. Click → `/marca/:brandId`
- Runtime: Pietra (logo P), Mota (portada/logo), FV (portada)
- **FUNCIONALIDAD YA EXISTENTE Y POTENCIALMENTE REUTILIZABLE** para listar marcas: el destino ya es la página Marca. No hay ruta `/marcas` de índice aparte.

Vs prod: 8 marcas (PIETRA, MOTA, PRIVE, RAO, F.V, TRAMONTINA, INGCO, SOLYON ARGENTINA SA).

### 3. Productos destacados

- `products.slice(0, 6)` — **no hay flag destacado**
- Grilla `ProductCard` (1/2/3/4 columnas)
- Sin flechas de carrusel (prod: carrusel con flechas grises)
- Sin “Ver todas”

### 4. Ofertas especiales

- Filtro `priceOffer && priceOffer < priceList`, `slice(0, 6)`
- `ProductCard` (no `OfferProductCard`)
- Link “Ver todas →” `/ofertas`
- En mock hay 7 ofertas; Home muestra 6

### 5. Todos nuestros productos

- Bloque extra sobre `bg-brandGray`
- CTA “Ver todos los productos” → `/buscar`
- **EXTRA** respecto de prod (prod no tiene este bloque ni página de catálogo único)

### Footer (global, no solo Home)

`src/components/Footer.tsx`:

| Columna | Maqueta | Producción |
|---|---|---|
| Contacto | email `distcentro@yahoo.com.ar`, Av. Del Rosario 154 | Igual (Av. del Rosario) |
| Seguinos | Instagram, **LinkTree**, **TikTok** | Instagram, **Facebook** |
| Horarios | Lun 9–17; Mar–Vie 8–17; Sáb/Dom no | Igual |
| Copyright | © **2024** PietraItaly | © **2026** PietraItaly |
| WhatsApp flotante | **No hay** | `5493415853899` |

---

## Carrusel / banners — mapa

| Pieza | Archivo | ¿Se usa en Home? | Datos |
|---|---|---|---|
| CatalogCarousel | `components/CatalogCarousel.tsx` | Sí | `getCatalogs()` |
| BannerSlider | `components/BannerSlider.tsx` | No | props `banners` |
| Admin banners | `adminStore.getBanners()` | No en Home | 2 items seed con JPG inexistentes |
| Página Catálogo banner | `Catalogo.tsx` | N/A | `/uploads/banner principal.jpg` |

Login no cambia el contenido de Home salvo Header y las cards (precios/CTAs) al volver a `/`.
