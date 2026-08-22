# Fase 5 — Etapa 5: revisión final

Fecha: 22/08/2026  
CWD: `C:\Users\scabu\OneDrive\Escritorio\PAGINA WEB\PAGINA WEB`  
Servidor de prueba: `http://127.0.0.1:5174/` (Vite 5173 ocupado en esta máquina)

**Estado: DEMO READY PARA REUNIÓN 31/08/2026.**

No se creó arquitectura nueva. Recorrido público + cliente + admin mínimo. Correcciones solo de título de catálogo y presentación de botones DEMO.

---

## Recorrido realizado

- Home público (header, hero 560px, destacados, ofertas, sin Marcas).
- Ver más ofertas → aviso, no navega.
- `/buscar` PRODUCTOS, 24/página (1–24 / 25–37 de 37), Pietra A–Z primero.
- Filtro Pietra, estado vacío (`solyon` + Solo ofertas).
- `/categorias` 9 rubros globales; `/categorias/griferia` → subrubros → `/buscar?category=&subcategory=`.
- `/marcas` 8 marcas → `/buscar?brand=`.
- Autocomplete “canilla” (6 ≤ 8); Enter → `/buscar?q=canilla` título PRODUCTOS.
- Catálogos, Empresa, Quiero ser cliente, Login Usuario.
- Demo Cliente → Mi Cuenta → CTA → Armar Pedido 3 columnas.
- Pedido 4 SKUs (1+3+5+2 = 11 unidades), precios coincidentes, minimizar, Ofertas conserva carrito, Favoritos, detalle, Revisar, Confirmar PED-202169, carrito vacío, logout, `/revisar-pedido` público → `/login`.
- Admin: dashboard, productos (Subrubro/Oferta/Destacado), rubros sin marca dueña, banners.

Consola: **0 errores / 0 excepciones**. Imágenes rotas en el recorrido: **ninguna**.

---

## Bugs encontrados

1. Con query, el H1 de `/buscar` decía “Resultados para: …” y no PRODUCTOS / ARMAR PEDIDO (pedido explícito de la etapa).
2. Login seguía con placeholder formato CUIT y botones demo muy llamativos para una reunión.

No se encontraron inconsistencias de precio, overlays en Armar Pedido, ni rutas blancas.

## Bugs corregidos

1. H1 de `/buscar` siempre **PRODUCTOS** o **ARMAR PEDIDO**; la query queda como subtítulo.
2. Placeholder Login: “Ingresá tu usuario”. Botones demo más chicos, marcados `[DEMO]`.

## Ajustes visuales

Solo los dos anteriores. No se cambió paleta, Header, Footer ni ProductCard.

## Regresiones

Ninguna respecto de Etapas 1–4. El flujo de compra y la navegación pública se revalidaron.

---

## Resultado público

Header aprobado. Home: banners → destacados (`isFeatured`) → ofertas (`isOffer`) → footer. CTA ofertas pide login. Catálogo 24/página, filtros, chips, vacío claro. Categorías globales. Marcas independientes. Buscador autocomplete + Enter. Catálogos / Quiénes somos (contenido Empresa) / Quiero ser cliente / Login OK.

## Resultado cliente

Login → Mi Cuenta + CTA. Header cliente sin Quiero ser cliente. Armar Pedido 3 columnas, carrito abierto, minimizar. Precios Card = lateral = Revisar. Confirmar mock + PED + carrito vacío. Logout restaura público.

## Resultado Admin

Abre. Productos no crashea. Rubros globales. Banners abre.

---

## Build / TypeScript / ESLint

| | Etapa 0 | Etapa 4 | Final |
|---|---|---|---|
| Vite build | OK | OK | **OK** |
| tsc | 15 | 3 | **3** |
| eslint | 13 | 5 | **5** |

Errores actuales = **legacy / archivos no tocados en el flujo**:

- tsc: `OfferProductCard.tsx` `shortDescription` (2); `Favoritos.tsx` `navigate` unused (1).
- eslint: `CatalogCarousel` hooks (huérfano); Favoritos unused; `adminStore` `_`; `auth.ts` `any` en demo.

Ninguno pertenece a Header/Home/Buscar/CartPanel/RevisarPedido. No rompen la demo.

---

## Estado final de demo

Ver procedimiento en `demo-click-by-click.md`. Preferencia: deslogueado, carrito demo vacío, Home, sin filtros.

## Fuera de alcance que permanece

- `CartDrawer.tsx` y `CatalogCarousel.tsx` sin uso (no se borraron).
- Header cliente denso en 1440px (todas las opciones pedidas).
- Admin sigue mostrando el Header público encima (preexistente).
- Página `/empresa` sigue titulada “Empresa”; el menú dice Quiénes somos.
- Imágenes de productos/rubros vía Unsplash: requieren red; hay fallback de nombre si fallan.
- Confirmación mock, sin backend.
- Mobile de 3 columnas: apilado mínimo, no UX nueva.
