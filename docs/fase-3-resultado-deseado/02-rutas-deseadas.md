# Rutas deseadas (mapa conceptual)

Esto no fija nombres TypeScript ni obliga a crear rutas nuevas si una existente cubre el rol.

Se distinguen:

- **Ruta visible:** lo que el usuario entiende (ítem de menú, título, breadcrumb).
- **Ruta existente reutilizable:** lo que la maqueta ya tiene y puede cumplir ese rol.
- **Nombre de producción:** solo referencia. La maqueta no tiene que copiar `.php`.

---

## Principio

Hay **un solo catálogo central**.  
Visitante lo ve como **Productos**.  
Cliente lo ve como **Armar Pedido**.  
Misma lista, mismos filtros, mismos query params. Cambia el título, la card (precio/compra) y el layout (carrito).

La maqueta **ya tiene** `/buscar` y `/buscar?q=` con filtros en la URL. Eso es la base preferida. No se asume `/productos` ni `/armar-pedido` como nombres obligatorios.

---

## Mapa

| Rol visible | ¿Existe hoy? | Reutilizar | Resultado deseado | Notas |
|---|---|---|---|---|
| Inicio | Sí `/` | `/` | Home | **CONSERVAR** ruta |
| Productos (visitante) | Parcial `/buscar` | **`/buscar`** (+ `?q=` `?brand=` `?category=` `?offer=` `?sort=`) | Catálogo completo. Título “Productos” / “Resultados para…” | **ADAPTAR** rol. Nombre de URL: conservar `/buscar` si evita un segundo catálogo |
| Armar Pedido (cliente) | No como nombre | **La misma página que Productos** | Título “Armar Pedido”. Layout 3 columnas | No crear un segundo listado. Si hace falta un alias visible, es la misma lógica |
| Categorías (índice) | No | — | Página de **todos los rubros globales** | **CREAR** rol. Nombre conceptual: índice de rubros. No dropdown |
| Rubro (desde Categorías) | Distinto | `/marca/:brandId/rubro/:categoryId` **no sirve tal cual** (hoy lista productos y depende de marca) | Lista **subrubros** de ese rubro, sin marca en la cadena | **ADAPTAR** el concepto de “página rubro”; no reutilizar el listado actual de productos |
| Subrubro | No | — | No es un tercer catálogo. Navega al catálogo central con Rubro+Subrubro | **CREAR** eslabón / **ADAPTAR** destino = Productos o Armar Pedido + params |
| Marcas (índice) | No como ruta | `BrandGrid` (hoy en Home) | “Marcas con las que trabajamos” | **CREAR** ruta de índice. **ADAPTAR** componente |
| Ficha de marca con rubros | Sí `/marca/:brandId` | Solo si se vacía de rubros | Click marca **no** abre rubros. Abre catálogo `brand=X` | **RETIRAR/DEJAR DE USAR** el destino actual. `/marca/:id` puede ser alias al catálogo, no página de rubros |
| Catálogos | Sí `/catalogo` | `/catalogo` | Sigue | **CONSERVAR**. Label menú: Catálogos |
| Quiénes somos | Sí `/empresa` | `/empresa` | Mismo contenido, otro label | **ADAPTAR** label. Conservar ruta existente evite inventar `/quienes-somos` |
| Ingresar | Sí `/login` | `/login` | Sigue. Label campo Usuario | **CONSERVAR** ruta |
| Quiero ser cliente | Sí `/quiero-ser-cliente` | `/quiero-ser-cliente` | Solo visitante | **CONSERVAR** |
| Ofertas (cliente) | Sí `/ofertas` | `/ofertas` como **puerta**, no como segundo catálogo | Redirige o abre Armar Pedido con `offer=1` | **ADAPTAR** |
| Ofertas (visitante) | Sí `/ofertas` | No como vitrina paralela | No está en el menú. Home muestra ofertas. “Ver todas” → Productos `offer=1` | **ADAPTAR** / **RETIRAR/DEJAR DE USAR** como catálogo distinto |
| Ficha producto | Sí `/producto/:productId` | `/producto/:id` | Detalle. No hace falta slug de producción | **CONSERVAR** ruta maqueta |
| Favoritos | Sí `/favoritos` | `/favoritos` | Cliente | **CONSERVAR** |
| Mi Cuenta | Sí `/mi-cuenta` | `/mi-cuenta` | + CTA Armar Pedido | **CONSERVAR** + **CREAR** CTA |
| Revisar Pedido | No | `CartDrawer` expandido (parcial) | Pantalla completa = carrito expandido | **CREAR** rol. Puede ser ruta propia o estado a pantalla completa. No wizard |
| Admin * | Sí `/admin/...` | Las rutas actuales | Solo las que representen el cambio | Ver `10-admin-alcance.md` |
| `/secciones` | Prod sí | Maqueta no | No se crea | **RETIRAR/DEJAR DE USAR** |
| `/marca/:id/rubro/:id` como productos | Maqueta sí | No como catálogo | Deja de ser el listado de productos | **RETIRAR/DEJAR DE USAR** ese rol |

---

## Query params del catálogo central (conceptuales)

La maqueta ya usa params recargables en `/buscar`. Se **reutilizan** y se **amplían** conceptualmente:

| Param actual | Rol actual | Rol deseado |
|---|---|---|
| `q` | Texto nombre/SKU | Igual. ENTER del header lo setea |
| `brand` (repetible) | Marcas | Igual. Dependiente: reduce rubros/subrubros visibles |
| `category` (repetible) | Rubros | Igual, pero rubros **globales** (ya no “Herramientas de Pietra” vs “Herramientas de Mota” duplicados por `brandId`) |
| `offer=1` | Solo ofertas vía `priceOffer` | Solo ofertas vía **flag** Sí/No |
| `sort` | `name_asc` / `price_*` | Sort de usuario. Si está vacío: orden default Pietra (ver `06`) |
| — | No hay | Subrubro (repetible). Nombre de param: **no se fija** en Fase 3 |
| — | No hay paginación | Paginación **debe existir**. Nombre de param y cantidad por página: **no se fijan** |

---

## Destinos de entrada (resumen)

```
Menú Productos          → catálogo central (visitante)
Menú Armar Pedido       → catálogo central (cliente) + carrito columna
ENTER buscador          → mismo catálogo + q=
Click autocomplete      → ficha producto (como producción)
Click marca             → catálogo + brand=X
Click rubro             → página de subrubros (no productos)
Click subrubro          → catálogo + rubro + subrubro
Menú Ofertas (cliente)  → catálogo + offer=1
Home “Ver todas”        → catálogo + offer=1
CTA Mi Cuenta           → catálogo cliente (Armar Pedido)
```

---

## Lo que no se asume

- No se exige `/productos`, `/armar-pedido`, `/categorias`, `/marcas`, `/revisar-pedido` como strings finales.
- No se exige copiar `/articulo/{slug}`, `/ingreso`, `/catalogos-productos`.
- Sí se exige que **no** convivan dos catálogos distintos (uno en `/buscar` y otro en `/ofertas` o en `/marca/.../rubro/...`).
