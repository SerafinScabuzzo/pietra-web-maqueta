# Flujos observados — web real

## Encontrar un producto (hoy)

Home
→ Secciones (dropdown de **marcas**) o card de marca
→ `/marca/{marca}` (elige rubro)
→ `/rubro/{marca}/{rubro}` (elige subrubro, si hay)
→ `/subrubro/{marca}/{rubro}/{subrubro}` (lista)
→ `/articulo/{slug}`

Atajos:
- Buscador → sugerencia → artículo (sin página de resultados)
- Ofertas → filtros marca/rubro → artículo
- Destacados/Ofertas del Home → Ver detalles

No existe un catálogo único "Productos" independiente de marca.

## Compra (hasta antes de confirmar)

1. Login
2. Ir a listado o ficha
3. Ver precio (ya con descuento de cliente aplicado en el número mostrado)
4. Cantidad (default 0) → Agregar → `agregarProductosCarrito.php`
5. Header "Carrito N"
6. Panel `.carritoTop`: total, vaciar, **Finalizar Compra**
7. Finalizar → `enviar_pedido.php`

El paso 7 **no se ejecutó**. No hay evidencia de wizard, envío, pago ni observaciones en los pasos 1–6. Si `enviar_pedido.php` confirma al abrirse, es un riesgo.

## Alta de cliente

Público: formulario mail `form2mailCliente.php` + WhatsApp flotante.  
No hay registro self-service.

## Auth

Un solo form `/ingreso` para cliente y admin.  
Cliente → `miCuenta_2026.php`. Admin → `admin.php`.  
Logout común: `logout_2026.php`.

## Oferta (flujo de datos observado)

Producto puede:
- tener flag Admin `oferta = Si`
- y/o estar colgado del rubro OFERTA / LIQUIDACION

La vitrina `/ofertas` es una lista propia con paginación.  
En Home, el bloque Ofertas es un carrusel recortado.

## Destacados

Flag `destacado` en el producto. Carrusel en Home. Sin ABM aparte.
