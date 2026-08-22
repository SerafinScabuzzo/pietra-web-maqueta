# Impacto en cascada (áreas afectadas, no implementación)

Cinco movimientos estructurales. Cada uno lista **dónde pega**, no **cómo hacerlo**.

Las matrices de Fase 2 (`auditoria-maqueta/03-modelo-datos.md`) siguen siendo el mapa de archivos actuales.

---

## 1. Separar Category de Brand (rubros globales)

Hoy: cada rubro tiene `brandId`. Pietra/Mota/FV duplican taxonomía. `getCategoriesByBrand` arma `/marca/:id`. Admin Rubros exige marca. Admin Productos filtra rubros por marca.

**Deseado:** un rubro es global. La marca vive en el **producto**, no en el rubro.

### Áreas afectadas

| Área | Por qué |
|---|---|
| Modelo `Category` | `brandId` deja de ser dueño |
| Mocks `categories.ts` + `products.ts` | 9 rubros “por marca” no sirven como catálogo global |
| `adminStore` | `getCategoriesByBrand`, unicidad al crear, `normalizeProducts` (primer rubro de la marca) |
| Admin Rubros | Selector/filtro de marca |
| Admin Productos | Select de rubros dependiente de marca (hoy); mañana el select es global y el dependiente pasa a **subrubro** |
| `pages/Marca.tsx` | Deja de listar rubros de la marca |
| Ruta `/marca/:brandId/rubro/:categoryId` | Pierde su sentido actual |
| `SearchFilters` / `OfferFilters` / chips | Hoy listan 9 categorías con nombre repetido-por-marca; pasarían a rubros únicos |
| Filtros dependientes | “Pietra reduce rubros” se calcula por **productos de esa marca**, no por `category.brandId` |
| Header dropdown Secciones | Ya se retira; hoy leía marcas, no rubros |
| Página Categorías (nueva) | Consume el catálogo global de rubros |
| Ficha producto | Muestra nombre de rubro (sigue, pero el rubro ya no implica marca) |

**No afecta por sí:** Footer, Catálogos, Login, Favoritos, clientes mock.

---

## 2. Añadir Subrubro

Hoy: 0 rastros en `src/`. El listado de productos está en el rubro.

**Deseado:** Rubro → Subrubros → catálogo filtrado. Filtro cuarto. Producto clasificado en los tres niveles + marca.

### Áreas afectadas

| Área | Por qué |
|---|---|
| Modelo Producto | Falta el eslabón |
| Mocks | Hay que poder recorrer al menos un rubro con subrubros y productos |
| Página Categorías / página Rubro | El rubro ya no lista productos |
| Catálogo central | Nuevo filtro + param conceptual + chips |
| Filtros dependientes | Pietra + Grifería reduce subrubros |
| Admin Productos | Asignar subrubro coherente con el rubro |
| Admin Subrubros | Solo si el mínimo de mocks no alcanza para la reunión |
| Breadcrumbs | Cadena sin marca: Categorías / Rubro / (catálogo) |
| `pages/Rubro.tsx` | Contrato invertido |
| `applyFilters` / URL | Una dimensión más |
| Imágenes | Cards de subrubro genéricas |

**No afecta por sí:** banners, footer, login.

---

## 3. Oferta como flag (no precio, no rubro)

Hoy: `priceOffer < priceList` en `pricing.ts`, Home, Ofertas, cards, Admin (input precio), `offer=1`.

Producción ya tiene radio Sí/No **y** rubro liquidación. El pedido se queda con el **flag**.

### Áreas afectadas

| Área | Por qué |
|---|---|
| Criterio `isProductOnOffer` / `applyFilters.offerOnly` | Cambia la definición de membresía |
| Home bloque Ofertas | Misma fuente que el flag |
| Filtro Solo Ofertas | Idem |
| Menú Ofertas cliente | Puerta `offer=1`, no vitrina con otro criterio |
| Admin Producto | Radio/flag además (o en lugar) del solo número |
| Badge de card | Sigue existiendo; el disparador es el flag |
| Rubro OFERTA/LIQUIDACION | No se usa como mecanismo (prod lo tenía; maqueta no lo tiene) |
| TXT / importación | **No entra** (concepto `;1/;0` nada más) |

