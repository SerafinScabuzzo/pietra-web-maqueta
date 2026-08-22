# Etapa 8 — Admin mínimo

Leer junto a `docs/fase-3-resultado-deseado/10-admin-alcance.md`. Representar el cambio. **No** clonar producción.

---

## OBJETIVO

1. **Admin Productos:** rubro **global**, subrubro dependiente del rubro, flags `isOffer` y `isFeatured`. Nombre, SKU, marca, precios, imagen se conservan.
2. **Admin Rubros:** sin dependencia de marca (completar lo que el puente de Etapa 1 no pulió).
3. **Banners → Home** ya conectado en Etapa 4; aquí solo verificar CRUD y no crear otra arquitectura.

Subrubros: **NO ABM**. Mocks + asignación en producto + frontend Categorías. No `/admin/subrubros`.

---

## PRECONDICIONES

- Etapa 1 types/mocks.
- Home ya lee banners (Etapa 4).
- Puente Admin de Etapa 1 puede haber dejado Rubros “a medias”.

---

## ARCHIVOS A MODIFICAR

| Path | Qué |
|---|---|
| `src/pages/admin/AdminProductos.tsx` | Select rubros = `getCategories()` **completo**, no `getCategoriesByBrand(formData.brandId)`. Al cambiar marca **no** limpiar rubro (ya no dependen). Select subrubro = `getSubcategoriesByCategory(formData.categoryId)`; al cambiar rubro, si el subrubro no es hijo, limpiar. Checkboxes/radios **Oferta** y **Destacado** (`isOffer`, `isFeatured`). `createProduct` incluye esos campos. Quitar del JSX `shortDescription` y `ean` (clase A + no están en el type). Usar `productCategory` en la tabla (columna Rubro). `categoryId` fallback `''`. No agregar Publicado/Orden/Copete. |
| `src/pages/admin/AdminRubros.tsx` | Quitar filtro “Filtrar por marca”, quitar `Marca *` del form, quitar `getBrandName` en la tabla. Unicidad ya es por nombre en store. `formData` sin `brandId`. Imagen + nombre + order. |
| `src/pages/admin/AdminLayout.tsx` | **NO** agregar ítem Subrubros / Pedidos / Listas / Ofertas. |
| `src/store/adminStore.ts` | Solo si createCategory/update aún mencionan `brandId`. |

---

## ARCHIVOS NUEVOS

Ninguno. No `AdminSubrubros.tsx`.

---

## ARCHIVOS INTACTOS (salvo dependencia inevitable)

| Pieza | Acción |
|---|---|
| `AdminDashboard.tsx` | NO TOCAR (KPIs sync fuera) |
| `AdminMarcas.tsx` | NO TOCAR (las 8 marcas entran por mocks de Etapa 1; no ABM de alta acá) |
| `AdminCatalogos.tsx` | NO TOCAR |
| `AdminBanners.tsx` | NO TOCAR el CRUD; ya alimenta Home |
| `AdminClientes.tsx` | NO TOCAR |
| `pages/Admin.tsx` stub | NO TOCAR |
| Chrome doble header | FUERA DE ALCANCE |
| `ImageField` http(s) | NO TOCAR salvo que impida guardar un rubro; no es el pedido |
| Tabla Productos “+ Nuevo” | Dejar; no igualar a prod sin alta web |

---

## CAMBIOS DE MODELO

Ninguno nuevo. El form escribe campos de Etapa 1.

Al guardar producto:

- `isOffer` independiente de `priceOffer`. Se puede marcar oferta sin precio oferta (card usa lista).
- `isFeatured` no afecta filtros de `/buscar`.
- `subcategoryId` requerido en demo (select). Si está vacío, no guardar / validar.

---

## RUTAS

Sin rutas Admin nuevas. Siguen `/admin/productos`, `/admin/rubros`, `/admin/banners`.

---

## VISUAL

Look Admin distinto a producción: **FUERA DE ALCANCE**. No gastar la reunión en el chrome. Sí: que el form de producto **muestre** Oferta, Destacado, Rubro global, Subrubro. Que Rubros no pidan marca.

---

## REUTILIZADOS

- Modal/tabla actuales de Admin Productos y Rubros
- `ImageGalleryField`
- `getBanners` ya usado en Home

---

## RIESGO

**MEDIO.** `AdminProductos` es el archivo con más errores tsc. Al abrirlo hay que arreglar **A de este archivo** y nada más. Riesgo: al cambiar marca se siga filtrando rubros (regresión al modelo viejo). Mitigación: borrar esa rama, no dejar un `if (brandId)`.

`normalizeCategories` pisa rubros al recargar: un rubro creado en Admin **desaparece** al F5. Eso **ya pasa hoy**. **NO** es un ticket de esta etapa (persistencia de categories = fuera, salvo que el create deje de funcionar en la sesión). Productos sí persisten: flags sobre productos mock **sí** sobreviven recarga.

---

## REGRESIONES

- Home destacados/ofertas cambian si se editan flags y se vuelve al Home (puede requerir reload: el store no es React state global). **Aceptar reload** como la maqueta actual (Home lee store al montar).
- Login admin demo.
- No aparecen Pedidos/Listas.

---

## VALIDACIÓN MANUAL

1. Admin Productos abre. Columna Rubro muestra el **rubro**, no el SKU.
2. Editar un producto: marca + rubro global (lista única Herramientas, Grifería, …) + subrubro que cambia al cambiar rubro.
3. Check Oferta → Home y `/buscar?offer=1` lo incluyen (reload).
4. Check Destacado → Home destacados (reload). Uncheck → sale, aunque sea `pie-001`.
5. Precio oferta numérico se puede llenar **sin** que eso solo lo meta a ofertas (isOffer off).
6. Admin Rubros: no hay selector de marca. Crear/editar nombre+imagen.
7. Admin Banners: editar título; Home (reload) muestra el cambio.
8. No existe menú SubRubros / Pedidos / Listas / Ofertas.

---

## CRITERIOS DE ACEPTACIÓN

- [ ] Producto: rubro global, subrubro hijo, `isOffer`, `isFeatured`.
- [ ] Rubros sin marca.
- [ ] Sin ABM Subrubros.
- [ ] Banners siguen siendo **la** fuente del Home.
- [ ] tsc A de `AdminProductos` resueltos al tocar el archivo.
- [ ] Resto Admin intacto.

---

## NO HACER EN ESTA ETAPA

- No Pedidos Admin, Listas, TXT, sync, facturas.
- No ABM de alta de marcas. Las 8 ya están en mocks (Etapa 1).
- No módulo Ofertas/Destacados.
- No igualar radios Publicado/Orden.
- No arreglar `ImageField` vs `/uploads` salvo bloqueo real de la demo de rubros.
- No quitar “+ Nuevo Producto”.
- No campaña eslint.

Checkpoint: `checkpoint-admin`.
