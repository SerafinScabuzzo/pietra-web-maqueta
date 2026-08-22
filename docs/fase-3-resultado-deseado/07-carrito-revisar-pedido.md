# Carrito y Revisar Pedido — resultado deseado

---

## Principio

El carrito de la **demo** vive en **Armar Pedido** como columna.  
**Revisar Pedido** es esa misma información a pantalla completa.  
No hay checkout.

---

## Carrito en Armar Pedido (desktop)

| Aspecto | Maqueta actual | Deseado | Decisión |
|---|---|---|---|
| Contenedor | `CartDrawer` portal, overlay `bg-black/40`, blur, z-index alto | Columna derecha del layout | **ADAPTAR** |
| Apertura | Cerrada; se abre desde header | **Abierta por default** al entrar a Armar Pedido | **ADAPTAR** |
| Overlay / oscurecer | Sí; click cierra; `overflow: hidden` en body | **No** | **RETIRAR/DEJAR DE USAR** ese patrón **dentro de Armar Pedido** |
| Minimizar | Expandir a `w-full` / contraer a ~420px | Minimizable (columna se pliega) | **ADAPTAR** |
| Contenido mínimo | Imagen, qty +/-, eliminar, subtotal, descuento %, total, vaciar, finalizar inerte | Suficiente para armar. La ficha completa es Revisar Pedido | **CONSERVAR** operaciones básicas |

**No** es un drawer que tape la grilla.

---

## Header “Carrito” fuera de Armar Pedido

Producción: `.carritoTop` en el header.  
Maqueta: el mismo drawer desde el header.

**DEFINICIÓN POSTERIOR** si hace falta para la reunión.  
No bloquea Fase 3. **FUERA DE ALCANCE** decidir overlay vs dropdown vs ir a Armar Pedido.

Mientras tanto, el camino pedido de compra es: **Armar Pedido → columna → Revisar Pedido**.

---

## Revisar Pedido

**CREAR.** No existe como página. `CartDrawer` expandido es solo un acercamiento (sigue siendo overlay).

Pantalla completa = carrito expandido. Debe mostrar:

| Campo / control | Obligatorio |
|---|---|
| Foto | Sí |
| Producto (nombre) | Sí |
| SKU | Sí |
| Precio | Sí |
| Cantidad editable | Sí |
| Subtotal de línea | Sí |
| Eliminar línea | Sí |
| Cantidad de productos (líneas) | Sí |
| Cantidad de unidades (suma de qty) | Sí |
| Total | Sí |
| Volver | Sí (a Armar Pedido) |
| Confirmar | Sí |

### Qué no es

- Wizard
- Checkout
- Datos de envío
- Pago
- Observaciones / comentario de pedido
- `enviar_pedido.php` de producción (no verificado; no se clona)

**Decisión:** **FUERA DE ALCANCE** todo lo posterior a Confirmar como flujo de negocio real.

Qué ocurre **al pulsar Confirmar** (pantalla de éxito, pedido mock, volver a Mi Cuenta): **duda real** (`12`). No se inventa un wizard para tapar el hueco.

---

## Totales (qué conservar de la maqueta)

Hoy el drawer:

- usa `priceList * quantity`
- aplica `discountRate` del cliente
- **ignora** `priceOffer`

Producción muestra en card un precio ya descontado; el detalle de `enviar_pedido.php` no se vio.

Para la demo: **CONSERVAR** que el cliente vea un total coherente con el precio que vio al agregar.  
Si Oferta pasa a flag Sí/No, el precio mostrado sigue siendo el de lista / el de oferta de la demo, **sin** abrir un módulo de listas de precios. Paridad exacta con el descuento 55% de producción: **FUERA DE ALCANCE** si el número se entiende.

Contador header actual = **líneas** (como “Carrito 1” de Fase 1). Revisar Pedido **sí** distingue líneas vs unidades. No se pide cambiar el badge del header en esta fase.

---

## Dónde se agrega (deseado vs hoy)

| Origen | Maqueta hoy | Deseado |
|---|---|---|
| ProductCard en catálogo | Sí | Sí (Armar Pedido) |
| OfferProductCard | No | Esa card deja de ser el canal de compra |
| Ficha `Producto.tsx` | No | Cliente **sí** puede agregar (no contradecir) |
| Home | Vía ProductCard | Visitante no; cliente sí si pasa por Home |

---

## Vaciar

**CONSERVAR** la operación (maqueta `clearCart`; prod `/vaciar-carrito`). Puede vivir en Revisar Pedido y/o en la columna. No se pide confirmar contra un servidor.