**El número `priceOffer`** puede seguir existiendo como precio tachado de demo; **deja de ser** la única verdad de “está en oferta”.

**No se crea** módulo Admin Ofertas: sin cascada de menú Admin nuevo.

**Carrito:** hoy ignora `priceOffer`. No se abre un proyecto de listas de precios.

---

## 4. Destacado como flag

Hoy: `Home` `slice(0, 6)`. No hay campo. Admin no lo edita.

### Áreas afectadas

| Área | Por qué |
|---|---|
| Modelo Producto | Campo conceptual nuevo |
| Mocks | Al menos algunos Sí para que el Home no quede vacío |
| `pages/Home.tsx` | Criterio del bloque |
| Admin Productos | Poder marcar Sí/No (prod ya lo tenía) |

**No hay** página Destacados ni ítem de menú. Cascada chica y localizada.

---

## 5. Nueva navegación (menús + dos vías + un catálogo)

### Header (todos los estados)

Ítems nuevos, ítems que salen, labels. `Header.tsx` es el punto único hoy (desktop + hamburguesa).

Afecta también: CTA Quiero ser cliente, Ofertas público, Secciones/`brandOrder`.

### Un catálogo, dos nombres

Todo lo que hoy lista productos en **otro** lado deja de ser catálogo:

- `/marca/.../rubro/...` (maqueta)
- `/ofertas` como grilla de compra
- CTA Home “Todos nuestros productos”
- (prod) `/subrubro/...` como único listado — no se clona

`Buscar.tsx` concentra: título, layout 3 columnas si cliente, paginación, orden default, filtros nuevos.

### Vía Categorías / vía Marcas

Páginas nuevas (índice rubros, índice marcas).  
`BrandGrid` se muda.  
`Marca.tsx` pierde el rol de taxonomía.

### Buscador

ENTER ya cae en `/buscar`. Autocomplete **nuevo** (click → ficha). Dos destinos de label, una ruta.

### Carrito / Revisar Pedido

`CartDrawer` deja de ser el patrón de Armar Pedido (overlay).  
Header carrito fuera de esa pantalla: **sin cascada cerrada** (definición posterior).  
Revisar Pedido es un rol nuevo; el store de carrito se reusa.

### Mi Cuenta

Cascada mínima: un CTA. No se reabre pedidos/facturas.

### Home

Sin marcas, sin CTA extra, banners Admin, destacados flag, ofertas flag. `CatalogCarousel` sale del hero.

---

## Cruce: qué se toca por más de un movimiento

| Área | 1 Rubro≠Marca | 2 Subrubro | 3 Oferta | 4 Destacado | 5 Navegación |
|---|---|---|---|---|---|
| Producto (modelo/mocks) | Sí | Sí | Sí | Sí | Indirecto (filtros) |
| Admin Productos | Sí | Sí | Sí | Sí | No |
| Admin Rubros | Sí | No | No | No | No |
| Filtros / `/buscar` | Sí | Sí | Sí | No | Sí |
| Home | No | No | Sí | Sí | Sí (bloques) |
| Header | No | No | Ofertas menú | No | Sí |
| Marca / Rubro pages | Sí | Sí | No | No | Sí |
| Carrito | No | No | Débil | No | Sí (layout) |
| Banners Admin | No | No | No | No | Sí (Home) |
| Pedidos Admin / Listas | No | No | No | No | No (**FUERA DE ALCANCE**) |

---

## Lo que esta cascada **no** es

- No es un backlog de tickets.
- No es un orden de PRs.
- No autoriza a tocar `src/` en Fase 3.
- No convierte cada archivo de la matriz Fase 2 en un “debe reescribirse”: varios se **dejan de usar** en su rol actual (`CatalogCarousel` como hero, `OfferProductCard` como catálogo, dropdown Secciones).
