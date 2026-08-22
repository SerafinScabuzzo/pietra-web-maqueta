# Guion reunión 31/08/2026 — PietraItaly

Objetivo de la reunión: mostrar al programador **la web actual + estos cambios concretos**.  
No: “hay que rehacer todo.”

Maqueta: prototipo local React (mocks + `localStorage`). No es producción.

Abrir: `http://127.0.0.1:5173/` (ver `demo-click-by-click.md` para arrancar Vite).  
Estado inicial: **deslogueado**, Home, carrito demo vacío.

---

## 1. Home público

**Se conserva:** logo, colores, buscador, Footer, cards, identidad Pietra, destacados y ofertas visibles sin login (sin precio).

**Cambia:**
- Menú: Inicio, **Productos**, **Categorías**, **Marcas**, Catálogos, **Quiénes somos**, Ingresar, Quiero ser cliente.
- Sale **Secciones**. Ofertas **no** está en el menú público.
- Sale la grilla de Marcas del Home.
- Banners más protagonistas, alimentados por Admin Banners.
- Destacados = flag `isFeatured`. Ofertas Home = flag `isOffer`.
- “Ver todas” las ofertas → aviso (Ingresar / Quiero ser cliente), no al listado comercial.

---

## 2. Productos

Click **Productos** → `/buscar`. Título **PRODUCTOS**.

**Se conserva:** ProductCard pública (imagen, marca, nombre, SKU, sin precio).

**Cambia:** hay un catálogo **completo** de todos los productos. Ya no hace falta Marca → Rubro → Subrubro para encontrar. Filtros a la izquierda (Marca, Rubro, Subrubro, Solo ofertas), 24 por página, orden Pietra A–Z y después el resto.

---

## 3. Categorías

**Se conserva:** rubros, subrubros, imágenes, productos asociados.

**Cambia:** Categorías es **página**. Nivel 1 = todos los rubros **globales** (la Marca no es dueña del rubro). Click rubro → **subrubros**. Click subrubro → catálogo filtrado.

---

## 4. Marcas

**Se conserva:** las marcas con las que trabajan (demo: 8).

**Cambia:** página propia. Click marca → Productos/Armar Pedido con filtro Marca. **Ya no** Pietra → listado de rubros de esa marca.

---

## 5. Login

**Se conserva:** pantalla de acceso, código, demos para la maqueta.

**Cambia:** el label visible es **Usuario** (antes CUIT). Sigue aterrizando en **Mi Cuenta**.

En la reunión usar el botón **[DEMO] Entrar como Cliente**.

---

## 6. Mi Cuenta + Armar Pedido

**Se conserva:** datos del cliente, descuento.

**Cambia:** CTA visible **¿QUERÉS HACER UN PEDIDO? / ARMAR PEDIDO**.  
`/buscar` logueado muestra **ARMAR PEDIDO** (mismo catálogo, otras capacidades).

---

## 7. Filtros

Mostrar que Marca, Rubro, Subrubro y Solo ofertas se combinan y se limpian entre sí. Los chips se pueden quitar. El carrito **no se pierde** al filtrar.

---

## 8. Carrito

**Se conserva:** cantidades, agregar, una línea por producto, persistencia por cliente.

**Cambia:** en Armar Pedido el carrito es **columna permanente** (abierto al entrar, no overlay). Se puede minimizar. Header Carrito abre **Revisar Pedido**.

Agregar 3–4 SKUs con cantidades distintas. Mostrar que el precio de la card = precio del carrito.

---

## 9. Revisar Pedido

**Se conserva:** las líneas del carrito.

**Cambia:** pantalla completa de **resumen**. No es checkout: no hay envío, pago, observaciones ni seguimiento.

Editar una cantidad → volver a Armar Pedido → se mantiene.  
**CONFIRMAR PEDIDO** = simulación mock (`PED-XXXXXX`) + vacía el carrito. En producción el programador indica el flujo real.

---

## 10. Admin (solo si ayuda)

Mostrar que Rubro es global y que el producto mock tiene Marca, Rubro, Subrubro, Oferta y Destacado.  
No pedir paridad con el Admin de producción. No hay Pedidos Admin ni importación TXT en la maqueta.

---

## Cierre sugerido

“La identidad de tu web se mantiene. Lo que cambia es: cómo se navega (catálogo único, categorías globales, marcas independientes), cómo se arma el pedido (carrito siempre visible) y cómo se confirma (resumen antes de enviar). El resto se reutiliza.”
