# Assets

Inventario. **No se corrigió ningún archivo faltante.**

Las imágenes de `public/uploads/` no aparecieron en el buscador de workspace (probablemente ignoradas); se listaron por filesystem.

---

## `public/`

| Ruta | Bytes | Referenciado en código |
|---|---|---|
| `uploads/.gitkeep` | 62 | no |
| `uploads/banner principal.jpg` | 389864 | `Catalogo.tsx`, fallback `CatalogCarousel.tsx` |
| `uploads/CARATULA FV.png` | 227667 | **ninguna referencia** |
| `uploads/LOGO PIETRA 4.1.png` | 20369 | Header, `brands.ts` pietra logo+hero |
| `uploads/LOGO PIETRA 4.png` | 13362 | **ninguna referencia** |
| `uploads/motaPortada.png` | 22086 | `brands.ts` mota `heroImageUrl` |
| `uploads/portadaCatalogo.png` | 845521 | `catalogs.ts` `coverUrl` |
| `uploads/portadaFV.jpg` | 77537 | `brands.ts` fv `heroImageUrl` |

No hay `public/vite.svg`. `index.html` pide `/vite.svg`.

---

## Referencias a archivos **inexistentes** en `public/`

| Referencia | Dónde | Impacto |
|---|---|---|
| `/uploads/mota-logo.png` | `brands.ts` `logoUrl` | BrandGrid usa hero primero (`motaPortada.png`), así que Home muestra portada. Admin Marcas preview de logo fallaría |
| `/uploads/fv-logo.png` | `brands.ts` `logoUrl` | Igual: Home usa `portadaFV.jpg`. Logo Admin faltante |
| `/uploads/banner-1.jpg` | `adminStore` banner-1 | Admin Banners card; Home no lo usa |
| `/uploads/banner-2.jpg` | `adminStore` banner-2 | Idem |
| `/vite.svg` | `index.html` favicon | Favicon roto |
| `/placeholder.jpg` | `CartDrawer` fallback de imagen | Ítem sin `images[0]` |

---

## URLs externas (sí se piden en runtime)

- Productos y rubros: `images.unsplash.com` (varias). Runtime: algunas cards se ven genéricas / poco relacionadas al SKU (observado en `/buscar` y `/ofertas`).
- Catálogo PDF: `https://drive.google.com/file/d/14HcANutT_ctn6rwwLKdf3txPXO70mMy9/view`
- Footer: Instagram, LinkTree, TikTok
- Quiero ser cliente: `api.whatsapp.com` phone `5493413589318`

---

## Duplicación Banner

`Banner` está definido en `adminStore.ts` y otra vez como interface local en `BannerSlider.tsx`. Home no usa ninguno de los JPG de banner.

---

## Screenshots de esta auditoría

Guardados en `docs/auditoria-maqueta/screenshots/`:

- `01-home.png`
- `02-buscar.png`
- `03-ofertas.png`
- `04-login.png`
- `05-marca-pietra.png`
