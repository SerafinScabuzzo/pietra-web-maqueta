# Público — web real

## Home (`/index_2026.php`)

### Header
- Logo: `imagenes/logo_pietraitaly_top_2026.png` (aprox. 118×43) + texto "PietraItaly". Izquierda.
- Buscador: `input#busqueda.buscadorTop`, `name=busqueda`, placeholder "Buscar...", `maxlength=30`, `autocomplete=off`, `onkeyup=buscar()`. Form POST en la misma página.
- Menú (derecha): Secciones · Ofertas · Catálogos · Empresa · Ingresar · botón naranja **Quiero ser cliente**.
- Secciones es un `button.w3-button` que abre dropdown de marcas (clase `botosTop`) y también existe el link `/secciones`.
- Header blanco, sticky visualmente arriba. Sin carrito ni favoritos.

### Banner
- Carrusel (Splide / Jssor en scripts). Flechas naranjas izquierda/derecha.
- Slide 1: "Catálogo Pietra 2026" / "Descubrí nuestra colección de productos" / botón **Ver Catálogo** → `/banners/1.pdf`.
- Slide 2: "Herramientas para todos los usos" / "Conocé nuestro amplio stock de herramietas" (typo en el sitio).
- Indicadores de puntos: no se verificó con claridad en la captura.
- Click en CTA del slide 1 abre PDF, no una landing interna.

### Marcas
- Título: "Marcas con las que trabajamos" (púrpura).
- Grilla de cards blancas: logo + nombre.
- 8 marcas. Click → `/marca/{slug}`.
- F.V usa slug `f-v`. Solyon: `solyon-argentina-sa`.

### Productos Destacados / Ofertas (home)
- Carruseles de cards (flechas grises).
- Card pública: imagen, corazón (favorito, visible pero compra exige login), marca, título MAYÚSCULAS, SKU, **Ingresar para comprar** (azul o naranja según bloque), **Ver detalles**.
- Sin precio.
- Varias imágenes de Ofertas/home aparecen rotas (icono de imagen fallida).

### Footer
- Fondo gris oscuro. 3 columnas:
  - Contacto: `distcentro@yahoo.com.ar`, Av. del Rosario 154, Rosario, Santa Fe
  - Seguinos: Instagram, Facebook
  - Horarios: Lun 9–17; Mar–Vie 8–17; Sáb/Dom no trabajan
- Copyright © 2026 PietraItaly
- WhatsApp flotante: `5493415853899`

## Menú real (no asumir)

| Texto | Tipo | Destino |
|---|---|---|
| Logo | link | `/index_2026.php` |
| Secciones | dropdown + link | marcas `/marca/...` y `/secciones` |
| Ofertas | link | `/ofertas` |
| Catálogos | link | `/catalogos-productos` |
| Empresa | link | `/empresa` |
| Ingresar | link | `/ingreso` |
| Quiero ser cliente | botón naranja | `/quiero-ser-cliente` |

`/secciones` **no** lista rubros: replica Home.

## Navegación Marca → Rubro → Subrubro

Patrón de URLs:
- Marca: `/marca/{marca}`
- Rubro: `/rubro/{marca}/{rubro-slug}`
- Subrubro: `/subrubro/{marca}/{rubro-slug}/{subrubro-slug}`
- Artículo: `/articulo/{slug}`

Pietra `/marca/pietra`: hero del logo Pietra + grilla de rubros (imagen + nombre MAYÚSCULAS). Rubros observados incluyen, entre otros: ABRASIVOS Y DISCOS, ACCESORIOS SANITARIOS PLASTICO, AIRE CONEXIONES, ALBAÑILERIA, CANDADOS, CANILLAS PARA PATIO/LAVARROPAS, CEPILLOS, DISCOS DIAMANTADOS, DUCHAS…, FLEXIBLES…, GRIFERIA, HERRAMIENTAS DE MANO, **OFERTA / LIQUIDACION**, VALVULAS Y CONEXIONES, etc.

`/rubro/pietra/griferia`: breadcrumb Inicio / PIETRA / GRIFERIA. Cards de **subrubros** (no productos): GRIFERIAS 1 AGUA, PROLONGACIONES CROMADAS, REPUESTOS GRIFERIA. Selector "Cantidad de resultados por página: 20".

`/subrubro/.../griferias-1-agua`: breadcrumb de 4 niveles. Grilla de productos. Cards públicas sin precio.

Mota: misma cadena `/marca/mota` → `/rubro/mota/{slug}`. También tiene `oferta-liquidacion`.

## Imágenes de rubro / subrubro

- Cada card de rubro/subrubro tiene una foto propia (no el logo de marca).
- El Admin edita **una imagen por rubro/subrubro**, sin campo Marca. La misma entidad visual se reutiliza cuando esa categoría aparece bajo otra marca.
- Tamaño pedido en Admin: 800×600 JPG.
- En Home/Ofertas muchas fotos de producto no cargan; en grifería las de producto sí se vieron.

## Ofertas sin login (`/ofertas`)

- Título "Ofertas". Breadcrumb Inicio / Ofertas.
- Banner: "171 productos en oferta disponibles".
- Filtros izquierdos: checkboxes **Marcas** (`idmarca[]`) y **Rubros** (`idrubro[]`). Entre los rubros aparece **OFERTA / LIQUIDACION**.
- Paginación: `ofertas.php?idmarca=&pagina=N` (al menos 9 páginas). Select 10/20/50/100.
- Cards con borde naranja. Corazón. Sin precio. "Ingresar para comprar" → `/ingreso`. "Ver detalles" → `/articulo/...`.
- Corazón público: el destino de compra sigue siendo login. No se verificó si el corazón persiste sin sesión.

## Catálogos

- `/catalogos-productos`
- Un catálogo: "CATALOGO PIETRA 2026", PDF `/catalogos/8.pdf`.
- El banner de Home usa otro PDF: `/banners/1.pdf`.

## Empresa (`/empresa`)

- H1 Empresa. Sobre nosotros (mayorista ferretería/sanitarios). Contacto. Horarios.
- Typos en el texto del sitio: "Trabajammos", "117:00", "Dommingo".

## Quiero ser cliente

- H1 "Quiero ser Cliente".
- Texto: "Complete los siguientes datos y en breve nos comunicaremos con Ud."
- Form POST `form2mailCliente.php` (no se envió):
  - Nombre (`Nombre`) *
  - Firma comercial (`FirmaComercial`) *
  - Email *
  - Teléfono *
  - Localidad (`Ciudad`) *
  - Mensaje/observaciones (`Mensaje`) *
  - ENVIAR
- No es solo WhatsApp. WhatsApp sigue flotando.

## Login (antes de ingresar)

- H1 "Acceso Clientes"
- Texto: "Solo clientes existentes. No se crean cuentas desde la web."
- Labels visibles: CUIT, Contraseña
- Form `#formLogueo` POST `login2_2026.php`: `clientelogin`, `passwd`, submit `INGRESAR`
- "Olvidé mi contraseña" abre `#formRecupero` POST `recuperoPass_2026.php` (`cuitRecupero`)
- No hay botón demo admin/cliente

## Buscador

- AJAX POST `buscarDinamico.php` con `valorBusqueda` → `#resultadoBusqueda`
- Móvil: `buscarDinamicoMov.php` / `#resultadoBusquedaMov`
- Sugerencias al tipear. "canilla" también listó ítems no canilla (p. ej. candados).
- ENTER **no** navega a una página de resultados; permanece en la URL actual.
- Click en sugerencia → `/articulo/{slug}`
- SKU exacto funciona vía sugerencia.
