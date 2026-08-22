# Riesgos y regresiones

---

## Riesgos principales (proyecto)

| # | Riesgo | Nivel | Por qué | Mitigación |
|---|---|---|---|---|
| 1 | Romper el modelo a mitad de camino | ALTO | `Category.brandId` atraviesa store, Admin, Marca, filtros | Etapa 1 atómica + remap + `getCategoriesByBrand` derivado de productos |
| 2 | Dos catálogos conviven | ALTO | `/ofertas`, `/marca/.../rubro`, `/buscar` | Redirects Etapa 2–3; un solo `Buscar.tsx` |
| 3 | Filtros fantasma → 0 resultados | ALTO | Hoy Marca no reduce Rubros | `syncDependentParams` único (`06`) |
| 4 | Overlay en Armar Pedido | ALTO | `CartDrawer` lockea body | `variant="column"`; Header overlay muere en E6 (misma tanda; E5 no navega a Revisar) |
| 4b | 404 en `checkpoint-carrito` | ALTO | Cablear `/revisar-pedido` en E5 | E5 CTA inerte/visual; E6 crea la ruta |
| 5 | Header 404 | MEDIO | Menús nuevos antes que páginas | Categorías/Marcas (E3) **antes** de Header (E4) |
| 6 | Home hero vacío | MEDIO | JPG banners ausentes | Seed imagen existente (E0/E1) |
| 7 | localStorage productos viejos | MEDIO | `pietra_admin_store` rehidrata products | `normalizeProducts` remap + flags |
| 8 | tsc al abrir AdminProductos | MEDIO | 4 errores en un archivo | Arreglar A **dentro** de E8 |
| 9 | Confirmación “de más” | BAJO | Tentación de store pedidos | Prohibido; éxito + vaciar |
| 10 | Mobile Armar Pedido | BAJO si se respeta FOA | Tres columnas en chico | No implementar; conservar `lg:` |

---

## Mapeo 8 imágenes aprobadas → etapas

En este workspace **no hay archivos de imagen IA**. El layout de lo nuevo lo fija el texto de Fase 3. Si se adjuntan capturas, valen para **columnas y jerarquía**, no para paleta/header/footer.

| # | Pantalla | Etapa | Componentes | Requisito de la imagen (layout) | Sigue tomando producción / maqueta actual |
|---|---|---|---|---|---|
| 1 | Home visitante | 4 | `Home`, `BannerSlider`, `ProductCard`, `Header`, `Footer` | Banners; sin marcas; destacados + ofertas **visibles**; “Ver todas” = aviso | Identidad, cards, header, footer, texto login de card |
| 2 | Categorías | 3 | `Categorias`, cards 4:3 | Grilla rubros globales | Estilo card de `Marca.tsx`, colores sitio |
| 3 | Rubro → Subrubros | 3 | `CategoriaRubro` | Grilla subrubros, no productos | Card categoría prod, breadcrumb sin marca |
| 4 | Marcas | 3 | `Marcas`, `BrandGrid` | Título + grilla logos | `BrandGrid` actual (mudado) |
| 5 | Productos | 2 | `Buscar`, `SearchFilters`, chips, `ProductCard` | Filtros izq + grilla + paginación | Cards prod, sidebar maqueta |
| 6 | Mi Cuenta | 7 | `MiCuenta` | CTA Armar Pedido | Datos/descuento maqueta |
| 7 | Armar Pedido | 5 | `Buscar` + `CartDrawer` column | 3 columnas, carrito abierto | Cards, filtros, totales drawer |
| 8 | Revisar Pedido | 6 | `RevisarPedido` | Tabla completa campos listados | Totales/descuento drawer; no checkout |

---

## Checklist de regresión (usar tras cada etapa **importante**: 1, 2, 4, 5, 6, 8, y siempre en Etapa 9)

### Público

- [ ] Home abre
- [ ] Header: ítems del estado actual de la etapa (tras E4: menú nuevo)
- [ ] Buscador visible; ENTER → `/buscar`
- [ ] Catálogos `/catalogo`
- [ ] Institucional `/empresa`
- [ ] Productos `/buscar` (tras E2)
- [ ] Categorías / Marcas (tras E3; menú tras E4)
- [ ] Precios **ocultos**
- [ ] No se puede agregar al carrito

### Cliente

- [ ] Login demo → Mi Cuenta
- [ ] Armar Pedido (título en `/buscar`)
- [ ] Precios visibles
- [ ] Cantidad + agregar + ✓ Agregado
- [ ] Favoritos
- [ ] Carrito (columna tras E5, **sin** 404; Header → Revisar tras E6)
- [ ] Ofertas menú solo cliente → `offer=1`; visitante Home “Ver todas” = aviso
- [ ] Revisar Pedido (tras E6)
- [ ] Logout → Home pública; sin CTA “Quiero ser cliente”

### Admin mínimo

- [ ] Abre `/admin`
- [ ] Productos (tras E8: flags y rubro global)
- [ ] Rubros (sin marca)
- [ ] Banners (Home consume)

---

## Qué no es regresión (no “arreglar”)

- 8 marcas **visuales** vs catálogo real (sí hay que mostrar las 8; no 2258 SKUs)
- ~35 productos vs 2258
- 9 rubros demo vs 47 / subrubros mínimos vs 205
- Footer 2024 / redes de la maqueta vs prod (no es etapa)
- Doble chrome Admin
- `require` del form si se usan botones demo
- Cantidad default 1 vs 0 de prod
- Corazón ausente en público
