# Rutas observadas — web real

Base: `https://pietraitaly.com.ar`

## Públicas
| Ruta | Pantalla |
|---|---|
| `/index_2026.php` | Home |
| `/secciones` | Mismo contenido que Home |
| `/marca/{slug}` | Marca + rubros |
| `/rubro/{marca}/{rubro}` | Subrubros de un rubro en una marca |
| `/subrubro/{marca}/{rubro}/{subrubro}` | Productos |
| `/articulo/{slug}` | Ficha |
| `/ofertas` | Ofertas + filtros |
| `/ofertas.php?idmarca=&pagina=N` | Paginación ofertas |
| `/catalogos-productos` | Listado catálogos |
| `/catalogos/8.pdf` | PDF catálogo Pietra |
| `/banners/1.pdf` | PDF del banner Home |
| `/empresa` | Institucional |
| `/quiero-ser-cliente` | Alta comercial (form mail) |
| `/ingreso` | Login / recupero |
| `/login2_2026.php` | POST login |
| `/recuperoPass_2026.php` | POST recupero |
| `/form2mailCliente.php` | POST quiero ser cliente |
| `/buscarDinamico.php` | POST sugerencias buscador |
| `/buscarDinamicoMov.php` | POST buscador móvil |

## Cliente
| Ruta | Pantalla |
|---|---|
| `/miCuenta_2026.php` · `/micuenta` | Mi Cuenta |
| `/miCuenta_pedidos.php` | Pedidos del cliente |
| `/miCuenta_comprobantes.php` | Facturas (no abierta) |
| `/favoritos` | Favoritos |
| `/agregarProductosCarrito.php` | POST agregar |
| `/vaciar-carrito` | Vaciar |
| `/enviar_pedido.php` | Finalizar — **no visitada** |
| `/scriptAgregarFavorito.php?codigo=` | Toggle favorito |
| `/logout_2026.php` | Cerrar sesión |

## Admin
| Ruta | Pantalla |
|---|---|
| `/admin.php` | Dashboard |
| `/adminProductos.php` · `?idmarca=` | Productos |
| `/formModificarProducto.php?id=` | Editar producto |
| `/scriptEliminarProducto.php` | Eliminar (no usado) |
| `/adminMarcas.php` | Marcas |
| `/formAgregarMarca.php` · `/formModificarMarca.php?idmarca=` | Alta/editar marca |
| `/adminRubros.php` | Rubros |
| `/formAgregarRubro.php` · `/formModificarRubro.php?idrubro=` | Alta/editar rubro |
| `/adminSubRubros.php` | Subrubros |
| `/formAgregarSubRubro.php` · `/formModificarSubRubro.php?idsubrubro=` | Alta/editar subrubro |
| `/adminCatalogos.php` | Catálogos |
| `/formAgregarCatalogo.php` · `/formModificarCatalogo.php?idcatalogo=` | Alta/editar |
| `/adminListas.php` | Listas |
| `/formAgregarLista.php` | Nueva lista (archivo) |
| `/adminBanners.php` | Banners |
| `/formAgregarBanner.php` · `/formModificarBanner.php?idbanner=` | Alta/editar |
| `/adminClientes.php` | Clientes |
| `/adminPedidos.php` | Pedidos |
| `/admin/scriptEliminarFacturasAnteriores.php` | Peligroso — no usado |
