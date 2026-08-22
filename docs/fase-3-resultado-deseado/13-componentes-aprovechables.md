# Componentes aprovechables (cobertura, no refactor)

Qué código de la maqueta **cubre parcialmente** cada pieza futura.  
No dice cómo refactorizar, ni en qué orden implementar, ni qué extraer a hooks.

---

## Catálogo central (Productos / Armar Pedido)

| Pieza actual | Cubre | No cubre |
|---|---|---|
| `pages/Buscar.tsx` | Página de **todos** los productos, `q`, filtros URL, título “Todos los productos” / resultados | Título Productos vs Armar Pedido; paginación; orden Pietra; columna carrito; filtro subrubro |
| `components/SearchFilters.tsx` | Sidebar Marca / Rubro / Solo ofertas / sort; params URL | Dependencia de listas; Subrubros; rubros globales; scroll interno de listas largas (parcial: ya hay overflow en rubros) |
| `components/ActiveFiltersChips.tsx` | Chips marca, rubro, oferta, sort, limpiar | Chip subrubro |
| `utils/search.ts` `matchesQuery` | Nombre + SKU | — (alcance suficiente) |
| `utils/search.ts` `applyFilters` | brand, category, offerOnly vía `priceOffer` | offer por flag; subrubro; rubros sin `brandId` |
| `utils/search.ts` `applySort` | name/price si hay param | Default Pietra → alfa → resto |
| Ruta `/buscar` y `/buscar?q=` | ENTER del header ya aterriza acá | Distinguir label según sesión (es la misma ruta: bien) |

**Veredicto:** es la base más completa. **ADAPTAR**, no reemplazar por un tercer listado.

---

## Home / banners / marcas / destacados

| Pieza actual | Cubre | No cubre |
|---|---|---|
| `pages/Home.tsx` | Bloques destacados y ofertas; cards | Flag destacado; banners Admin; still tiene Marcas y CTA extra |
| `components/BrandGrid.tsx` | Grilla logo+nombre → destino | El destino hoy es `/marca/:id` (rubros). Sirve para **página Marcas** si cambia el click |
| `components/BannerSlider.tsx` | Pinta banners del shape Admin | Solo el **primero**; Home no lo importa |
| `adminStore.getBanners` + `AdminBanners.tsx` | CRUD banners | Consumo en Home; JPG seed faltantes |
| `components/CatalogCarousel.tsx` | Hero actual | Fuente incorrecta (catálogos). **DEJAR DE USAR** como hero |
| `products.slice(0, 6)` | Hueco visual de “destacados” | Criterio flag |

---

## Header / auth / buscador

| Pieza actual | Cubre | No cubre |
|---|---|---|
| `components/Header.tsx` | Logo, SearchBar, estados auth, Favoritos, Salir, CTA | Ítems nuevos; sigue Secciones y CTA logueado; “Catálogo” / “Empresa” |
| `components/SearchBar.tsx` | Form + ENTER → `/buscar?q=` | Autocomplete; destino según sesión (si la ruta es la misma, ya alcanza) |
| `pages/Login.tsx` | Acceso + demo + va a Mi Cuenta | Label Usuario; recupero (**FUERA DE ALCANCE**) |
| `utils/auth.ts` / `clientStore` | Sesión local, roles | — para la demo |

---

## Cards / ficha

| Pieza actual | Cubre | No cubre |
|---|---|---|
| `components/ProductCard.tsx` | Público sin precio; cliente qty + agregar; `✓ Agregado`; favorito cliente | Corazón público (no pedido); qty default prod; descuento en card |
| `components/OfferProductCard.tsx` | Look oferta | Compra. Queda corto si `/ofertas` deja de ser vitrina |
| `pages/Producto.tsx` | Ficha por id | Agregar, favorito real, qty |

---

## Categorías / Marcas / Subrubro

| Pieza actual | Cubre | No cubre |
|---|---|---|
| `pages/Marca.tsx` | Grilla de cards con imagen + nombre | Es **rubros de una marca**. El patrón visual sirve para **Categorías** (rubros globales), no el destino |
| `pages/Rubro.tsx` | Breadcrumb + título | Lista **productos**. El deseado lista **subrubros** |
| Cards de rubro inline en `Marca.tsx` | Card categoría | No es componente suelto; no hay subrubro |
| `getCategoriesByBrand` | — | Contradice rubros globales. Solo serviría como “rubros que tienen stock de esta marca” en **filtros** |

No hay type, mock, ruta ni Admin de Subrubro.

---

## Carrito / Revisar Pedido

| Pieza actual | Cubre | No cubre |
|---|---|---|
| `clientStore` add/update/remove/clear | Persistencia por CUIT | — |
| `components/CartDrawer.tsx` | Líneas, qty, eliminar, vaciar, totales, modo expandido | Layout columna sin overlay; campos de Revisar Pedido (#unidades, SKU en lista); Confirmar con destino; abierto default en Armar Pedido |
| Header `showCart` | Abrir drawer | Definición posterior fuera de Armar Pedido |

El expandido del drawer es el **acercamiento** a Revisar Pedido, no el resultado (sigue oscureciendo).

---

## Ofertas

| Pieza actual | Cubre | No cubre |
|---|---|---|
| `pages/Ofertas.tsx` | Ruta `/ofertas`, banda de conteo | Debe ser **puerta**, no segundo catálogo |
| `OfferFilters.tsx` | Marca/Rubro/sort | Redundante si reusa SearchFilters del catálogo |
| `pricing.ts` `isProductOnOffer` | Criterio actual | Flag Sí/No |

---

## Mi Cuenta / Favoritos / estáticos

| Pieza actual | Cubre | No cubre |
|---|---|---|
| `pages/MiCuenta.tsx` | Datos + descuento + código | CTA Armar Pedido |
| `pages/Favoritos.tsx` | Grilla ProductCard | — suficiente |
| `pages/Empresa.tsx` | Texto institucional | Label Quiénes somos (es el Header) |
| `pages/Catalogo.tsx` | Listado + PDF | Label Catálogos |
| `pages/QuieroSerCliente.tsx` | Página visitante | Ocultarla en menú cliente (Header) |
| `components/Footer.tsx` | 3 columnas | Identidad prod (redes, año, WhatsApp) |

---

## Admin

| Pieza actual | Cubre | No cubre |
|---|---|---|
| `AdminProductos.tsx` | Marca, rubro, precios, imágenes | Flag oferta, destacado, subrubro; rubro global |
| `AdminRubros.tsx` | ABM rubros | Sigue pidiendo marca |
| `AdminBanners.tsx` | CRUD | Cable a Home |
| `AdminMarcas.tsx` | Editar 3 | Alta (no necesaria) |
| — | — | Admin Subrubros |

---

## Resumen de reutilización (sin plan)

**Ya cubre de más cerca el futuro:** `Buscar` + filtros + chips + ENTER del `SearchBar` + `ProductCard` + `BrandGrid` + Admin Banners + stores de carrito/auth.

**Cubre el hueco visual pero el contrato está al revés:** `Marca.tsx` / `Rubro.tsx` / `CatalogCarousel` / `CartDrawer` overlay / `Ofertas` vitrina / destacados `slice`.

**Ausente:** autocomplete, subrubro, paginación, orden Pietra, flag destacado, flag oferta, página Categorías, página Marcas, Revisar Pedido, CTA Mi Cuenta, layout 3 columnas.
