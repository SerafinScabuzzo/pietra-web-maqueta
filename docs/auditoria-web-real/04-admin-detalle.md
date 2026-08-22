# Admin — detalle (solo lectura)

Cifras del Dashboard al 22/08/2026: 2258 productos, 8 marcas, 47 rubros, 205 subrubros, 1 catálogo, 2 banners, 0 listas, 21688 clientes.

Sync visible: "Actualizado: Clientes … - Artículos … - Facturas …" (misma madrugada).  
Link **no clickeado**: "Eliminar Facturas de más de 4 meses" → `admin/scriptEliminarFacturasAnteriores.php?fin=…`

## Productos (`adminProductos.php`)

- Filtro superior: SIN CLASIFICAR | cada marca → `?idmarca=` (Pietra = 2)
- Buscar código + botón Buscar
- Columnas: Imagen · Título · Marca · Rubro y SubRubro · Código · Precio · Desc. · Acciones
- Acciones: Editar (`formModificarProducto.php?id=`) · Eliminar (`scriptEliminarProducto.php` — no usado)
- Sin botón "Nuevo producto" en la lista. El alta parece venir de la sync/importación.
- Desc. en listado muestra % (ej. 55%) — parece descuento de lista, no descripción.

### Form Editar Producto (inspección, sin guardar)

Solo lectura en pantalla: Título, Marca, Rubro, SubRubro (texto, no selects).

Editables observados:
- `orden` (number)
- `oferta` radio **Si / No**
- `destacado` radio **Si / No**
- `publicado` radio **Si / No**
- `copete` textarea (label "Descripción")
- Imagen principal + `foto02`…`foto05` (file JPG/PNG/GIF)

No se vieron en este form: SKU, precio, stock, select de marca/rubro/subrubro.

**Oferta en Admin:** existe flag `oferta` Si/No en el producto.  
**Además** existe el rubro/subrubro llamados OFERTA / LIQUIDACION. Ambos conviven. La página pública `/ofertas` listó 171 ítems; no se ejecutó una prueba que cruce el flag vs el rubro.

**Destacados:** flag `destacado` Si/No en el mismo form. No hay sección Admin "Destacados".

## Marcas (`adminMarcas.php`)

- Cards: logo, nombre, checkbox eliminar, Editar, Eliminar
- + Nueva Marca · Eliminar Seleccionadas (no usados)

Form editar:
- Marca (texto)
- IDMarca (number)
- Orden
- Logo 600×600
- Imagen escritorio 1600×300
- Imagen móviles 600×300

Sin campo "activo" aparte. Relación con productos por `idmarca`.

## Rubros (`adminRubros.php`)

- Cards con imagen de categoría (no logo de marca)
- + Nuevo Rubro · Eliminar Seleccionados

Form nuevo/editar:
- Rubro
- IDRubro
- Orden
- Publicado Si/No (solo en editar)
- Imagen JPG 800×600

**No hay select de Marca.** El rubro es un catálogo global. En el front se muestra bajo una marca si hay productos de esa marca en ese rubro (`/rubro/{marca}/{slug}`).

## SubRubros (`adminSubRubros.php`)

- Misma UI de cards
- Form nuevo/editar: SubRubro, IDSubRubro, Orden, Publicado, Imagen 800×600
- **No hay select de Rubro ni de Marca** en el formulario inspeccionado.

La jerarquía pública Subrubro⊂Rubro⊂Marca se arma en las URLs y en el producto (que sí trae Rubro y SubRubro como texto de sync). Las imágenes son de la entidad global.

## Ofertas (cómo las trata Admin)

Evidencia, no inferencia extra:
1. Radio `oferta` en el producto.
2. Rubro (y a veces subrubro) llamado OFERTA / LIQUIDACION, administrado como cualquier rubro.
3. Página `/ofertas` con filtros de marca y rubro.
4. Dashboard no tiene KPI "Ofertas".

Cómo se llena el flag desde el TXT diario: **NO VERIFICADO** (no hay pantalla de importación ejecutable; el Dashboard solo muestra horarios de actualización).

## Banners (`adminBanners.php`)

2 ítems, coinciden con el carrusel Home:
- Catálogo Pietra 2026 / Descubrí… / Ver Catálogo
- Herramientas para todos los usos / Conocé… (typo)

Form: Título, Subtítulo, Orden, PDF, Texto del botón, JPG escritorio 1600×300, JPG móviles 600×1000.

## Catálogos

1 ítem: CATALOGO PIETRA 2026, vigencia 11-06-2026, marca Pietra, Ver PDF, Editar/Eliminar.

Form: select Marca, Título, Vigencia, Orden, PDF, Imagen 800×600.

## Listas (`adminListas.php`)

Vacío (0). + Nueva Lista.

Form alta (no enviado): select Lista = OCF XLS · OCF PDF · MOTA XLS · MOTA PRODUCTOS · MOTA REPUESTOS · Que Cambio · Novedades; Vigencia; Orden; Archivo (`user_file`); Imagen JPG.

Esto es lo más cercano a "importación / archivo" visible. La sync de artículos/clientes/facturas del Dashboard parece automática y **no se encontró una pantalla "Ejecutar importación TXT"**.

## Clientes (`adminClientes.php`)

Columnas observadas en encabezado: CUIT · N° Cliente · Nombre · Email · Password · Desc.

No se transcriben filas. Captura no se guardó. No se editó nadie.

Relación con login: el form público usa `clientelogin` + `passwd`. En la cuenta de prueba, el campo etiquetado CUIT aceptó el **número de cliente**; en Mi Cuenta el CUIT y el N° son campos distintos. Detalle exacto del matching: NO VERIFICADO más allá de que el login funcionó.

## Pedidos (`adminPedidos.php`)

- Filtros: N° / Cliente-Nombre, fecha desde, fecha hasta
- Filas: fecha/hora + Total $ + a veces nombre
- No se abrió detalle ni se cambió estado
- Captura no se guardó (nombres de terceros)
