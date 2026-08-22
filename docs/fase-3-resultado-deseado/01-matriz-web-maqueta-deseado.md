# Matriz — Web real | Maqueta | Resultado deseado | Decisión

Leyenda de decisión: **CONSERVAR | ADAPTAR | CREAR | RETIRAR/DEJAR DE USAR | FUERA DE ALCANCE**.

Regla: una diferencia contra producción **no** es automáticamente un arreglo. Solo entra si hace falta para la demo o si fue pedido.

---

| Área | Web real (Fase 1) | Maqueta (Fase 2) | Resultado deseado | Decisión |
|---|---|---|---|---|
| Identidad visual | Fondo `rgb(220,234,253)`, Barlow, azul/púrpura, naranja CTA, footer oscuro | Tailwind sky/blue/indigo, brandBlue/Orange; sin Barlow | Misma identidad de producción. No rediseñar. No copiar paleta de imágenes IA | **CONSERVAR** (web real) / **ADAPTAR** maqueta hacia esa identidad solo si hace falta verse “Pietra” |
| Header — estética | Blanco, logo + wordmark, buscador central, links + 1 CTA naranja | Sticky translúcido, misma estructura general | Estética de producción. No rediseñar el header | **CONSERVAR** |
| Header — menú público | Secciones, Ofertas, Catálogos, Empresa, Ingresar, Quiero ser cliente | Secciones (dropdown marcas), Ofertas, Catálogo, Empresa, Ingresar, CTA siempre | Inicio, Productos, Categorías, Marcas, Catálogos, Quiénes somos, Ingresar, Quiero ser cliente | **ADAPTAR** |
| Header — menú cliente | + Favoritos, Carrito, Mi Cuenta, Salir; oculta Ingresar y CTA | + Favoritos, Carrito, Mi cuenta, Salir; CTA **sigue** | Inicio, Armar Pedido, Categorías, Marcas, Ofertas, Favoritos, Catálogos, Mi Cuenta, Salir. Sin CTA | **ADAPTAR** |
| Ítem “Secciones” | Dropdown de marcas + `/secciones` (= Home) | Dropdown de 3 marcas; no hay `/secciones` | Desaparece | **RETIRAR/DEJAR DE USAR** |
| Ítem “Empresa” | `/empresa` | `/empresa` | Mismo contenido; label **Quiénes somos** | **ADAPTAR** |
| Ítem “Catálogo(s)” | “Catálogos” | “Catálogo” singular | “Catálogos” (producción) | **ADAPTAR** (label) / **CONSERVAR** (página) |
| Ítem Productos / Armar Pedido | No existe catálogo único | Extra: CTA Home → `/buscar` | Visitante: Productos. Cliente: Armar Pedido. Una lógica | **CREAR** (ítem de menú y rol) / **ADAPTAR** (`/buscar`) |
| Ítem Categorías | No hay página de rubros globales | No hay | Página, no dropdown | **CREAR** |
| Ítem Marcas (menú) | Solo vía Secciones / bloque Home | Solo dropdown + Home | Página de menú | **CREAR** |
| Ítem Ofertas en menú público | Sí | Sí | No está en el menú público pedido | **RETIRAR/DEJAR DE USAR** del menú público (el bloque Home de ofertas se **CONSERVA**) |
| Ítem Ofertas en menú cliente | Sí (vitrina) | Sí (vitrina) | Puerta a Armar Pedido con Solo Ofertas=on | **ADAPTAR** |
| Logo / Home link | → Home | → `/` | Sigue yendo a Inicio | **CONSERVAR** |
| Buscador — autocomplete | AJAX `buscarDinamico.php`; click → artículo | No hay | Conservar autocomplete de producción | **CREAR** en maqueta (ausente) / **CONSERVAR** comportamiento prod |
| Buscador — ENTER | No cambia URL | → `/buscar?q=` | Sin login → Productos `q=`. Con login → Armar Pedido `q=` | **ADAPTAR** destino / **CONSERVAR** mecanismo ENTER de la maqueta |
| Home — banners | 2 slides Admin, protagonistas, flechas naranjas | `CatalogCarousel` (catálogos); `BannerSlider` no usado | Banners más protagonismo; fuente = Admin Banners. Una arquitectura | **ADAPTAR** Home / **CONSERVAR** Admin Banners / **RETIRAR/DEJAR DE USAR** catálogo como hero |
| Home — marcas | Grilla 8 marcas | `BrandGrid` 3 marcas | Fuera del Home. Vive en página Marcas | **RETIRAR/DEJAR DE USAR** del Home / **ADAPTAR** `BrandGrid` a página Marcas |
| Home — destacados | Flag `destacado` + carrusel | `products.slice(0, 6)` | Home usa flag Destacado Sí/No | **ADAPTAR** |
| Home — ofertas | Carrusel recortado; cards sin precio | Grilla 6 + “Ver todas” | Se conserva el bloque. Comprar → indicar login (texto existente de card, no modal inventado). “Ver todas” → Productos con Solo Ofertas=on | **CONSERVAR** bloque / **ADAPTAR** destino “Ver todas” |
| Home — “Todos nuestros productos” | No existe | CTA extra → `/buscar` | No se pidió; Productos ya estará en el menú | **RETIRAR/DEJAR DE USAR** |
| Footer | Contacto, IG+FB, horarios, ©2026, WhatsApp flotante | Contacto, IG+LinkTree+TikTok, ©2024, sin WhatsApp | Footer de producción (identidad). No copiar footer de IA | **CONSERVAR** (web real) |
| Página `/secciones` | Replica Home | No existe | No vuelve | **RETIRAR/DEJAR DE USAR** |
| Cadena Marca→Rubro→Subrubro | `/marca` → `/rubro` (subrubros) → `/subrubro` (productos) | Marca → Rubro (productos). Subrubro ausente | Dos vías: Categorías (Rubro→Subrubro→Productos) y Marcas (Marca→Productos). Marca sale de la cadena de categorías | **ADAPTAR** + **CREAR** Subrubro |
| Página Marca | Hero + grilla de **rubros** de esa marca | Hero + rubros con `brandId` | Click marca → Productos/Armar Pedido filtrado Marca=X. No Pietra→Rubros | **ADAPTAR** destino / **RETIRAR/DEJAR DE USAR** grilla de rubros bajo marca |
| Página Rubro | Lista **subrubros** | Lista **productos** | Lista subrubros del rubro (vía Categorías). No productos | **ADAPTAR** |
| Página Subrubro | Lista productos | No existe | Click subrubro → catálogo central con filtro (no otro catálogo) | **CREAR** el eslabón / **ADAPTAR** navegación hacia Productos/Armar Pedido |
| Catálogo central / Productos | No existe | `/buscar` = todos + filtros, sin paginación | Página central de todos los productos. Layout filtros izq + grilla + sort + paginación | **ADAPTAR** `/buscar` / **CREAR** paginación y rol de menú |
| Armar Pedido | No existe como pantalla | No existe | Misma lógica que Productos + precio, qty, agregar, favoritos, detalle, carrito abierto | **CREAR** (estado) / **ADAPTAR** catálogo |
| Orden default | No hay catálogo único; listados por subrubro | Sin sort: orden del mock (Pietra primero por array, no alfabético interno) | 1) Pietra primero 2) Pietra alfabético 3) resto. Sort del usuario pisa el default | **CREAR** regla (documentada; no implementar en esta fase) |
| Paginación | Ofertas y rubro/subrubro; select 10/20/50/100 | No hay | Debe existir. Cantidad por página: no fijada | **CREAR** |
| Filtros — set | Ofertas: Marca + Rubro (incluye rubro liquidación) | Marca + Rubro + Solo ofertas; rubros no se reducen | Solo: Ofertas, Marcas, Rubros, Subrubros. Dependientes. Acumulativos. Scroll interno | **ADAPTAR** + **CREAR** Subrubros |
| Chips de filtros | No observados | `ActiveFiltersChips` (marca, rubro, oferta, sort) | Reutilizar para las 4 dimensiones activas | **ADAPTAR** |
| Oferta — dato | Radio Sí/No + rubro OFERTA/LIQUIDACION + `/ofertas` | `priceOffer < priceList` | Flag Sí/No independiente. El producto conserva Marca/Rubro/Subrubro. TXT `;1/;0` = concepto mock, no importación | **ADAPTAR** (flag) / **RETIRAR/DEJAR DE USAR** rubro liquidación como mecanismo |
| Oferta — Admin módulo | No hay menú Ofertas; vive en el producto | Tampoco | No crear módulo Admin Ofertas | **FUERA DE ALCANCE** (módulo) / **CONSERVAR** flag en producto |
| Página `/ofertas` visitante | Vitrina 171 ítems | Vitrina 7 ítems, `OfferProductCard` | No está en menú público. Home puede mostrar ofertas. No segundo catálogo | **ADAPTAR** a alias/puerta o dejar de usarla como vitrina paralela |
| Página `/ofertas` cliente | Misma vitrina + compra | Vitrina sin agregar en `OfferProductCard` | Puerta a Armar Pedido con Solo Ofertas=on | **ADAPTAR** |
| Destacado | Radio Sí/No; Home lo usa | No modelado; primeros 6 | Flag conceptual; Home lo usa | **CREAR** (campo) / **ADAPTAR** Home |
| Product card | Público: corazón, sin precio, Ingresar, Ver detalles. Cliente: precio, qty 0, Agregar. Ofertas: borde naranja | ProductCard (qty 1, corazón solo cliente, flash ✓ Agregado). OfferProductCard sin compra | No rediseñar. Estilo/comportamiento de producción. Adaptar solo lo necesario. Conservar “ya agregado” | **CONSERVAR** + **ADAPTAR** mínimo |
| Precios sin login | Ocultos | Ocultos | Siguen ocultos. No comprar | **CONSERVAR** |
| Ficha artículo | `/articulo/{slug}`; cliente agrega | `/producto/:id`; botones inertes; no agrega | Conservar ficha. Cliente puede ver detalle y operar como en producción (precio, qty, agregar, favorito) | **CONSERVAR** (rol) / **ADAPTAR** maqueta para que no contradiga Armar Pedido |
| Carrito — UI | `.carritoTop` header; Finalizar → `enviar_pedido.php` (no visitado) | Drawer overlay + expandir; Finalizar inerte | En Armar Pedido: columna derecha abierta por default, minimizable, sin overlay. Revisar Pedido = pantalla completa | **ADAPTAR** / **CREAR** Revisar Pedido |
| Carrito — header fuera de Armar Pedido | Siempre visible logueado | Drawer desde header | Definición posterior | **FUERA DE ALCANCE** (por ahora) |
| Revisar Pedido | No verificado (`enviar_pedido.php`) | No existe | Foto, producto, SKU, precio, qty editable, subtotal, eliminar, #productos, #unidades, total, volver, confirmar. Sin wizard | **CREAR** |
| Checkout / envío / pago / observaciones | No observado | No existe | No entra | **FUERA DE ALCANCE** |
| Mi Cuenta | Pedidos, facturas, email, listas, descuento. Sin CTA Armar Pedido | Datos + descuento + código. Sin CTA | Conservar la cuenta de demo + CTA grande ¿Querés hacer un pedido? → Armar Pedido. Pedidos/facturas/listas de prod | **CONSERVAR** + **CREAR** CTA / **FUERA DE ALCANCE** extras de prod |
| Login — label | CUIT | CUIT | Label visual **Usuario**. Estructura interna no se cambia ahora | **ADAPTAR** (label) |
| Login — flujo | Un form; post-login Mi Cuenta; recupero | Form + botones demo; post-login `/mi-cuenta`; sin recupero | Conservar destino Mi Cuenta y modo demo de maqueta. Recupero | **CONSERVAR** flujo / **FUERA DE ALCANCE** recupero |
| Favoritos | `/favoritos`; corazón también público | `/favoritos`; corazón solo cliente | Conservar favoritos de cliente. Corazón público de prod: no pedido | **CONSERVAR** (cliente) / **FUERA DE ALCANCE** (corazón visitante) |
| Catálogos | 1 PDF 2026 | 1 PDF Drive 2025 + filtros extra | Conservar página. Año/PDF exactos no son el pedido | **CONSERVAR** / **FUERA DE ALCANCE** paridad de archivo |
| Quiero ser cliente | Form mail | Solo WhatsApp | Conservar como está en maqueta o prod; no se pidió rediseñar | **CONSERVAR** / **FUERA DE ALCANCE** unificar canal |
| Rubros — modelo | Globales; Admin sin Marca | `Category.brandId` | Rubros globales. Adaptación estructural necesaria | **ADAPTAR** |
| Subrubros | 205; Admin propio | No modelados | Concepto en mocks para demo. Nivel Admin suficiente, no réplica total | **CREAR** (concepto/demo) |
| Imágenes rubro/subrubro | Foto propia 800×600, no logo de marca | Unsplash en rubros | Genéricas, no de una marca | **ADAPTAR** |
| Admin — objetivo | Sistema completo sync | Subconjunto mock + doble chrome | No replicar todo. No contradecir gravemente. Representar cambios de administración | **ADAPTAR** lo necesario / **FUERA DE ALCANCE** el resto |
| Admin Productos — flags demo | Oferta, Destacado, Publicado, Orden, copete, fotos | Precios, marca, rubro; UI ean/shortDescription rotos | Flags que afectan demo: Oferta, Destacado, Marca, Rubro, Subrubro, nombre, SKU, precios, imagen. Publicado/Orden/copete/EAN | **ADAPTAR** flags demo / **FUERA DE ALCANCE** el resto |
| Admin Rubros | Globales | Atados a marca | Deben ser globales | **ADAPTAR** |
| Admin SubRubros | Sí | No | Nivel suficiente para la demo (asignar/listar), no implementar en Fase 3 | **CREAR** (alcance futuro mínimo) |
| Admin Pedidos / Listas | Sí | No | No demuestran los cambios de la reunión | **FUERA DE ALCANCE** |
| Admin Banners | 2, alimentan Home | CRUD; Home no los usa | Misma arquitectura: Admin → Home | **ADAPTAR** (conectar) / **CONSERVAR** módulo |
| Admin Clientes | Miles, sync | 2 mocks | 2 mocks alcanzan para la demo | **FUERA DE ALCANCE** paridad |
| Admin visual / chrome doble | Header sitio + sidebar | Header sitio + Admin Panel + Footer | No igualar look Admin | **FUERA DE ALCANCE** |
| Responsive general | Existe buscador móvil y banners mobile | Breakpoints `md:` / hamburguesa | Desktop es prioridad. No destruir responsive | **CONSERVAR** (no romper) |
| Armar Pedido mobile | N/A | N/A | Definición posterior | **FUERA DE ALCANCE** (Fase 3) |
| Errores tsc / eslint / `require` login | N/A | Documentados Fase 2 | No se corrigen en Fase 3 | **FUERA DE ALCANCE** |
| Cantidad de marcas/productos | 8 / 2258 | 3 / 30 | Volumen mock suficiente para demo | **FUERA DE ALCANCE** |

---

## Cómo leer la matriz

- **CONSERVAR** no significa “copiar el PHP”. Significa: la maqueta final no debe cambiar esa pieza salvo lo pedido.
- **ADAPTAR** significa: la pieza ya existe (web o maqueta) y cambia de contrato, destino o dato.
- **CREAR** significa: hace falta una pieza o un rol que hoy no cubre el pedido.
- **RETIRAR/DEJAR DE USAR** significa: deja de ser camino o bloque de la demo final (no es orden de borrar archivos).
- **FUERA DE ALCANCE** significa: se puede quedar distinto a producción y no es un pendiente de esta maqueta.
