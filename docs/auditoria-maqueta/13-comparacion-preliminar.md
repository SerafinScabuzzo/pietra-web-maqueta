# Comparación preliminar maqueta vs producción

Descriptiva. **No es Fase 3.** Etiquetas permitidas: **SIMILAR / PARCIAL / AUSENTE / EXTRA / NO VERIFICADO**.  
Fuentes: docs `auditoria-web-real/01`–`08` + código y runtime de la maqueta.

---

## Tabla por área

| Área | Producción | Maqueta | Etiqueta |
|---|---|---|---|
| Stack visual (celeste, blanco, azul, naranja, footer oscuro) | Fondo `rgb(220,234,253)`, Barlow, W3.CSS | Tailwind sky/blue/indigo, brandBlue/Orange; sin Barlow | PARCIAL |
| Header público | Logo, buscador, Secciones, Ofertas, Catálogos, Empresa, Ingresar, CTA | Misma estructura; “Catálogo” singular; 3 marcas en dropdown | PARCIAL |
| Header cliente | + Favoritos, Carrito, Mi Cuenta, Salir; oculta Ingresar y CTA | + Favoritos/Carrito/Mi cuenta/Salir; CTA **sigue** | PARCIAL |
| Buscador autocomplete | AJAX sugerencias; click → artículo | Sin sugerencias | AUSENTE (autocomplete) |
| Buscador ENTER | No cambia URL | Navega a `/buscar?q=` | EXTRA — **FUNCIONALIDAD YA EXISTENTE Y POTENCIALMENTE REUTILIZABLE** |
| Página resultados `/buscar` | No existe | Existe + filtros | EXTRA |
| Home banner | 2 banners Admin + PDF | 1 slide desde catálogo + PDF Drive | PARCIAL |
| Home marcas | 8 marcas → `/marca/{slug}` | 3 marcas → `/marca/:id` · `BrandGrid` reutilizable | PARCIAL |
| Home destacados | Flag `destacado` + carrusel | `slice(0,6)` sin flag, grilla | PARCIAL |
| Home ofertas | Carrusel recortado | Grilla 6 + link Ver todas | PARCIAL |
| Bloque “Todos los productos” | No | CTA → `/buscar` | EXTRA |
| Footer | Contacto, IG+FB, horarios, ©2026, WhatsApp flotante | Contacto, IG+LinkTree+TikTok, horarios, ©2024, **sin WhatsApp flotante** | PARCIAL |
| Navegación Marca→Rubro→Subrubro→Producto | URLs de 4 niveles | Marca→Rubro→Producto (3). Subrubro ausente | PARCIAL |
| Página Marca | Rubros globales con foto | Rubros con `brandId` + foto Unsplash | PARCIAL |
| Página Rubro | Lista subrubros | Lista productos | PARCIAL |
| Página Subrubro | Lista productos | No hay | AUSENTE |
| Ficha artículo | `/articulo/{slug}` | `/producto/:id` | PARCIAL |
| Ofertas vitrina | 171 ítems, paginación, filtros marca/rubro | 7 ítems, filtros, **sin paginación** | PARCIAL |
| Flag oferta Admin | Radio Sí/No | `priceOffer` numérico | PARCIAL |
| Rubro OFERTA/LIQUIDACION | Existe | No está en mocks | AUSENTE |
| Destacado Admin | Radio Sí/No | No modelado | AUSENTE |
| Card pública | Corazón + Ingresar + Ver detalles | Sin corazón + Ingresá + Ver detalles | PARCIAL |
| Card cliente | Precio (con desc.), cant. default 0, Agregar | Precio lista/oferta sin desc. cliente; cant. default 1 | PARCIAL |
| Card ofertas | Borde naranja + compra | `OfferProductCard` borde naranja **sin** compra | PARCIAL |
| Login | CUIT/N°, pass, recupero; un form cliente/admin | CUIT+código, **sin recupero**, botones demo | PARCIAL |
| Post-login destino | Mi Cuenta | `/mi-cuenta` | SIMILAR |
| Mi Cuenta | Pedidos, facturas, email, listas, descuento | Datos + descuento + cambiar código | PARCIAL |
| CTA Armar Pedido en cuenta | No | No | SIMILAR (ausente en ambos) |
| Favoritos página | `/favoritos` | `/favoritos` | SIMILAR (mecanismo distinto) |
| Carrito | `.carritoTop`, vaciar, finalizar `enviar_pedido.php` | Drawer overlay, vaciar, Finalizar **inerte** | PARCIAL |
| Página / wizard Pedido | `enviar_pedido.php` NO VERIFICADO | No hay | AUSENTE / NO VERIFICADO prod |
| Catálogos | 1 PDF 2026 `/catalogos/8.pdf` | 1 PDF Drive 2025 + filtros extra | PARCIAL |
| Empresa | Texto + typos | Texto limpio similar | SIMILAR |
| Quiero ser cliente | Form mail | Solo WhatsApp (tel. distinto) | PARCIAL |
| Admin Dashboard | KPIs + sync + facturas | 5 KPIs mock | PARCIAL |
| Admin Productos | Filtro marca, sin alta web, orden/oferta/destacado/publicado/copete/fotos | Alta mock, SKU/precios/marca/rubro; UI ean/shortDescription rotos; tabla desalineada | PARCIAL |
| Admin Marcas | Alta/baja, 3 imágenes tamaño fijo | Solo editar 3; logo/hero URL | PARCIAL |
| Admin Rubros | Globales, sin marca | **Con** marca | PARCIAL |
| Admin SubRubros | Sí | No | AUSENTE |
| Admin Catálogos | Sí | Sí (no persiste recarga) | PARCIAL |
| Admin Listas | Sí (0 ítems) | No | AUSENTE |
| Admin Banners | 2, alimentan Home | CRUD; Home no los usa | PARCIAL |
| Admin Clientes | Tabla sync masiva | ABM 2 mocks | PARCIAL |
| Admin Pedidos | Sí | No | AUSENTE |
| Paginación listados | Ofertas y rubro/subrubro | **NO HAY PAGINACIÓN** | AUSENTE |
| Auth persistente servidor | PHP session | localStorage | EXTRA (solo maqueta) |

