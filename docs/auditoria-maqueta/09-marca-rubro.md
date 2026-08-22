# Marca, Rubro, Producto, Ofertas, Mi Cuenta

Screenshot marca: `screenshots/05-marca-pietra.png`. Ofertas: `03-ofertas.png`.

---

## Página Marca (`/marca/:brandId`)

Archivo: `src/pages/Marca.tsx`.

- `getBrand(brandId)`; 404 UI si no existe
- Hero: si `heroImageUrl`, imagen full + overlay + H1 blanco con `brand.name`. Runtime Pietra: logo estirado de fondo + “Pietra”
- Si no hay hero: H1 azul con el nombre
- Grilla de `getCategoriesByBrand(brandId)` ordenada por `order`
- Cada card: `imageUrl` Unsplash + nombre; Link `/marca/${brandId}/rubro/${category.id}`
- Pietra: 3 rubros Herramientas, Plomería, Baño (runtime verificado)
- Sin breadcrumb en esta página
- Sin listado de productos en la marca (solo rubros)

Vs prod `/marca/{slug}`: hero logo + grilla de muchos rubros con foto propia (incluye OFERTA/LIQUIDACION). Misma idea de “marca → rubros”. Cantidad y taxonomía distintas. Rubros en prod son globales reutilizados; acá cada rubro tiene `brandId`.

---

## Página Rubro (`/marca/:brandId/rubro/:categoryId`)

Archivo: `src/pages/Rubro.tsx`.

- Breadcrumb: Inicio / {marca} / {rubro}
- H1 = nombre de category; subtítulo N productos
- Grilla `ProductCard` con `getProductsByCategory(categoryId)`
- Vacío: “Todavía no hay productos…” + volver a marca
- **No valida** que `category.brandId === brandId` (se puede armar una URL cruzada)
- **No hay subrubros.** Esta página **es el listado de productos**

Vs prod `/rubro/{marca}/{slug}`: cards de **subrubros**, no productos; selector resultados por página. Productos = `/subrubro/...`.

**SUBRUBRO NO ESTÁ MODELADO EN LA MAQUETA** — el hueco conceptual está entre esta página y el producto.

---

## Ficha Producto (`/producto/:productId`)

Archivo: `src/pages/Producto.tsx`. Lookup por `id`, no slug.

- Galería: imagen principal `images[0]`; thumbs `images[1..4]` (mocks tienen 1 imagen → sin thumbs)
- Marca, H1 name, SKU, Rubro (nombre Category)
- Precios según `getAuth().isClient || isAdmin`
- Botones “Consultar disponibilidad” y “Agregar a favoritos”: **sin handlers**
- Sin cantidad, sin agregar al carrito, sin breadcrumb, sin descripción/`copete`, sin publicado

Vs prod `/articulo/{slug}`: ficha con rubro (a veces OFERTA/LIQUIDACION); público Consultar + favoritos; cliente precio + cantidad + carrito. Click Consultar: NO VERIFICADO en Fase 1.

---

## Ofertas (`/ofertas`)

Archivo: `src/pages/Ofertas.tsx`. Screenshot: 7 productos, badge 🔥 Ofertas, banda “7 productos en oferta disponibles”.

- Universo: `isProductOnOffer`
- Filtros `OfferFilters` (Marca, Rubro, sort)
- Cards `OfferProductCard`
- Default sort mayor descuento
- **NO HAY PAGINACIÓN**
- Limpiar filtros en vacío usa `window.location.search` (recarga)

Vs prod: 171 productos, paginación, filtros Marca+Rubro (incluye rubro OFERTA/LIQUIDACION), cards con corazón y CTA compra/login.

---

## Mi Cuenta (`/mi-cuenta`)

Archivo: `src/pages/MiCuenta.tsx`.

Campos mostrados: CUIT, Código (oculto •••••• + “Cambiar código”), Nombre, Apellido, Nombre de negocio, Dirección, bloque Descuento % (grande naranja) + “Pagás X% del precio de lista”.

Cambio de código: min 4, confirmación, `updateClient`.

`Link` importado y no usado.

### CTA compra

**No hay CTA “Armar Pedido”.** Tampoco “Ver productos”, Ofertas, ni botón hacia el carrito. Igual que producción en ese punto (Fase 1: no hay CTA grande Armar Pedido; el camino es menú/buscador).

Ausente vs prod Mi Cuenta: ID/N° cliente, Ver pedidos, Ver facturas, Cambio de email, Descarga de listas.

---

## Catálogo, Empresa, Quiero ser cliente (breve)

**Catálogo `/catalogo`:** banner `/uploads/banner principal.jpg` + “Catálogo Pietra 2025” + Ver catálogo (PDF Drive). Grilla 1 card. Filtros marca/tipo/sort. Extra vs prod (prod: 1 catálogo 2026, PDF `/catalogos/8.pdf`, sin filtros tipo).

**Empresa `/empresa`:** Sobre nosotros, contacto, horarios. Sin los typos de prod (“Trabajammos”, etc.). Sin WhatsApp flotante.

**Quiero ser cliente:** requisitos + lista de datos + proceso “exclusivamente por WhatsApp” + botón a `5493413589318`. **No hay formulario** (prod: form POST mail con Nombre, Firma, Email, Teléfono, Localidad, Mensaje).
