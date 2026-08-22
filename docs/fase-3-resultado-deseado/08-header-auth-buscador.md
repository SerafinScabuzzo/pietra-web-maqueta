# Header, auth y buscador — resultado deseado

No rediseñar el header. Cambiar **ítems y destinos**. Estética: producción.

---

## Piezas que se conservan

| Pieza | Decisión |
|---|---|
| Logo imagen + “PietraItaly” → Inicio | **CONSERVAR** |
| Buscador central | **CONSERVAR** (pieza) |
| Un único CTA naranja (visitante) | **CONSERVAR** |
| Header blanco / barra superior | **CONSERVAR** |
| Favoritos, Mi Cuenta, Salir (cliente) | **CONSERVAR** |
| Ingresar (visitante) | **CONSERVAR** |

---

## Menú público (exacto)

Orden de lectura izquierda → derecha, después del buscador:

1. **Inicio**
2. **Productos**
3. **Categorías**
4. **Marcas**
5. **Catálogos**
6. **Quiénes somos**
7. **Ingresar**
8. **Quiero ser cliente** (botón naranja)

No aparecen: Secciones, Ofertas, Empresa, Armar Pedido, Favoritos, Carrito, Mi Cuenta, Salir, Admin.

---

## Menú cliente (exacto)

1. **Inicio**
2. **Armar Pedido**
3. **Categorías**
4. **Marcas**
5. **Ofertas**
6. **Favoritos**
7. **Catálogos**
8. **Mi Cuenta**
9. **Salir**

No aparecen: Productos (lo reemplaza Armar Pedido), Ingresar, **Quiero ser cliente**, Secciones, Empresa.

Carrito como ítem de header: **definición posterior** (`07`, `12`). No forma parte de esta lista fija.

---

## Menú admin (demo)

No se pidió un menú público distinto para admin. La maqueta hoy muestra link **Admin** si `isAdmin`.

**CONSERVAR** un acceso a `/admin` para la demo.  
**FUERA DE ALCANCE** clonar el header de producción (texto “Admin” + Salir + menú público completo).

---

## Tabla de cambios de label / presencia

| Ítem | Producción | Maqueta hoy | Deseado |
|---|---|---|---|
| Secciones | Dropdown marcas | Dropdown marcas | **RETIRAR/DEJAR DE USAR** |
| Productos | No | No (sí CTA Home) | **CREAR** (público) |
| Armar Pedido | No | No | **CREAR** (cliente) |
| Categorías | No | No | **CREAR** |
| Marcas | Vía Secciones | Vía Secciones + Home | **CREAR** ítem |
| Ofertas | Público y cliente | Público y cliente | Solo **cliente** (puerta) |
| Catálogos | “Catálogos” | “Catálogo” | “Catálogos” **ADAPTAR** |
| Empresa / Quiénes somos | Empresa | Empresa | **Quiénes somos** **ADAPTAR** |
| Quiero ser cliente | Solo visitante | Siempre | Solo visitante **ADAPTAR** (la maqueta se alinea a prod + pedido) |

---

## Auth

| Paso | Deseado | Decisión |
|---|---|---|
| Form único de acceso | Sí (demo puede mantener botones Cliente/Admin) | **CONSERVAR** modo demo |
| Label del campo | **Usuario** (antes CUIT) | **ADAPTAR** visual. No implica cambiar `cuit` interno ahora |
| Contraseña / código | Se conserva el campo | **CONSERVAR** |
| Post-login cliente | Mi Cuenta | **CONSERVAR** |
| Post-login admin | Admin | **CONSERVAR** |
| Logout | Home pública | **CONSERVAR** |
| Recupero password | Prod sí, maqueta no | **FUERA DE ALCANCE** |
| “Quiero ser cliente” logueado | No | **RETIRAR/DEJAR DE USAR** en ese estado |

Mi Cuenta: **CONSERVAR** datos de demo + **CREAR** CTA grande:

> ¿Querés hacer un pedido?  
> **ARMAR PEDIDO**

---

## Buscador

### Autocomplete

**Web real:** al tipear, sugerencias AJAX; click → ficha.

**Maqueta:** no existe.

**Deseado:** **CONSERVAR** el comportamiento de producción. En la maqueta eso es **CREAR** (pieza ausente). Click de sugerencia → `/producto/:id`.

No se pide clonar `buscarDinamico.php`.

### ENTER / submit

**Maqueta ya hace** ENTER → `/buscar?q=`. **REUTILIZABLE.**

Deseado:

- Visitante → **Productos** con `q=`
- Cliente → **Armar Pedido** con `q=`

Misma página, distinto título/layout. Si se conserva `/buscar`, ENTER sigue siendo ese navigate.

Vacío + submit: catálogo sin `q` (ya existe).

### Placeholder

Producción: “Buscar...”. Maqueta: “Buscar por producto, rubro o código”.

**FUERA DE ALCANCE** unificar texto, salvo que se quiera acercar a producción. No es un cambio pedido.

### maxlength 30 de producción

**FUERA DE ALCANCE**.
