# Etapa 0 — Preflight

No se escribe código. No se “arregla” tsc a nivel repo. Sirve para no empezar Fase 5 a ciegas.

La ejecución de esta etapa en Fase 5 deja el informe en `docs/fase-5-ejecucion/00-preflight-resultado.md`. **No** implementar. **No** modificar `src/` / mocks. **No** iniciar Etapa 1.

---

## Alineación con correcciones de plan (no reescribe el resto)

1. **Ofertas Home visitante:** puede ver tarjetas; no tiene Ofertas en menú; “Ver más / Ver todas las ofertas” → aviso (no `/buscar?offer=1`). El filtro Solo Ofertas en `/buscar` visitante **sigue**. Cliente: menú Ofertas → `/buscar?offer=1`. En esta etapa solo **registrar** el Home actual (hoy “Ver todas →” va a `/ofertas`).
2. **Etapa 5 navegable:** E5 no cablea `/revisar-pedido`. E6 (misma tanda) crea la ruta. `checkpoint-carrito` sin 404. Aquí no se implementa nada de eso.
3. **8 marcas demo:** Pietra, Mota, Prive, Rao, F.V, Tramontina, Ingco, Solyon Argentina SA. Inventariar assets existentes. **No** descargar. **No** agregar marcas ahora.
4. **Precios Card → Carrito:** solo **documentar** si el importe de la misma línea coincide. **No** cambiar la fórmula.

---

## OBJETIVO

Dejar documentado el estado de arranque: qué está roto, qué es clase A vs B, qué hay en localStorage, si los banners tienen imagen, assets de las 8 marcas, coherencia de precios Card vs carrito, y cómo tratar datos legacy **antes** de Etapa 1 (decidir A migrar/normalizar vs B limpiar mocks incompatibles; **no ejecutar**).

---

## PRECONDICIONES

- Fases 1–3 aprobadas.
- CWD de trabajo: `C:\Users\scabu\OneDrive\Escritorio\PAGINA WEB\PAGINA WEB`
- Vite sirve (`vite --host 127.0.0.1 --port 5173`). `npm` puede no estar en PATH; usar el `node.exe` de Cursor si hace falta (ver `auditoria-maqueta/12-estado-tecnico.md`).

---

## ARCHIVOS A MODIFICAR

Ninguno.

---

## ARCHIVOS NUEVOS

Ninguno en `src/`. Este documento es la salida.

---

## ARCHIVOS INTACTOS

Todo `src/`, mocks, configs, `package.json`.

---

## CAMBIOS DE MODELO

Ninguno.

---

## RUTAS

Ningún cambio. Recorrer las actuales y anotar que siguen vivas:

- `/` Home
- `/buscar` 30 productos
- `/login` botones demo
- `/marca/pietra` rubros de marca (rol que se retirará en Etapa 3)
- `/ofertas` vitrina (rol que se retirará)
- `/admin` si se entra como admin demo

---

## VISUAL

No hay cambio visual. Verificar que la maqueta **actual** abre.

---

## REUTILIZADOS

N/A.

---

## RIESGO

**BAJO.** Solo lectura. El riesgo es **saltar** esta etapa y que Etapa 1 pise un `localStorage` sucio o que un JPG de banner inexistente deje el Home vacío en Etapa 4.

---

## REGRESIONES

No aplica (no hay diff).

---

## VALIDACIÓN MANUAL

