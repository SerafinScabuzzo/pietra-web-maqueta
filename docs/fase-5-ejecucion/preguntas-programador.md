# Preguntas técnicas para el programador

Solo lo que el frontend de la maqueta **no puede** resolver. Las decisiones de navegación, layout y copy ya están tomadas.

---

### Oferta

En producción el producto ya tiene (o parece tener) un flag Oferta Sí/No. El archivo de sync pasaría a traer `1/0`.

¿La sincronización diaria puede escribir **directamente** ese campo, sin inferir oferta por precio ni por un rubro llamado OFERTA/LIQUIDACIÓN?

---

### Destacado

¿Existe hoy un campo Destacado (o equivalente) que podamos usar en Home, en lugar de “los primeros N productos”?

---

### Rubro / Subrubro / Marca

Queremos: el producto tiene Marca + Rubro + Subrubro; el rubro es **global** (no “rubro de Pietra”).

¿Esa terna ya viene en el producto sincronizado?  
¿Hay tablas o menús que todavía listen rubros **por marca** y habría que dejar de usarlos en la navegación pública?

---

### Confirmación de pedido

En la maqueta, Revisar Pedido es el carrito expandido y Confirmar es un mock.

¿Qué endpoint o flujo actual hay que mantener al confirmar (p. ej. `enviar_pedido.php`)?  
¿Hace falta algún dato extra además de las líneas (SKU, cantidad) o el servidor ya toma cliente + carrito de sesión?

No queremos agregar en esta etapa envío, pago ni observaciones si hoy no forman parte de ese envío.

---

### Login “Usuario”

El label visible pasa de CUIT a Usuario. ¿El valor que valida el backend sigue siendo CUIT, número de cliente, o ambos?

---

### Stock (opcional)

En la maqueta no hay stock. Si en producción el carrito respeta stock, ¿hay que mostrarlo en Armar Pedido o alcanza con el control al confirmar?
