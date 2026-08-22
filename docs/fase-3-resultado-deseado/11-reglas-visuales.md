# Reglas visuales

---

## Fuente de verdad visual

| Cosa | Fuente | No hacer |
|---|---|---|
| Identidad, colores, header, footer, cards existentes | **Web real** (Fase 1) | Rediseñar “para que se vea moderno” |
| Layout de **partes nuevas** (Categorías, Marcas índice, Productos/Armar Pedido 3 columnas, Revisar Pedido) | Decisiones aprobadas (+ imágenes IA **si** se usaron como layout) | Copiar header, paleta o footer de una imagen IA |
| Comportamiento de card, autocomplete, banners | Producción + pedidos de este documento | Igualar cada pixel de PHP/W3 |

En este workspace **no hay archivos** de imágenes IA aprobadas. El layout de lo nuevo queda fijado por texto (`03`, `06`, `07`). Si más adelante se adjuntan capturas, valen para **columnas y jerarquía de lo nuevo**, no para recolorear el sitio.

---

## Identidad a conservar

De `auditoria-web-real/06-componentes-visuales.md`:

- Fondo página celeste `rgb(220, 234, 253)`
- Superficies blancas, sombra suave
- Texto gris, tipografía **Barlow** en producción
- Azul/púrpura: títulos, logo, links
- Naranja: CTA “Quiero ser cliente”, acentos de oferta, flechas de banner
- Footer carbón; títulos de columna naranja

La maqueta ya usa `brandBlue` / `brandOrange` / `brandGray`. **ADAPTAR** hacia la identidad real **solo** si en la reunión no se reconoce Pietra. No es un rediseño Tailwind.

---

## Header y footer

**CONSERVAR** producción si no hay pedido en contrario.

- Header: blanco, logo + wordmark, buscador, links texto, un CTA naranja.
- Footer: contacto (`distcentro@yahoo.com.ar`, Av. del Rosario 154), IG + Facebook, horarios Lun 9–17 / Mar–Vie 8–17, © PietraItaly.
- WhatsApp flotante de producción (`5493415853899`) forma parte de esa identidad.

La maqueta hoy: footer 2024, LinkTree+TikTok, sin WhatsApp. Eso **no** es un pedido de cambio: la dirección es **acercarse a producción**, no clonar redes de la maqueta ni de una IA.

---

## Partes nuevas — layout (no skin)

### Página Categorías / Rubro

- Grilla de cards **categoría**: foto 4:3 + nombre. Como las cards de rubro/subrubro de producción.
- Imagen **genérica** (baño, herramientas, grifería como rubro), **nunca** el logo de una marca ni una campaña Pietra/FV.

### Página Marcas

- Misma idea que el bloque Home de producción / `BrandGrid`: logo + nombre, fondo blanco.
- Se mudó de Home; no se redibuja.

### Productos (visitante)

- Filtros izquierda + grilla + sort + paginación.
- Cards de **producción**, no un look de “e-commerce nuevo”.

### Armar Pedido (desktop)

- Tres columnas: Filtros | Grilla | Carrito.
- Carrito es **columna**, no modal oscuro.
- Prioridad **desktop** (reunión).

### Revisar Pedido

- Tabla/lista a pantalla completa (foto, datos, qty, totales).
- No se pide un look de checkout Stripe.

---

## Product card

No rediseñar gratis.

**CONSERVAR:** imagen, marca chica, título, SKU, precio solo logueado, CTA login / agregar, ver detalles, estado “ya agregado”.

**ADAPTAR** solo si el nuevo flujo lo exige (mismo card en Productos y Armar Pedido).

MAYÚSCULAS de títulos en prod vs sentence case de maqueta: **FUERA DE ALCANCE** si se entiende.

---

## Banners

Más protagonismo = más peso en la **página** (primer bloque, full width, slides), no un estilo de agencia distinto.

Flechas/CTA naranja de producción: **CONSERVAR** idea, no clonar Splide.

---

## Responsive

- Desktop = prioridad 31/08/2026.
- No destruir hamburguesa / `md:` existentes.
- Armar Pedido en mobile (cómo apilar filtros + grilla + carrito): **definición posterior**. No se especifica un hamburger-de-filtros ni un bottom sheet en Fase 3.

---

## Admin

Look distinto al público de producción: **FUERA DE ALCANCE**. No gastar la reunión en el chrome Admin.
