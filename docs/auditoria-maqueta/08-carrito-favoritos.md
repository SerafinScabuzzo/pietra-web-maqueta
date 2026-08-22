# Carrito y favoritos

---

## Carrito — store

Archivo: `src/store/clientStore.ts`.

- Persistencia: `localStorage['pietra_cart_' + cuit]` = `{ items: [{ productId, quantity }] }`
- `addToCart(productId, quantity=1)` — no-op si no hay cliente; si el ítem existe, **suma** cantidad
- `updateCartItemQuantity` — si `quantity <= 0`, elimina la línea
- `removeFromCart` / `clearCart`
- `getCartItemCount` → `cart.items.length` (**líneas**, no unidades)

Item: solo `productId` + `quantity`. Precio **no** se congela en el ítem; se relee de `getProducts()` al pintar.

Cliente obligatorio: todas las mutaciones piden `getCurrentClient()`.

Descuentos: el drawer aplica `client.discountRate` sobre **`priceList`**. Si el producto tiene `priceOffer`, **el carrito no lo usa**.

Totales en `CartDrawer.calculateTotals`:

- subtotal = Σ `priceList * quantity`
- discountAmount = subtotal * discountRate
- total = subtotal * (1 - discountRate)

---

## CartDrawer — UI

Archivo: `src/components/CartDrawer.tsx`. Portal a `document.body`. Montado desde `Header` solo si `auth.isClient`.

| Aspecto | Observado en código |
|---|---|
| Tamaño colapsado | `w-full md:w-[420px] max-w-[90vw]` |
| Expandido | `w-full` (pantalla completa) vía botón expandir/contraer |
| Overlay | `fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]`; click cierra |
| Open | `setShowCart(true)` desde header |
| Close | X, Escape, click overlay; restaura `document.body.style.overflow` |
| Scroll lock | `overflow: hidden` en body mientras abierto |
| Responsive | En mobile el drawer ya es `w-full` |
| Lista | scroll interno; imagen `images[0] \|\| '/placeholder.jpg'` (`placeholder.jpg` **no existe** en public) |
| Botones ítem | +/- cantidad, Eliminar |
| Footer | Subtotal, Descuento %, Total, “Vaciar carrito”, “Finalizar compra” |
| Finalizar | `<button>` **sin `onClick` ni `Link`** |
| ¿Pantalla completa? | Opcional (`isExpanded`); no es una ruta `/carrito` |

Prod (Fase 1): `.carritoTop` en DOM; Vaciar `/vaciar-carrito`; Finalizar `enviar_pedido.php` **no visitado**. Overlay drawer: no observado con claridad.

---

## Revisar Pedido / Armar Pedido / enviar pedido

**NO EXISTE.** No hay página, ruta ni wizard. El botón Finalizar no navega. No se creó nada en esta fase.

---

## Dónde se agrega al carrito

- `ProductCard` (listados) — sí
- `OfferProductCard` — no
- `Producto.tsx` (ficha) — no
- Home — vía ProductCard — sí

---

## Favoritos

- Store: `Client.favorites: string[]` (ids de producto) persistidos en `pietra_clients`
- `toggleFavorite` / `isFavorite` — no-op sin cliente
- Evento `pietra_favorites_changed`
- UI corazón: solo `ProductCard` si hay client; click sin cliente hace `window.location.href = '/login'`
- Página `/favoritos` (`Favoritos.tsx`): si no client → “Acceso requerido”; si vacío → CTA `/buscar`; si hay → grilla ProductCard
- `navigate` importado y **no usado** (error tsc/eslint)
- Ficha: botón “Agregar a favoritos” **no llama** `toggleFavorite`

Prod: `/favoritos`; `scriptAgregarFavorito.php?codigo=SKU`; corazón visible en público.

---

## WhatsApp / compra

No hay CTA WhatsApp de compra en cards ni ficha. Quiero ser cliente usa WhatsApp `5493413589318` (prod flotante `5493415853899` — números distintos).
