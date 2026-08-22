# Estado técnico

**No se corrigió nada.** Comandos ejecutados con Node de Cursor (npm no está en PATH):

```
C:\Users\scabu\AppData\Local\Programs\cursor\resources\app\resources\helpers\node.exe
```

CWD: `C:\Users\scabu\OneDrive\Escritorio\PAGINA WEB\PAGINA WEB`

| Comando | Resultado |
|---|---|
| `where npm` | no encontrado |
| `node.exe node_modules/typescript/bin/tsc --noEmit --pretty false` | exit 2, 15 errores |
| `node.exe node_modules/eslint/bin/eslint.js . --ext ts,tsx --report-unused-disable-directives --max-warnings 0` | exit 1, 13 errores |
| `node.exe node_modules/vite/bin/vite.js build` | **OK** (81 modules, ~2.5s) → `dist/` (gitignored) |
| `npm run build` | no ejecutable (no hay npm). Equivaldría a fallar en el `tsc` previo |
| `node.exe node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173` | **OK** — `http://127.0.0.1:5173/` |

`package.json` `"build": "tsc && vite build"`: el bundling Vite pasa; el gate TypeScript no.

---

## Errores TypeScript (`tsc`)

| Archivo | Línea aprox | Error | Impacto |
|---|---|---|---|
| `OfferProductCard.tsx` | 72, 74 | `shortDescription` no existe en `Product` | El bloque nunca type-checkea; en runtime es `undefined` y no se pinta |
| `SearchFilters.tsx` | 9 | `onClose` unused (`noUnusedParameters`) | Bloquea `tsc`; no afecta UI |
| `AdminProductos.tsx` | 75 | `categoryId: string \| undefined` no asignable a `string` | Alta de producto puede crear `categoryId` undefined si el select falla |
| `AdminProductos.tsx` | 97 | `productCategory` unused | La columna Rubro de la tabla no se llena (ver bug de celdas) |
| `AdminProductos.tsx` | 296–297 | `shortDescription` no está en `Product` | El textarea no es un campo del modelo |
| `AdminProductos.tsx` | 306–307 | `ean` no está en `Product` | El input EAN no es un campo del modelo |
| `Buscar.tsx` | 10 | `setSearchParams` unused | Cosmético tsc |
| `Favoritos.tsx` | 8 | `navigate` unused | Cosmético |
| `Login.tsx` | 86 | `handleDemoLogin` unused | Hay otro camino demo (`setClientDemoMode`); este handler muerto |
| `MiCuenta.tsx` | 2 | `Link` unused | Cosmético |
| `adminStore.ts` | 20 | `ALLOWED_BRAND_IDS` unused | No filtra marcas |
| `clientStore.ts` | 1 | `CartItem` unused import | Cosmético |

---

## Errores ESLint (además de unused)

| Archivo | Línea aprox | Error | Impacto |
|---|---|---|---|
| `CatalogCarousel.tsx` | 27 | `useEffect` después de `return` temprano (`rules-of-hooks`) | Con 1 catálogo (caso actual) no explota. Si `catalogs.length` pasa de 0 a >0 (o al revés) React puede romper el carrusel de Home |
| `auth.ts` | 60 | `require()` (`no-var-requires`) | `loginClient` del **form** usa CommonJS `require` en app Vite ESM. Riesgo: `require is not defined` al ingresar con CUIT/código. Los botones demo **no** pasan por esa línea |
| `auth.ts` | 169, 185 | `any` | Solo tipos |
| `adminStore.ts` | 153 | `_` unused al extraer `id` | Cosmético |

---

## Bugs / inconsistencias obvias (código), no arreglados

1. **Tabla Admin Productos desalineada** (`AdminProductos.tsx` ~113–186): 7 headers, 6 `<td>`. Rubro muestra SKU; Precio muestra acciones.
2. **`require` en login** (`auth.ts` ~60).
3. **Hooks condicionales** en `CatalogCarousel`.
4. **Type vs UI** `shortDescription` / `ean`.
5. **Banners Admin no alimentan Home**; Home usa catálogos.
6. **Marcas/rubros/catálogos no persisten** al recargar (normalize desde mock). Productos y banners sí (productos con remap de `categoryId` inválido).
7. **`ImageField` rechaza URLs relativas** `/uploads/...` usadas por marcas.
8. **Botones muertos:** Finalizar compra; Consultar disponibilidad; Agregar a favoritos en ficha.
9. **`CatalogCard` importa `brands` del mock**, no `getBrands()` del store.
10. **Doble header en Admin** (público + AdminLayout).
11. **Favicon `/vite.svg` inexistente.**
12. **`pages/Admin.tsx` y `BannerSlider.tsx` huérfanos** del router/Home.

---

## Runtime

Verificado en esta fase:

- Vite sirve HTML (`STATUS_OK`, 630 bytes del index)
- Home, `/buscar` (30 productos), `/ofertas` (7), `/login`, `/marca/pietra` (screenshots)

No se abrió en esta fase (marcar **NO VERIFICADO** en UI): modal Admin, drawer carrito con ítems, ficha producto, `/mi-cuenta` logueado, submit del form CUIT (por el `require`). El análisis de código de esos flujos **sí** está hecho.
