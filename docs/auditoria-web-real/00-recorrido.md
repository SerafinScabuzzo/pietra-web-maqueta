# Recorrido de auditoría — web real

Sitio: `https://pietraitaly.com.ar/` (entrada usada: `index_2026.php`)  
Fecha: 22/08/2026  
Modo: solo lectura. No se guardó, eliminó, importó ni confirmó nada en producción.

---

## [PUBLICO]

Home `index_2026.php`
→ Header (logo, buscador, menú, CTA)
→ Banner / carrusel (2 slides)
→ Marcas con las que trabajamos
→ Productos Destacados
→ Ofertas
→ Footer + WhatsApp flotante

Observaciones:
- Título de documento: "Pietra".
- Fondo `rgb(220, 234, 253)`, tipografía Barlow.
- Precios no visibles. Cards dicen "Ingresar para comprar".

Menú
→ Secciones (botón dropdown de marcas + link `/secciones`)
→ `/secciones` muestra el mismo contenido que Home (no es una grilla de rubros).

Marcas del dropdown / grilla:
PIETRA, MOTA, PRIVE, RAO, F.V, TRAMONTINA, INGCO, SOLYON ARGENTINA SA

Pietra (caso principal)
→ `/marca/pietra` (hero + grilla de rubros)
→ `/rubro/pietra/griferia`
→ `/subrubro/pietra/griferia/griferias-1-agua`
→ producto de listado (cards)
→ `/articulo/canilla-col-c-cono-giratorio-2854` (ficha; el artículo auditado estaba clasificado como OFERTA/LIQUIDACION)

Mota (recorrido corto)
→ `/marca/mota`
→ misma estructura de rubros (`/rubro/mota/{slug}`), incluye `oferta-liquidacion`

También:
→ `/rubro/pietra/oferta-liquidacion`
→ `/ofertas` (171 productos, filtros Marca + Rubro, paginación)
→ `/catalogos-productos` (CATALOGO PIETRA 2026 → `/catalogos/8.pdf`)
→ `/empresa`
→ `/quiero-ser-cliente` (formulario; no enviado)
→ `/ingreso` (formulario; sin login en esta parte)

Buscador
→ escribir "canilla" → sugerencias AJAX (`buscarDinamico.php`)
→ ENTER no cambia de URL
→ SKU `G8221V` → sugerencia al artículo correspondiente

---

## [CLIENTE]

Login `/ingreso` → POST `login2_2026.php`
→ redirección a `miCuenta_2026.php`

Header cambia:
Favoritos · Carrito N · Mi Cuenta · Salir  
(desaparecen Ingresar y Quiero ser cliente)

Recorrido:
→ Mi Cuenta (`miCuenta_2026.php`)
→ Home logueado (`index_2026.php`)
→ Ofertas logueada
→ Ficha artículo logueada
→ Subrubro GRIFERIAS 1 AGUA (cards con precio + cantidad + Agregar)
→ Favoritos `/favoritos`
→ Pedidos `miCuenta_pedidos.php` (solo listado)

Carrito
→ cantidad 1 en primer producto del subrubro + Agregar
→ header pasó a "Carrito 1"
→ POST `agregarProductosCarrito.php`
→ Finalizar Compra apunta a `enviar_pedido.php` — NO se abrió
→ carrito vaciado con `/vaciar-carrito`

Favoritos
→ observado corazón en cards y `scriptAgregarFavorito.php?codigo=SKU`
→ no se cambió el estado persistente (un producto ya aparecía marcado en Ofertas)

Logout `logout_2026.php` → Home pública

---

## [ADMIN]

Login `/ingreso` (mismo formulario) → `admin.php`

Inventario del sidebar (en este orden):
Dashboard · Productos · Marcas · Rubros · SubRubros · Catálogos · Listas · Banners · Clientes · Pedidos

Recorridas todas las listas:
`admin.php`, `adminProductos.php` (+ filtro `?idmarca=2`), `adminMarcas.php`, `adminRubros.php`, `adminSubRubros.php`, `adminCatalogos.php`, `adminListas.php`, `adminBanners.php`, `adminClientes.php`, `adminPedidos.php`

Formularios abiertos solo GET, sin Submit:
- `formModificarProducto.php?id=358`
- `formModificarMarca.php?idmarca=2`
- `formAgregarRubro.php` / `formModificarRubro.php?idrubro=182`
- `formAgregarSubRubro.php` / `formModificarSubRubro.php?idsubrubro=803`
- `formModificarCatalogo.php?idcatalogo=8`
- `formAgregarLista.php`
- `formModificarBanner.php?idbanner=1`

NO se tocó:
- `scriptEliminarFacturasAnteriores.php`
- `scriptEliminarProducto.php`
- Eliminar / Guardar / Importar / Confirmar

Logout `logout_2026.php` → Home pública
