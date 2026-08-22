# Resumen — auditoría maqueta local (Fase 2)

Fecha: 22/08/2026  
Alcance: prototipo React/Vite/TS/Tailwind en `PAGINA WEB/`  
Modo: solo lectura de código + ejecución de build/tsc/lint + servidor Vite en `http://127.0.0.1:5173/` + 5 screenshots.  
**No se modificó `src/` ni se inició Fase 3.**

---

## Qué es esta maqueta

SPA de demostración (no producción). Datos mock + `localStorage`. Tres modos de uso: público, cliente demo, admin demo.

Stack instalado (no solo `package.json`):

| Pieza | package.json | Instalado |
|---|---|---|
| React | ^18.2.0 | 18.3.1 |
| React Router | ^6.20.0 | 6.30.3 |
| Vite | ^5.0.8 | 5.4.21 |
| TypeScript | ^5.2.2 | 5.9.3 |
| Tailwind | ^3.3.6 | 3.4.19 |
| Zustand / Redux / Context | — | **no hay** |

Persistencia: stores de módulo (variables en memoria) + `localStorage`. Sin backend, sin API, sin sync.

---

## Hallazgo estructural más importante

La maqueta modela **Marca → Rubro (Category con `brandId`) → Producto**.

**SUBRUBRO NO ESTÁ MODELADO EN LA MAQUETA.** No hay type, mock, store, ruta, página ni sección Admin. En producción el listado de productos vive en `/subrubro/{marca}/{rubro}/{subrubro}`; acá el listado vive en `/marca/:brandId/rubro/:categoryId`.

---

## Conteos mock actuales

- 3 marcas: Pietra, Mota, FV
- 9 rubros (3 por marca, cada uno con `brandId`)
- 30 productos
- 7 productos con `priceOffer < priceList` (condición de “oferta”)
- 1 catálogo (“Catálogo Pietra 2025”)
- 2 banners en store (no se renderizan en Home)
- 2 clientes mock

---

## Estado técnico (detalle en `12-estado-tecnico.md`)

- `npm` **no está en PATH**. Node usado: `C:\Users\scabu\AppData\Local\Programs\cursor\resources\app\resources\helpers\node.exe`
- `tsc --noEmit`: **FALLA** (15 errores)
- `eslint`: **FALLA** (13 errores)
- `vite build` (sin pasar por `tsc`): **OK**
- `npm run build` (`tsc && vite build`): **no se pudo ejecutar** (no hay `npm`); equivaldría a fallar por `tsc`
- Dev server: **sí arranca** en `http://127.0.0.1:5173/`

---

## Reutilizable vs parcial vs ausente (descriptivo)

Ver `13-comparacion-preliminar.md`. Etiquetas usadas: SIMILAR / PARCIAL / AUSENTE / EXTRA / NO VERIFICADO.

**FUNCIONALIDAD YA EXISTENTE Y POTENCIALMENTE REUTILIZABLE (ejemplos):**

- ENTER / submit del buscador navega a `/buscar?q=`
- Página `/buscar` con filtros Marca, Rubro, Solo ofertas y sort en query params
- Header con dropdown Secciones = marcas
- `BrandGrid` (Home) navega a `/marca/:brandId`
- Página `/marca/:brandId` con grilla de rubros
- Carrito drawer con overlay, scroll lock, expandir a pantalla completa
- Login post-éxito → `/mi-cuenta`
- Flag de oferta vía `priceOffer` + página `/ofertas` + filtro Solo ofertas
- Admin mock: Dashboard, Productos, Marcas, Rubros, Catálogos, Banners, Clientes

**Casi hecho (preciso):**

- Filtro Marca existe en `/buscar` y `/ofertas`, **pero no restringe la lista de Rubros**
- Admin Productos tiene selects Marca y Rubro (Rubro depende de Marca); la tabla **no muestra Rubro** (columnas desalineadas)
- Form Admin Productos tiene campos UI `shortDescription` y `ean` **que no existen en el type `Product`**
- Destacados de Home existen como bloque visual, **sin campo `destacado`** (toma los primeros 6 productos)
- `BannerSlider.tsx` existe y Admin Banners existe; Home **no los usa** (usa `CatalogCarousel`)

---

## Documentos de esta carpeta

| Archivo | Contenido |
|---|---|
| `00-resumen.md` | Este archivo |
| `01-estructura-proyecto.md` | Stack, árbol `src/`, componentes clave |
| `02-rutas.md` | Tabla de rutas |
| `03-modelo-datos.md` | Product, Brand, Category, oferta, destacado, subrubro |
| `04-publico-cliente.md` | Auth, diferencias de sesión |
| `05-home-header.md` | Header + Home |
| `06-busqueda-filtros.md` | SearchBar, `/buscar`, filtros |
| `07-productos-cards.md` | Variantes de cards |
| `08-carrito-favoritos.md` | CartDrawer, favoritos |
| `09-marca-rubro.md` | Marca, Rubro, Producto, Ofertas, Mi Cuenta |
| `10-admin.md` | Admin mock completo |
| `11-assets.md` | Inventario de archivos |
| `12-estado-tecnico.md` | tsc / lint / build / errores |
| `13-comparacion-preliminar.md` | Maqueta vs producción (descriptiva) |
| `14-dudas.md` | No verificado / dudas |
| `screenshots/` | 5 capturas runtime |

Matrices de dependencias (`brandId`, `categoryId`, oferta, auth, carrito): ver `03-modelo-datos.md` y `13-comparacion-preliminar.md`.
