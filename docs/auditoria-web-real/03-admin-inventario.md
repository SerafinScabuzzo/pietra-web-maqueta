# Admin — inventario de menú

Landing post-login: `https://pietraitaly.com.ar/admin.php`

Header del sitio se mantiene. En lugar de Ingresar: **Admin** + **Salir**.

Sidebar (orden real):

| Orden | Sección | Ruta | Submenús | Descripción rápida |
|---|---|---|---|---|
| 1 | Dashboard | `/admin.php` | — | KPIs + fecha de sync + link peligroso de facturas |
| 2 | Productos | `/adminProductos.php` | filtro `?idmarca=` | Listado por marca / buscar código |
| 3 | Marcas | `/adminMarcas.php` | + Nueva / Editar / Eliminar | Cards de logo |
| 4 | Rubros | `/adminRubros.php` | + Nuevo / Editar / Eliminar | Cards con imagen; rubro independiente de marca |
| 5 | SubRubros | `/adminSubRubros.php` | + Nuevo / Editar / Eliminar | Cards con imagen; sin select de rubro padre en el form |
| 6 | Catálogos | `/adminCatalogos.php` | + Nuevo / Editar | 1 catálogo Pietra 2026 |
| 7 | Listas | `/adminListas.php` | + Nueva Lista | Vacío (0). Alta con archivo (XLS/PDF) |
| 8 | Banners | `/adminBanners.php` | + Nuevo / Editar | 2 banners del home |
| 9 | Clientes | `/adminClientes.php` | — | Tabla masiva. No se documentan filas |
| 10 | Pedidos | `/adminPedidos.php` | filtros fecha | Listado. No se cambió estado |

Header público también visible dentro de Admin (Secciones, Ofertas, etc.).

No apareció un ítem de menú llamado "Ofertas", "Destacados", "Usuarios", "Importación" o "TXT". Oferta y Destacado viven **dentro del producto**. La sync se ve en el Dashboard. Listas parece el módulo de archivos descargables / listas de precios.
