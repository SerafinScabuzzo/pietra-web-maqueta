# No verificado

- Qué ocurre al pulsar **Finalizar Compra** / abrir `enviar_pedido.php` (riesgo de crear pedido; no se navegó).
- Si Agregar al carrito con cantidad 0 hace algo.
- Si el corazón público persiste o solo redirige.
- Si `scriptAgregarFavorito.php` alterna o solo agrega; no se modificó un favorito existente.
- Contenido de `miCuenta_comprobantes.php`.
- Detalle de un pedido Admin (nombres de terceros; no se abrió).
- Cómo el TXT/sync diaria setea `oferta`, `destacado`, precios y stock. No hay botón "Importar" visible; solo timestamps en Dashboard.
- Si Listas (XLS/PDF) alimenta precios o es solo descarga para clientes.
- Relación exacta login: el label dice CUIT pero la prueba usó N° de cliente en ese campo. Matching interno no inspeccionado en código.
- Stock: no apareció campo stock en el form de producto.
- Indicadores/dots del carrusel Home y autoplay.
- Hover de todos los botones (se vio el sistema, no cada estado).
- Comportamiento mobile real (solo hay buscador `#busquedaMov` y banners 600×300 / 600×1000 en forms).
- Si rubro y subrubro tienen tabla de relación oculta pese a que el form no muestra padre.
- Si "Desc." de la tabla productos es descuento de lista del artículo o el del cliente.
- Submit de recupero de contraseña (no se envió).
- Click en "Consultar Disponibilidad" (público).
- Paginación de Admin productos más allá de la primera marca filtrada.

Regla aplicada: si una acción podía escribir producción, no se ejecutó.
