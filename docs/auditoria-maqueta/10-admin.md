# Admin mock

Guard: `AdminRoute` exige `getAuth().isAdmin`. Entrada demo: Login → “Entrar como Admin (modo demo)”.

Layout: `AdminLayout` sidebar. El router **sigue mostrando Header y Footer públicos**, más un header fijo “Admin Panel” → doble barra.

Persistencia: `pietra_admin_store`. Tras recarga: **productos y banners** se releen; **marcas, rubros y catálogos se pisan con el mock** (`normalizeBrands/Categories/Catalogs`).

---

## Tabla de secciones

| Sección maqueta | Ruta | Archivo | ¿Existe equivalente real? | Observación |
|---|---|---|---|---|
| Dashboard | `/admin` | `AdminDashboard.tsx` | Sí `admin.php` | KPIs: Productos, Marcas, Rubros, Catálogos, Banners. **Sin** Clientes, Pedidos, Subrubros, Listas, fecha de sync, link facturas |
| Productos | `/admin/productos` | `AdminProductos.tsx` | Sí `adminProductos.php` | Alta local “+ Nuevo Producto” (prod: sin botón nuevo; sync). Form edita SKU, precios, Marca, Rubro. Tabla con columnas desalineadas |
| Marcas | `/admin/marcas` | `AdminMarcas.tsx` | Sí `adminMarcas.php` | Solo editar las 3 existentes. Sin Nueva / Eliminar. `brandOrder` menciona marcas que no están en el mock |
| Rubros | `/admin/rubros` | `AdminRubros.tsx` | Sí `adminRubros.php` | **Sí depende de Marca** (filtro + select required). Prod: **sin** selector Marca |
| Subrubros | — | — | Sí `adminSubRubros.php` | **No existe en la maqueta** |
| Banners | `/admin/banners` | `AdminBanners.tsx` | Sí `adminBanners.php` | CRUD completo. Home **no consume** estos banners |
| Catálogos | `/admin/catalogos` | `AdminCatalogos.tsx` | Sí `adminCatalogos.php` | CRUD. Recarga vuelve al mock de 1 catálogo |
| Clientes | `/admin/clientes` | `AdminClientes.tsx` | Sí `adminClientes.php` | ABM local (CUIT, código, nombre, descuento). Prod: tabla masiva sync; no se documentaron filas |
| Pedidos | — | — | Sí `adminPedidos.php` | **No existe en la maqueta** |
| Listas | — | — | Sí `adminListas.php` | **No existe** |
| Ofertas (menú) | — | — | Tampoco hay ítem menú en prod | Oferta = `priceOffer` en producto |
| Destacados (menú) | — | — | Tampoco en prod | Destacado no está en el producto maqueta |

---

## Productos — campos del form vs type vs prod

Form modal (`AdminProductos.tsx`):

| Campo UI | ¿En type Product? | Notas |
|---|---|---|
| Nombre | Sí `name` | required |
| SKU | Sí `sku` | required. En prod el form de editar **no mostró** SKU editable |
| Marca | Sí `brandId` | select; al cambiar limpia rubro |
| Rubro | Sí `categoryId` | select **filtrado por marca**; disabled sin marca |
| Precio Lista | Sí `priceList` | En prod el form inspeccionado **no mostró** precio editable |
| Precio Oferta | Sí `priceOffer?` | Número opcional. Prod: radio `oferta` Sí/No (no precio oferta aparte en el form visto) |
| Descripción corta | **No** (`shortDescription`) | Error TS. No se persiste tipado |
| EAN | **No** (`ean`) | Error TS |
| Galería URLs | Sí `images[]` | `ImageGalleryField` exige http(s). Mocks Unsplash cumplen |
| Orden | No | Prod sí `orden` |
| Destacado Sí/No | No | Prod sí |
| Publicado Sí/No | No | Prod sí |
| Copete/descripción larga | No | Prod `copete` |
| SubRubro | No | Prod texto de sync |
| Imágenes file JPG | No | Prod file upload foto01–05 |

Tabla listado: headers Imagen, Nombre, Marca, **Rubro**, SKU, Precio, Acciones.  
Celdas: imagen, name, brand, **sku**, **precio**, **acciones**. Faltan 1 celda y `productCategory` no se usa. Rubro no se ve; Acciones cae bajo Precio.

Dashboard no cuenta ofertas ni destacados.

---

## Rubros — ¿depende de Marca?

**Sí.** `Category.brandId` obligatorio. UI: “Filtrar por marca” + form “Marca *” (disabled al editar). `getCategoriesByBrand`.  
Prod: form sin Marca; catálogo global.

---

## Subrubros

**¿Existe?** No. Ni menú, ni ruta, ni type.

---

## ImageField

Valida que la URL empiece con `http://` o `https://`. Las marcas mock usan rutas relativas `/uploads/...` → el preview del form Admin Marcas marcaría error de URL si se reabre el modal con esos valores. **NO VERIFICADO en runtime** (no se abrió el modal Admin en el navegador).

---

## Pedidos / Listas / Sync

AUSENTES. Dashboard no muestra “Actualizado: Clientes – Artículos – Facturas”.