1. Abrir `http://127.0.0.1:5173/` — Home carga, hay hero, marcas, destacados, ofertas.
2. `/buscar` — “30 productos disponibles” (o el conteo actual).
3. Login demo cliente → `/mi-cuenta`. Header muestra Favoritos / Carrito.
4. Login demo admin → `/admin` abre.
5. DevTools → Application → Local Storage: anotar si existe `pietra_admin_store`. Si existe, **antes de Etapa 1** hay que migrar o limpiar productos (ver más abajo).
6. Intentar cargar `/uploads/banner-1.jpg` y `/uploads/banner-2.jpg`. La auditoría Fase 2 los marca **ausentes**. Confirmar.
7. No correr una “campaña” `tsc`/`eslint` para limpiar. Solo clasificar.
8. Inventariar assets de las **8 marcas** (logo local / imagen usable / no existe). No descargar.
9. Cliente demo: agregar 1 producto si es seguro y comparar importe Card vs carrito. Si no se puede: **NO VERIFICADO**. No cambiar fórmula.
10. Decidir por escrito estrategia de datos legacy **A** (migrar/normalizar) vs **B** (limpiar mocks incompatibles). Priorizar simplicidad demo. **No ejecutar.**
11. Screenshots baseline en `docs/fase-5-ejecucion/screenshots/` (Home, `/buscar`, Mi Cuenta, Admin, carrito si funciona). No en `src/assets`.

---

## CRITERIOS DE ACEPTACIÓN

- [ ] Maqueta navegable en el estado actual.
- [ ] Tabla A/B de errores tsc/eslint completada (abajo).
- [ ] Decisión escrita sobre `pietra_admin_store`.
- [ ] Decisión escrita sobre imágenes de banner (Etapa 1 o 4 las usa).
- [ ] Nada de `src/` modificado.

---

## NO HACER EN ESTA ETAPA

- No corregir tsc/eslint.
- No conectar banners.
- No cambiar menús.
- No borrar `localStorage` del usuario sin registrarlo: si se limpia, es un paso **explícito** de Etapa 1.
- No instalar dependencias nuevas.
- No cambiar `package.json` / Tailwind / Router.

---

## Clasificación tsc / eslint (Fase 2, revalidar si el conteo cambió)

Fuente: `docs/auditoria-maqueta/12-estado-tecnico.md` (15 tsc, 13 eslint). `vite build` **pasa**; el script `build` falla por `tsc &&`.

### Clase A — arreglar DENTRO de la etapa que toca ese archivo

| Archivo | Error | Etapa que lo vuelve A | Arreglo mínimo |
|---|---|---|---|
| `SearchFilters.tsx` | `onClose` unused | **2** | Prefijo `_onClose` o quitar la prop. |
| `Buscar.tsx` | `setSearchParams` unused | **2** | Se usará para `page`. Si no, quitar del destructuring. |
| `adminStore.ts` | `ALLOWED_BRAND_IDS` unused | **1** | Eliminar la constante (no se usa). |
| `AdminProductos.tsx` | `categoryId` `string \| undefined`; `productCategory` unused; `shortDescription`/`ean` | **8** | `categoryId` con fallback `''`; usar `productCategory` en la tabla; quitar campos UI que no están en el type (o no tocarlos si se dejan fuera del form nuevo — **quitarlos** del JSX para que tsc pase al editar el archivo). |
| `Login.tsx` | `handleDemoLogin` unused | **7** | Borrar el handler muerto. |
| `MiCuenta.tsx` | `Link` unused | **7** | Se usará en el CTA. |

### Clase B — no afectan la demo si no se abre ese archivo. NO TOCAR

| Archivo | Error | Por qué B |
|---|---|---|
| `OfferProductCard.tsx` | `shortDescription` | `/ofertas` deja de ser catálogo. El archivo queda huérfano. No “arreglarlo”. |
| `CatalogCarousel.tsx` | hooks condicionales | Home deja de importarlo (Etapa 4). No reescribir el carrusel. |
| `Favoritos.tsx` | `navigate` unused | No se toca Favoritos. |
| `clientStore.ts` | import `CartItem` unused | No se toca el store salvo que una etapa lo abra; si Etapa 5/6 **no** editan el archivo, sigue B. |
| `auth.ts` | `require()` + `any` | Los **botones demo** no pasan por `require`. El form CUIT sí es frágil. Para la reunión se usan botones demo. **No campaña.** Si en Etapa 7 se prueba el form y explota, recién ahí es A **dentro de esa etapa**. |
| `adminStore.ts` | `_` unused al extraer `id` | Cosmético; solo A si se edita esa función. |

