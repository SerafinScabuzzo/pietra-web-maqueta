# Resumen para el programador — cambios deseados en PietraItaly

Este documento acompaña la **maqueta local** que vamos a mirar el 31/08/2026.  
No es una orden de reescritura. Es el resultado visual/funcional que queremos **encima de la web que ya existe**.

Producción actual: `https://pietraitaly.com.ar/index_2026.php` (tu desarrollo).  
Maqueta: prototipo React en esta carpeta, datos mock, sin backend.

---

## Situación actual (producción)

- Home con banners, destacados, ofertas.
- Navegación fuerte Marca → Rubro → Subrubro.
- Catálogo y precios B2B para cliente logueado.
- Carrito / armar pedido; confirmación real en servidor (no se recorrió `enviar_pedido.php` para no generar pedidos).
- Admin con productos, rubros, banners, sync TXT, etc.

## Resultado deseado

Conservar identidad (colores, Header, Footer, cards, botones) y **cambiar la experiencia de encontrar productos y de armar el pedido**, como se ve en la maqueta.

---

## Frontend (lo que la maqueta muestra)

| Área | Qué reutilizar | Qué cambia |
|---|---|---|
| Identidad | Paleta, logo, Footer, tipografía general, ProductCard | No rediseñar |
| Header público | Estructura visual | Opciones: Productos, Categorías, Marcas, Catálogos, Quiénes somos. Sin Secciones. Sin Ofertas en menú |
| Header cliente | Idem | Armar Pedido, Ofertas, Favoritos, Mi Cuenta, Salir. Sin Quiero ser cliente. Carrito → Revisar Pedido |
| Home | Banners, destacados, ofertas, Footer | Sin grilla de Marcas. Banners más protagonistas. Destacados por flag. Ofertas por flag. “Ver más” público pide login |
| Catálogo | Una sola lista de productos | `/buscar` = Productos (visitante) o Armar Pedido (cliente). Filtros Marca / Rubro / Subrubro / Solo ofertas. Paginación. Orden Pietra primero |
| Categorías | Rubros y subrubros | Rubros **globales** (no “de una marca”). Rubro → Subrubros → catálogo filtrado |
| Marcas | Listado de marcas | Página propia; click = filtro de marca en el catálogo. Ya no abre rubros de esa marca |
| Login | Flujo existente | Label visible **Usuario**. Post-login: Mi Cuenta |
| Mi Cuenta | Datos del cliente | CTA Armar Pedido |
| Buscador | Autocomplete a producto | Conservar Enter al catálogo con `q=` |
| Armar Pedido | Card, qty, favorito, carrito | Layout desktop Filtros \| Productos \| Carrito abierto. No overlay. Minimizable |
| Revisar Pedido | Líneas del carrito | Pantalla resumen (imagen, SKU, precio, qty, subtotal, eliminar, totales). **Sin** envío/pago/observaciones/wizard |
| Confirmación | El envío real que ya tengan | En maqueta es mock (`PED-XXXXXX` + vaciar carrito). En producción debe seguir **su** endpoint |

Visitante: navega y filtra; **no ve precios B2B** ni compra.

---

## Backend / sync a revisar juntos

La maqueta **no** define cómo implementarlo internamente. Preguntas concretas:

1. **Oferta** — En la maqueta es un flag `isOffer` (Sí/No), independiente del rubro y del precio. El TXT nuevo trae 1/0. ¿La sync diaria puede alimentar ese campo (o el que ya exista) sin inferir oferta por precio o por rubro OFERTA?
2. **Destacado** — Flag propio, no “los primeros N”. ¿Hay campo actual reutilizable?
3. **Rubro global** — El rubro deja de “pertenecer” a una marca. El producto sigue teniendo Marca + Rubro + Subrubro. ¿Hoy la relación sale del producto sincronizado? ¿Hay que dejar de filtrar rubros por marca en el menú?
4. **Confirmación** — Revisar Pedido es solo el resumen. ¿Qué URL/flujo actual (`enviar_pedido.php` u otro) debe ejecutarse al confirmar? No queremos un checkout nuevo de envío/pago.
5. **Login “Usuario”** — Solo cambia el label. ¿El valor sigue siendo CUIT, n° de cliente u otro matching interno?

No hace falta, para este alcance: Pedidos Admin nuevos, Listas, importación TXT rediseñada, miles de clientes, app mobile nueva, IVA inventado.

---

## Precio en la maqueta (solo demo)

Para que Card, carrito y Revisar coincidan:

- Si hay `priceOffer` > 0 → ese es el unitario.
- Si no → `priceList × (1 − descuento del cliente)`.

Esto **no** es una política comercial nueva para producción: es coherencia del prototipo. La regla real de precio la define tu lógica actual.

---

## Cómo mirar la maqueta

Ver `demo-click-by-click.md`. Datos 100% mock; no toca producción.
