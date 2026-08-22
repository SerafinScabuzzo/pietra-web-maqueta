# Rutas — maqueta

Definidas en `src/app/providers/router.tsx`. React Router v6, `BrowserRouter`.

Layout global (todas las rutas, incluido Admin): fondo degradado + blobs + Header + `<main>` + Footer.

---

## Tabla de rutas

| Ruta | Componente | Público/Cliente/Admin | Función actual | Equivalente aproximado en producción |
|---|---|---|---|---|
| `/` | `Home` | Los tres (UI cambia con auth) | Home: carrusel catálogos, marcas, destacados (slice 0–6), ofertas (priceOffer), CTA “Todos nuestros productos” | `/index_2026.php` |
| `/login` | `Login` | Público (form). Demo cliente/admin | Acceso CUIT + código; botones demo | `/ingreso` · POST `login2_2026.php` |
| `/catalogo` | `Catalogo` | Los tres | Listado de catálogos + filtros brand/type/sort + banner Pietra 2025 | `/catalogos-productos` |
| `/ofertas` | `Ofertas` | Los tres | Productos con `priceOffer < priceList`; filtros; `OfferProductCard` | `/ofertas` · `/ofertas.php?idmarca=&pagina=N` |
| `/empresa` | `Empresa` | Los tres | Texto institucional + contacto + horarios | `/empresa` |
| `/quiero-ser-cliente` | `QuieroSerCliente` | Los tres | Instructivo + botón WhatsApp (sin form mail) | `/quiero-ser-cliente` · POST `form2mailCliente.php` |
| `/marca/:brandId` | `Marca` | Los tres | Hero de marca + grilla de rubros de esa marca | `/marca/{slug}` |
| `/marca/:brandId/rubro/:categoryId` | `Rubro` | Los tres | Breadcrumb + **listado de productos** del rubro | En prod esta URL es de **subrubros**, no de productos. Productos = `/subrubro/{marca}/{rubro}/{subrubro}` |
| `/buscar` | `Buscar` | Los tres | Catálogo completo / resultados `?q=` + filtros | **No hay equivalente.** Prod: sugerencias AJAX, ENTER no cambia URL |
| `/buscar?q=` | `Buscar` | Los tres | Filtra por name/sku | Idem |
| `/producto/:productId` | `Producto` | Los tres | Ficha por `id` (no slug) | `/articulo/{slug}` |
| `/favoritos` | `Favoritos` | Cliente (si no hay cliente → pantalla “Acceso requerido”) | Grilla de favoritos del cliente | `/favoritos` |
| `/mi-cuenta` | `MiCuenta` | Cliente (si no → redirect `/login`) | Datos mock + descuento + cambiar código | `/miCuenta_2026.php` · `/micuenta` |
| `/admin` | `AdminRoute` → `AdminLayout` → `AdminDashboard` | Admin | KPIs mock | `/admin.php` |
| `/admin/productos` | `AdminProductos` | Admin | ABM productos mock | `/adminProductos.php` |
| `/admin/marcas` | `AdminMarcas` | Admin | Editar marcas existentes (sin alta) | `/adminMarcas.php` |
| `/admin/rubros` | `AdminRubros` | Admin | ABM rubros **con selector Marca** | `/adminRubros.php` |
| `/admin/catalogos` | `AdminCatalogos` | Admin | ABM catálogos | `/adminCatalogos.php` |
| `/admin/banners` | `AdminBanners` | Admin | ABM banners | `/adminBanners.php` |
| `/admin/clientes` | `AdminClientes` | Admin | ABM clientes mock | `/adminClientes.php` |

---

## Rutas de producción que no existen en la maqueta

| Producción | En maqueta |
|---|---|
| `/secciones` | AUSENTE (dropdown Secciones sí existe) |
| `/subrubro/{marca}/{rubro}/{subrubro}` | AUSENTE |
| `/articulo/{slug}` | Hay `/producto/:productId` (id interno, no slug) |
| `/miCuenta_pedidos.php` | AUSENTE |
| `/miCuenta_comprobantes.php` | AUSENTE |
| `/agregarProductosCarrito.php` | Lógica local `addToCart` |
| `/vaciar-carrito` | Función `clearCart` en drawer |
| `/enviar_pedido.php` | AUSENTE. Botón Finalizar sin navegación |
| `/scriptAgregarFavorito.php` | `toggleFavorite` local |
| `/logout_2026.php` | `logout()` + navigate `/` |
| `/adminSubRubros.php` | AUSENTE |
| `/adminListas.php` | AUSENTE |
| `/adminPedidos.php` | AUSENTE |
| POST `buscarDinamico.php` | AUSENTE (hay página `/buscar`) |
| POST `recuperoPass_2026.php` | AUSENTE |
| POST `form2mailCliente.php` | AUSENTE |

---

## Rutas extra de la maqueta (no vistas en producción)

| Ruta maqueta | Nota |
|---|---|
| `/buscar` y `/buscar?q=` | Página de resultados + filtros. **FUNCIONALIDAD YA EXISTENTE Y POTENCIALMENTE REUTILIZABLE** |
| `/catalogo` (singular) | Prod usa `/catalogos-productos` |
| `/login` | Prod usa `/ingreso` |
| `/mi-cuenta` | Prod usa `miCuenta_2026.php` / `/micuenta` |
| `/producto/:productId` | Prod usa slug de artículo |
| `/marca/:brandId/rubro/:categoryId` como listado de **productos** | En prod el rubro lista subrubros |

No hay ruta `/armar-pedido`, `/carrito` a pantalla completa como página, `/pedidos`, `/subrubros`, `/secciones`.

---

## Params de URL usados

### `/buscar`

- `q` texto
- `brand` (repetible)
- `category` (repetible)
- `offer=1`
- `sort` = `price_asc` \| `price_desc` \| `name_asc`

### `/ofertas`

- `brand`, `category` (repetibles)
- `sort` = `discount_desc` (default) \| `price_asc` \| `price_desc` \| `name_asc`

### `/catalogo`

- `brand`, `type`, `sort` (`date_desc` default, `date_asc`, `title_asc`, `title_desc`)

### Dynamic

- `:brandId` = id de marca (`pietra`, `mota`, `fv`)
- `:categoryId` = id de rubro (`pietra-herramientas`, etc.)
- `:productId` = id de producto (`pie-001`, etc.)