---

## Matrices (cascada) — resumen

Detalle archivo por archivo: `03-modelo-datos.md`.

### brandId
Atraviesa types, mocks, adminStore, router `/marca/:brandId`, Header, BrandGrid, filtros buscar/ofertas/catálogo, Admin Productos/Rubros/Marcas/Catálogos, ProductCard, ficha. Si las marcas pasan de 3 a 8, Header `brandOrder` y AdminMarcas `brandOrder` ya enumeran ids extra que el mock no trae.

### categoryId
Atraviesa Category+Product, Rubro page, filtros, Admin. **Si Category dejara de depender de Marca** (no se cambió): type `brandId`, mocks, `getCategoriesByBrand`, unicidad create, `normalizeProducts`, AdminRubros (select marca), AdminProductos (rubros filtrados por marca), `Marca.tsx`, ruta anidada. Los filtros de `/buscar` **ya** listan rubros globales mezclados (casi hecho en UI, no en el modelo).

### Oferta / priceOffer
pricing.ts, search offerOnly, Home, Ofertas, cards, Admin precio oferta. Carrito **fuera** de esta matriz (usa priceList + discountRate).

### Auth
auth.ts, clientStore, Login, Header, AdminRoute, visibilidad de precios, favoritos, carrito, Mi Cuenta.

### Carrito
clientStore + ProductCard + Header + CartDrawer. Ficha y OfferProductCard **fuera**.

---

## “Casi hecho” (preciso)

- Filtro Marca en `/buscar` y `/ofertas` **existe** y filtra productos; **no** reduce checkboxes de Rubros.
- Admin Productos **tiene** select Rubro dependiente de Marca; la **tabla no muestra** el rubro.
- Form Admin **tiene** UI Oferta como precio; **no** tiene radio Sí/No ni rubro liquidación.
- Home **tiene** bloque Destacados; **no** tiene campo destacado.
- `BannerSlider` + Admin Banners **existen**; Home **no** los conecta.
- SearchBar **ya** hace ENTER → `/buscar?q=` (prod no).
- BrandGrid **ya** navega a `/marca/:id` (no hay índice `/marcas`).
- Login **ya** redirige a Mi Cuenta.
- CartDrawer **ya** tiene overlay, lock scroll y expandir full width; Finalizar no cierra el flujo.
- Mi Cuenta **ya** muestra descuento %; no tiene pedidos/listas/email.
