# Componentes visuales recurrentes — web real

Sin hablar del código local.

## Sistema visual
- Fondo página: celeste `rgb(220, 234, 253)`
- Superficies: blanco, sombra suave, radios redondeados
- Texto principal: gris `rgb(80, 79, 79)`, Barlow
- Azul/púrpura para títulos, logo, links, botones primarios de catálogo
- Naranja para CTA "Quiero ser cliente", flechas de banner, acentos de Ofertas, % descuento, algunos botones de oferta
- Footer carbón/gris oscuro, títulos de columna naranja

## Header
- Barra blanca full width
- Logo imagen + wordmark
- Buscador ancho central
- Links texto + un único botón naranja
- W3.CSS (`w3-button`) + clases propias (`botosTop`, `buscadorTop`)

## Card de producto
Pública: imagen, corazón, marca, título, SKU, CTA login, Ver detalles.  
Cliente: + precio + cantidad + Agregar.  
Ofertas: mismo esquema con borde naranja.

## Card de marca (home)
Logo centrado + nombre abajo. Click a `/marca/...`.

## Card de rubro / subrubro
Foto 4:3 aprox. + label MAYÚSCULAS abajo a la izquierda. Sin precio.

## Banner / hero
Foto full width, texto blanco overlay, botón naranja, chevrons naranja.

## Breadcrumb
`Inicio / MARCA / RUBRO / SUBRUBRO` bajo el header.

## Filtros Ofertas
Columna izquierda, título naranja "Filtros", checkboxes Marcas y Rubros.

## Admin
- Mismo header del sitio + sidebar blanco
- Dashboard: cards KPI con franja de color arriba
- ABM marcas/rubros/subrubros: grilla de cards, Editar azul, Eliminar rojo
- Productos/clientes: tabla
- Formularios: card blanca, labels + inputs, radios Si/No

## WhatsApp
Botón circular verde fijo, esquina inferior derecha, en casi todas las pantallas (también Admin).