**Regla Fase 5:** al abrir un archivo, se arreglan **solo** los A de ese archivo que impiden `tsc` de ese cambio. No se recorre el repo.

---

## localStorage `pietra_admin_store`

`loadFromStorage` **sí** rehidrata `products` y `banners`. `normalizeCategories()` **pisa** rubros con el mock en cada load.

Consecuencia para Etapa 1:

- Si hay productos persistidos con `categoryId` viejo (`pietra-herramientas`, etc.), al cambiar ids de rubro esos productos quedan huérfanos.
- `normalizeProducts` hoy reasigna al “primer rubro de la marca” vía `c.brandId` — esa rama **se rompe** cuando `brandId` desaparece de `Category`.

**Decisión de plan (ejecutar en Etapa 1, no ahora):**

1. Ampliar `normalizeProducts` para remapear ids viejos → ids globales + defaults `isOffer` / `isFeatured` / `subcategoryId`.
2. Si el remap es dudoso: borrar la clave `pietra_admin_store` **una vez** en esa máquina de demo y recargar. Documentar el paso en el checkpoint-modelo.

Banners persistidos pueden seguir apuntando a `/uploads/banner-1.jpg` inexistente. Ver siguiente bloque.

---

## Imágenes de banner

Seed actual (`adminStore.ts`):

- `/uploads/banner-1.jpg` → `/catalogo`
- `/uploads/banner-2.jpg` → `/ofertas`

Fase 2: esos JPG **no están**. Home hoy no los usa (usa `CatalogCarousel`). En Etapa 4 el Home **sí** los usará.

**Decisión de plan:** en Etapa 1 (mocks/seed) cambiar `imageUrl` de los banners seed a un asset que **sí** exista (p. ej. `/uploads/portadaCatalogo.png` si está, o URL Unsplash genérica de ferretería) **o** copiar un placeholder a `public/uploads/`. No crear un segundo sistema de banners. `buttonLink` de banner-2 pasará a `/buscar?offer=1` en Etapa 4.

Logos Mota/FV marcados ausentes en Fase 2: no es bloqueante para Preflight; la página Marcas puede mostrar el `onError` ya existente de `BrandGrid`. En Etapa 1 se agregan 5 marcas más (Prive, Rao, Tramontina, Ingco, Solyon Argentina SA): si no hay logo local, **documentar y no descargar**; usar placeholder/`onError` o imagen usable ya existente.

---

## Estrategia de datos legacy (decidir en el informe; no ejecutar)

Antes de Etapa 1 hay que elegir **una**:

- **A — Migrar/normalizar:** ampliar `normalizeProducts` (ids viejos → globales + flags + `subcategoryId`) y dejar `pietra_admin_store` si ya hay productos persistidos.
- **B — Limpiar mocks incompatibles:** borrar `pietra_admin_store` una vez en la máquina de demo y arrancar desde mocks nuevos (8 marcas + mínimo de productos + flags). Más simple para demo.

Prioridad: **simplicidad demo**. El informe de Fase 5 Etapa 0 deja la decisión escrita.

---

## Recordatorio de stack (no cambiar)

- React 18 + Vite 5 + React Router 6 `BrowserRouter`
- Tailwind 3 (`brandBlue` / `brandOrange`)
- Stores: módulos JS + localStorage. **No Zustand.**
- Sin carpeta `hooks/` ni `services/`

Checkpoint: `checkpoint-preflight` (`14-checkpoints.md`).

---

## Resultado de ejecución (Fase 5 Etapa 0)

Informe: `docs/fase-5-ejecucion/00-preflight-resultado.md` (22/08/2026).  
`src/` no modificado. Etapa 1 **no** iniciada.
