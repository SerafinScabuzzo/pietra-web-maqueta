# Cliente logueado — web real

Los datos personales de la cuenta de prueba (nombre, CUIT, email) no se transcriben.

## Post login

- URL: `https://pietraitaly.com.ar/miCuenta_2026.php`
- Título documento: Pietra
- Primera pantalla: **Mi Cuenta** (no Home)

### Header logueado
- Se mantiene: logo, buscador, Secciones, Ofertas, Catálogos, Empresa
- Desaparece: Ingresar, Quiero ser cliente
- Aparece: Favoritos (corazón rojo) · Carrito N · Mi Cuenta · Salir
- Salir → `logout_2026.php`

## Mi Cuenta (`miCuenta_2026.php` / `/micuenta`)

Campos/bloques observados:
- CUIT
- ID Cliente / N°
- Nombre
- Links: **Ver Mis Pedidos Realizados** → `miCuenta_pedidos.php`
- **Ver Mis Facturas y Comprobantes** → `miCuenta_comprobantes.php` (no se abrió para no exponer comprobantes)
- Bloque **Descuento** con porcentaje grande (en la cuenta de prueba: 55%)
- **Cambio de Contraseña** (input + CAMBIAR CONTRASEÑA) — no se usó
- **Cambio de Email** (email actual + nuevo + CAMBIAR EMAIL) — no se usó
- **Descarga de Listas** (bloque presente; no se descargó nada)

No hay CTA grande "Armar Pedido". El camino de compra es menú Ofertas / Secciones / buscador.

## Home logueado

Igual visualmente (banner, marcas, destacados, ofertas).
Diferencias:
- Header de sesión
- En cards: **precio visible**, input **Cantidad** (default 0), botón **Agregar al carrito**
- "Ingresar para comprar" desaparece

## DIFERENCIAS PÚBLICO VS CLIENTE

| Elemento | Público | Cliente |
|---|---|---|
| Header extra | Ingresar, Quiero ser cliente | Favoritos, Carrito, Mi Cuenta, Salir |
| Precio | Oculto ("Iniciá sesión para ver precios") | Visible |
| CTA card | Ingresar para comprar | Agregar al carrito |
| Cantidad | No | Input number, min 0, default 0 |
| Favorito | Corazón visible | `scriptAgregarFavorito.php?codigo=` |
| Carrito | No | Panel `.carritoTop` + Vaciar + Finalizar |
| Ofertas | 171 ítems, mismos filtros | Igual listado + precios + cantidad |
| Ficha | Consultar disponibilidad, Agregar a favoritos, sin precio | Precio + cantidad + Agregar al carrito |

## Product card logueada

- Imagen + corazón
- Marca (azul chico)
- Título MAYÚSCULAS
- SKU
- Precio (formato `$ 15945.66`, sin miles con punto argentino consistente: usa punto decimal)
- Cantidad (fondo verde cuando vale 1)
- Agregar al carrito (azul en subrubro; naranja en ofertas)
- Ver detalles

## Cantidades

- `input[name=cantidad[]]` type=number, min=0, max vacío, default 0
- Agregar con 0: NO VERIFICADO (se puso 1)
- Submit: `onclick` cambia `form.action` a `agregarProductosCarrito.php`
- Campos hidden asociados: `codigo[]`, `precio_producto[]`

## Favoritos

- Página `/favoritos`
- Toggle: `scriptAgregarFavorito.php?codigo={SKU}`
- En Ofertas un corazón ya estaba rojo (estado preexistente). No se alteró para no persistir cambios.
- NO VERIFICADO: si el toggle es add/remove en el mismo script.

## Carrito

- Contador en header: líneas (pasó a "Carrito 1" al agregar un ítem)
- Contenedor `.carritoTop` siempre en DOM: Total, Vaciar carrito (`/vaciar-carrito`), Finalizar Compra (`enviar_pedido.php`)
- El click en "Carrito" del header no abrió un overlay tipo drawer a pantalla completa; el panel parece dropdown/top
- Overlay oscuro tipo drawer: no observado con claridad
- Finalizar: **no se navegó** a `enviar_pedido.php` por riesgo de generar el pedido
- Después de auditar: GET `/vaciar-carrito` (seguro, deja total $ 0)

## Ofertas logueado

Misma grilla y filtros. Precios visibles. Cantidad + Agregar. Cards con borde naranja.

## Ficha logueada

- Precio naranja grande
- Rubro mostrado: en el artículo de oferta era "OFERTA / LIQUIDACION / OFERTA/LIQUIDACION"
- Descripción a menudo vacía
- Imágenes de ese artículo rotas
- Cantidad + Agregar al carrito (reemplaza los botones públicos)

## Pedidos (`miCuenta_pedidos.php`)

- Listado de pedidos del cliente. Solo inspección. No se abrió detalle de confirmación ni se cambió estado.
