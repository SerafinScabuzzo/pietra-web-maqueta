# Home — resultado deseado

Público objetivo de la reunión: **visitante** en desktop. El Home logueado no se rediseña; cambian header y cards.

---

## Decisión de conjunto

| Bloque | Decisión |
|---|---|
| Header | **CONSERVAR** estética / **ADAPTAR** ítems (ver `08`) |
| Buscador | **CONSERVAR** como pieza / **ADAPTAR** ENTER y **CREAR** autocomplete |
| Banners | **ADAPTAR** (más protagonismo; fuente Admin) |
| Marcas | **RETIRAR/DEJAR DE USAR** del Home |
| Destacados | **CONSERVAR** bloque / **ADAPTAR** criterio (flag) |
| Ofertas | **CONSERVAR** bloque / **ADAPTAR** “Ver todas” |
| “Todos nuestros productos” | **RETIRAR/DEJAR DE USAR** |
| Footer | **CONSERVAR** identidad de producción |
| WhatsApp flotante | **CONSERVAR** (web real). Ausencia en maqueta no se trata como feature nueva de negocio |

---

## Orden de bloques deseado

1. Header
2. **Banners** (hero / carrusel) — más protagonismo que hoy
3. **Productos destacados**
4. **Ofertas**
5. Footer

No hay grilla “Marcas con las que trabajamos” en Home.  
No hay banda CTA “Ver todos los productos”. El menú ya tiene Productos.

---

## Banners

**Web real:** 2 slides del Admin (Catálogo 2026 + Herramientas), foto full, texto overlay, CTA, flechas naranjas.

**Maqueta:** Home usa `CatalogCarousel` + `getCatalogs()`. Existen `AdminBanners` + `getBanners()` + `BannerSlider`, pero Home **no los consume**. `BannerSlider` hoy pinta solo el primer banner.

**Deseado:**

- Una sola arquitectura: **Admin Banners → Home**.
- No segunda fuente (catálogos como hero).
- Más protagonismo visual (presentación). No se pide un rediseño de marca; se pide que el banner sea el bloque principal, como en producción.
- `CatalogCarousel` deja de ser el hero. Los catálogos siguen en **Catálogos**.

**Decisión:** **ADAPTAR** Home y el slider existente. **CONSERVAR** el módulo Admin. **RETIRAR/DEJAR DE USAR** catálogo-como-banner.

---

## Destacados

**Web real:** radio `destacado` Sí/No en el producto; carrusel en Home.

**Maqueta:** `products.slice(0, 6)` — todos Pietra del inicio del array. No hay campo.

**Deseado:** el Home lista productos con **Destacado = Sí**. No los primeros N del array.

Formato del bloque (grilla vs carrusel): **CONSERVAR** la idea de vitrina de producción (carrusel) si no pelea con la card actual; no rediseñar cards. La maqueta hoy usa grilla: no es obligatorio clonar Splide; sí es obligatorio el **criterio del flag**.

**Decisión:** **CREAR** el flag conceptual. **ADAPTAR** el bloque.

---

## Ofertas del Home

**CONSERVAR** el bloque para visitante.

- Cards **sin precio** (B2B).
- Intento de compra → camino de login ya existente en la card (“Ingresá para comprar” / “Ingresar para comprar”). **No se inventa texto de modal.**
- “Ver todas” **no** abre una vitrina paralela eterna: va al **catálogo central** con Solo Ofertas=on (visitante = Productos).
- Criterio de inclusión: flag **Oferta = Sí**, no `priceOffer < priceList` como única verdad, ni el rubro OFERTA/LIQUIDACION.

Cliente que vuelve al Home: mismas cards con precio/compra (comportamiento de producción). No se pide un Home distinto.

---

## Marcas (solo para dejar claro el retiro)

El título “Marcas con las que trabajamos” y `BrandGrid` **se mudan** a la página Marcas (`05-categorias-marcas.md`).  
No se eliminan del producto; salen del Home.

---

## Home logueado

**CONSERVAR** la idea de producción: el Home no cambia de layout; cambia el header y las cards.

No hay CTA Armar Pedido en el Home (ese CTA es de **Mi Cuenta**). El menú ya dice Armar Pedido.

---

## Qué no se iguala

- 8 marcas vs 3: **FUERA DE ALCANCE** (y además las marcas ya no viven en Home).
- Fotos rotas de producción: no se replican.
- Typo “herramietas” del banner real: no se copia.
- Año 2025 vs 2026 del catálogo: **FUERA DE ALCANCE** para el hero, porque el hero deja de ser el catálogo.
