# Alcance: qué NO tocar (legacy)

Si no está en una etapa 1–8, **no entra** a Fase 5.

---

## Prohibiciones de proceso

- No reescribir la app.
- No design system, no librería de UI nueva, no extraer 15 hooks.
- No reemplazar `adminStore` / `clientStore` por Zustand/Redux/Context.
- No cambiar React Router por otro. No sacar Tailwind.
- No “igualar producción al 100%”.
- No campaña `tsc` / eslint. Solo clase A del archivo que esa etapa abre.
- No modificar `package.json` / lockfile / configs salvo dependencia **bloqueante** (no se prevé ninguna).
- No backend, no PHP, no APIs reales.
- No Fase 5 sin autorización explícita.

---

## Legacy de producto — NO TOCAR

| Área | Motivo |
|---|---|
| Admin Pedidos | No existe; no demuestra el pedido |
| Admin Listas | No existe |
| Importación TXT / sync / “Eliminar facturas” | FOA |
| Admin SubRubros ABM | Mocks + campo en producto alcanzan |
| Módulo Admin Ofertas / Destacados | Flags en producto |
| Paridad 2258 productos / 47 rubros / 205 subrubros / miles de clientes | Volumen FOA. **Sí** entran las 8 marcas visuales + 1 producto mínimo c/u (Etapa 1) |
| Wizard envío / pago / observaciones | FOA |
| `enviar_pedido.php` | No visitado; no clonar |
| Recupero de contraseña | FOA |
| Mi Cuenta: pedidos, facturas, listas, email de prod | FOA |
| Matching CUIT vs N° cliente / cambiar type `cuit` | Solo label Usuario |
| Stock, Publicado, Orden, Copete, EAN, shortDescription | No demuestran el cambio |
| Rubro OFERTA/LIQUIDACION | Flag `isOffer` |
| Corazón favorito en visitante | No pedido |
| Qty default 0 vs 1 | FOA |
| Select paginación 10/20/50/100 | 24 fijo |
| Rutas PHP `/articulo/{slug}`, `/subrubro/...`, `/secciones` | No clonar |
| `/productos` o `/armar-pedido` como path extra | Se reutiliza `/buscar` |
| Armar Pedido **mobile** (trío de columnas) | Definición posterior |
| Footer redes/año/WhatsApp | Identidad a largo plazo, **no** esta oleada salvo hotfix visual pedido |
| Barlow / W3.CSS / copiar header IA | No rediseñar |
| `CatalogCard` importando mock `brands` | No es el pedido |
| Favicon `vite.svg` | No |
| Doble header Admin | FOA visual |
| `pages/Admin.tsx` stub | Ya huérfano |
| Persistencia marcas/rubros/catálogos al F5 | Ya pisan mock; no es ticket salvo bloqueo |
| `ImageField` rechaza `/uploads` | No, salvo que E8 no pueda guardar un rubro |

---

## Archivos que se dejan vivir pero sin rol nuevo

- `CatalogCarousel.tsx`
- `OfferProductCard.tsx`
- `OfferFilters.tsx`
- `CartDrawer` variant overlay (sin Header)

No hace falta borrarlos en Fase 5.

---

## tsc clase B — NO TOCAR

Ver tabla en `01-preflight.md`. Incluye `auth.ts` `require()` mientras la demo use botones.

---

## Fuera de este plan (recordatorio Fase 3)

Checkout real, mobile Armar Pedido como proyecto, carrito header *distinto* de Revisar Pedido (ahora **cerrado**: va a Revisar Pedido), paridad de PDF 2025 vs 2026.
