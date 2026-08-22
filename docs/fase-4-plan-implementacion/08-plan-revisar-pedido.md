# Etapa 6 — Revisar Pedido y confirmación mock

---

## OBJETIVO

Página completa de carrito expandido. Confirmar = simulación mínima. Header **Carrito** pasa a un solo comportamiento: ir a Revisar Pedido. El overlay del header **deja de usarse**.

**Misma tanda que Etapa 5.** Acá se **crea** `/revisar-pedido` y se **conectan** “Revisar pedido” del lateral + Carrito Header + confirmación mock. Tras E5 el checkpoint era navegable sin esta ruta; tras E6 ya no hay 404.

---

## PRECONDICIONES

- Etapa 5 hecha **en esta misma tanda**: 3 columnas, carrito abierto, minimizar, `clientStore`, cantidades/totales. El botón “Revisar pedido” de la columna **aún no navega** (o es el CTA previo inerte).
- Auth cliente.

---

## ARCHIVOS A MODIFICAR

| Path | Qué |
|---|---|
| `src/app/providers/router.tsx` | Ruta `/revisar-pedido`. |
| `src/components/Header.tsx` | Botón Carrito → `<Link to="/revisar-pedido">`. Quitar `showCart` / montaje de `CartDrawer`. Badge se conserva. Desktop y mobile. |
| `src/components/CartDrawer.tsx` | Columna: el CTA “Revisar pedido” ahora **sí** `navigate('/revisar-pedido')` (primera vez que se cablea). Deja de montarse desde Header. El `variant="column"` sigue en Buscar. El `variant="overlay"` queda **sin call site** — no borrar aún (no es campaña de dead code). |

---

## ARCHIVOS NUEVOS

| Path | Qué |
|---|---|
| `src/pages/RevisarPedido.tsx` | Pantalla completa. Estado local `confirmed: boolean` **en la página**, no en el store. |

Guard: si `!getCurrentClient()` → `<Navigate to="/login" replace />`.

---

## ARCHIVOS INTACTOS

- `clientStore.ts` — se llama `clearCart()` al confirmar. **No** `createOrder`. **No** array `orders` en el cliente.
- `types/client.ts`
- Admin Pedidos (no existe / no crear)
- Checkout, envío, pago, observaciones
- `MiCuenta.tsx` (CTA = Etapa 7)

---

## CAMBIOS DE MODELO

Ninguno. No hay entidad Pedido.

Número mock: generado **en memoria** al confirmar:

```
PED-{últimos 6 de Date.now()}
```

No se guarda. Recargar pierde el mensaje (aceptable). El carrito sí queda vacío (localStorage).

---

## RUTAS

| Ruta | Rol |
|---|---|
| `/revisar-pedido` | Cliente. Revisar Pedido. **CREAR.** |

Volver → `/buscar` (Armar Pedido).

Tras éxito: mismo path o estado en la página. **No** `/pedido-ok` extra (menos router). Un bloque:

```
Pedido confirmado correctamente
Número: PED-123456
[ Volver a Armar Pedido ]
```

---

## VISUAL

### Imagen 8 — Revisar Pedido

- **Requisito:** foto, nombre, SKU, precio, qty editable, subtotal de línea, eliminar, #productos (líneas), #unidades (suma qty), total, Volver, Confirmar.
- **Conservar:** **mismo importe de línea** que Card y carrito lateral (Etapas 5–6: coherencia; no tres fórmulas). Cards/imagen estilo sitio. No look Stripe/checkout.
- **No:** wizard, steps, mapa, medio de pago, comentario.

Lista tipo tabla o filas apiladas. Desktop prioridad. Mobile: apilar filas **sin** diseño especial (no destruir).

Botón columna “Revisar pedido” = esta página (**se cablea en esta etapa**, no en la 5). Header Carrito = esta página.

---

## REUTILIZADOS

- `getCart` / `updateCartItemQuantity` / `removeFromCart` / `clearCart`
- Resolución producto vía `getProducts()`
- Misma fórmula de importe de línea que Card + columna (la que se unificó en E5/E6; no reintroducir `priceOffer` en un lado y `priceList * (1-discount)` en otro)

Contador header = **líneas** (no cambiar a unidades). Revisar Pedido **sí** muestra ambos números.

---

## RIESGO

**MEDIO.** Confirmar es el único “cierre” de compra de la demo. Riesgo: vaciar el carrito **antes** de pintar el mensaje, o crear un pseudo-backend. Mitigación: `setConfirmed(true)` + `mockNumber` + `clearCart()` en el mismo handler. Vacío + no confirmado = empty state “Tu pedido está vacío” + link a Armar Pedido (no mensaje de éxito).

---

## REGRESIONES

- Header ya no oscurece ninguna página con overlay.
- Armar Pedido columna sigue.
- Agregar desde card / ficha actualiza Revisar Pedido al navegar.
- Logout vacía la sesión; el carrito queda en `pietra_cart_{cuit}` (como hoy).

---

## VALIDACIÓN MANUAL

1. Cliente, Armar Pedido, 2 productos distintas cantidades.
2. Columna → Revisar pedido: foto, nombre, SKU, precio, qty, subtotal, eliminar.
3. Ver “2 productos” y unidades = suma.
4. Total = coherente con descuento del cliente.
5. Volver → `/buscar` con carrito intacto.
6. Header Carrito (desde Home, Mi Cuenta, etc.) → `/revisar-pedido`. **No** overlay.
7. Confirmar → mensaje exacto + número + carrito vacío. Badge 0.
8. Volver a Armar Pedido → columna vacía.
9. Confirmar con carrito vacío: no mostrar éxito; CTA a armar.
10. Visitante `/revisar-pedido` → login.

---

## CRITERIOS DE ACEPTACIÓN

- [ ] Página completa con todos los campos pedidos.
- [ ] Un comportamiento de Header Carrito.
- [ ] Confirmación mock sin store de pedidos.
- [ ] Texto “Pedido confirmado correctamente”.
- [ ] Vacía carrito.
- [ ] Sin wizard/envío/pago.
- [ ] Overlay header muerto.
- [ ] Importe de cada línea = el de Card y columna.
- [ ] Columna + Header Carrito llegan acá (ya no 404).

---

## NO HACER EN ESTA ETAPA

- No `enviar_pedido.php`.
- No persistir historial.
- No Admin Pedidos.
- No observaciones.
- No email.
- No cambiar `discountRate`.
- No extraer design system de tablas.

Checkpoint: `checkpoint-revisar-pedido`.
