# Cards de producto

---

## Tabla de variantes en la maqueta

| Variante | Archivo | Dónde se usa | Badge | Corazón | Precio público | Precio cliente | Cantidad / carrito | CTA extra | Borde |
|---|---|---|---|---|---|---|---|---|---|
| ProductCard | `components/ProductCard.tsx` | Home destacados, Home ofertas, `/buscar`, `/marca/.../rubro/...`, `/favoritos` | “Oferta” naranja si `priceOffer < priceList` | Solo si hay `client` | “Iniciá sesión para ver precios” | `priceOffer` naranja + lista tachada, o `priceList` azul | Sí si cliente (default 1, min 1) | “Ingresá para comprar” o “Agregar al carrito”; “Ver detalles” | Sombra, sin borde naranja |
| OfferProductCard | `components/OfferProductCard.tsx` | Solo `/ofertas` | Público: “OFERTA”. Cliente: “-N% OFF” | No | Caja naranja + “Iniciá sesión…” | Precio oferta grande + lista + “Ahorrás” | **No** | “Ver producto” naranja | `border-2 border-brandOrange` |
| Ficha | `pages/Producto.tsx` | `/producto/:id` | Badge OFERTA si `canSeePrices && priceOffer` | Botón “Agregar a favoritos” **sin onClick** | “Iniciá sesión para ver precios” | Lista u oferta + ahorro | **No** | “Consultar disponibilidad” **sin onClick** | N/A |
| Admin tabla | `AdminProductos.tsx` | `/admin/productos` | Precio oferta en celda (desalineada; ver `10` y `12`) | No | N/A | N/A | No | Editar / Eliminar | Tabla |

No hay card de rubro/subrubro reutilizable como componente aparte: las cards de rubro están **inline** en `Marca.tsx`. Card de marca: `BrandGrid`. Card de catálogo: `CatalogCard`.

---

## ProductCard vs card de producción (Fase 1)

| Pieza | ProductCard maqueta | Card producción |
|---|---|---|
| Imagen | Primera de `images[]` (Unsplash); onError → “Sin imagen” | Foto artículo; en Home/Ofertas varias rotas |
| Corazón | Solo cliente; esquina der. | Visible también en público |
| Marca | Azul chico (`brand.name`) | Azul chico |
| Título | `name` (no forzado a MAYÚSCULAS) | MAYÚSCULAS |
| SKU | “SKU: …” | Código |
| Precio público | Oculto, texto itálica | Oculto; “Ingresar para comprar” |
| Precio cliente | Lista u oferta **sin** `discountRate` | Número ya con descuento (formato `$ 15945.66`) |
| Cantidad | Default **1**, min 1, botones +/- | Default **0**, min 0, input number |
| CTA login | “Ingresá para comprar” → `/login` | “Ingresar para comprar” → `/ingreso` |
| CTA carrito | “Agregar al carrito” + flash “✓ Agregado” | “Agregar al carrito” → POST |
| Ver detalles | Link `/producto/:id` | `/articulo/{slug}` |
| Ofertas | En Home usa esta card (sin borde naranja) | En `/ofertas` borde naranja |

`OfferProductCard` se acerca más a la card de ofertas de prod (borde naranja, acento naranja) pero **omite** corazón, cantidad y agregar.

---

## Notas de campos

- `OfferProductCard` lee `product.shortDescription` (no está en el type; los mocks no lo traen → nunca se ve).
- No hay EAN en card.
- No hay stock.
- El admin puede marcar oferta poniendo `priceOffer`; el badge de ProductCard depende de esa comparación, no de un radio Sí/No.
