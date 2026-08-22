# Demo click-by-click (maqueta PietraItaly)

Para alguien que no conoce el proyecto. Desktop, Chrome.

---

## 0. Arrancar y dejar estado inicial

Carpeta:

`C:\Users\scabu\OneDrive\Escritorio\PAGINA WEB\PAGINA WEB`

En esta PC `npm` no está en PATH. Usar Node de Cursor:

```
cd "C:\Users\scabu\OneDrive\Escritorio\PAGINA WEB\PAGINA WEB"
& "C:\Users\scabu\AppData\Local\Programs\cursor\resources\app\resources\helpers\node.exe" .\node_modules\vite\bin\vite.js --host 127.0.0.1 --port 5173
```

Abrir: **http://127.0.0.1:5173/**

Si 5173 está ocupado, Vite puede subir en 5174: usar la URL que imprima.

### Reset recomendado (antes de la reunión)

1. F12 → Application → Local Storage → `http://127.0.0.1:5173`
2. Borrar solo:
   - `pietra_auth`
   - `pietra_current_client`
   - cualquier clave `pietra_cart_...`
3. **No borrar** `pietra_admin_store` ni `pietra_clients` salvo que el Home/Admin se vea corrupto (en ese caso borrar también `pietra_admin_store` y recargar: se rehidrata el seed).
4. Recargar. Debe verse Home **sin** sesión.

No usar credenciales de producción.

---

## Recorrido público

1. Abrir `http://127.0.0.1:5173/`
2. Mostrar Home: banners grandes, Productos destacados, Ofertas, **sin** grilla de Marcas.
3. Header: Inicio, Productos, Categorías, Marcas, Catálogos, Quiénes somos, Ingresar, Quiero ser cliente. No Secciones. No Ofertas.
4. En Ofertas del Home, click **Ver todas →**. Debe aparecer el aviso. Cerrar.
5. Header → **Productos**. Título **PRODUCTOS**. Precios ocultos. 24 por página. Ir a página 2 y volver.
6. En filtros, tildar **Pietra**. Ver chips. Quitar el chip o Limpiar.
7. Header → **Categorías**. Click **Grifería**. Deben verse subrubros (no el listado de productos). Click un subrubro → catálogo filtrado.
8. Header → **Marcas**. Título MARCAS CON LAS QUE TRABAJAMOS. Click **Pietra** → `/buscar?brand=pietra`.
9. En el buscador escribir `canilla` (esperar sugerencias). Click una sugerencia → ficha. Volver atrás.
10. Escribir `canilla` y **Enter** → `/buscar?q=canilla`, título PRODUCTOS.
11. Header → **Catálogos** (sigue existiendo). **Quiénes somos** (página Empresa). **Quiero ser cliente**.

---

## Recorrido cliente

12. Header → **Ingresar**. Label **Usuario**.
13. Abajo, sección **[DEMO]** → **Entrar como Cliente**.
14. Debe abrir **Mi Cuenta**. Mostrar CTA naranja **ARMAR PEDIDO**.
15. Click **ARMAR PEDIDO**. Título **ARMAR PEDIDO**. Tres columnas: filtros | productos | carrito vacío a la derecha (no overlay).
16. En una card, poner cantidad **3** y **Agregar al carrito**. La card pasa a ✓ En carrito. El panel muestra la línea y el mismo precio.
17. Agregar otros 2–3 productos con cantidades distintas. Verificar Productos / Unidades / Total.
18. **Minimizar** el carrito; **Mostrar carrito**.
19. Cambiar un filtro (p. ej. Solo ofertas o una marca). El carrito **sigue**.
20. Header → **Ofertas**. Debe quedar Armar Pedido con Solo ofertas. Carrito intacto.
21. Header → **Carrito** (icono). Debe abrir **Revisar Pedido** (no un overlay).
22. Revisar: no hay envío ni pago. Cambiar un **+**. **VOLVER A ARMAR PEDIDO**: la cantidad se mantiene.
23. Otra vez Revisar Pedido (desde el panel o el Header) → **CONFIRMAR PEDIDO**.
24. Ver **Pedido confirmado correctamente** y un número `PED-XXXXXX` (no total $0).
25. **VOLVER A ARMAR PEDIDO**: carrito vacío.
26. Header → **Salir**. Vuelve el menú público.

---

## Admin (opcional, 1 minuto)

27. Ingresar → **[DEMO] Entrar como Admin**.
28. Dashboard. **Productos** (Editar: Marca, Rubro, Subrubro, Oferta, Destacado). **Rubros** (sin dueño marca). **Banners**.
29. **Salir de Admin**.

---

## Si algo “queda sucio”

Repetir el reset del paso 0. El botón demo Cliente vuelve a crear la sesión `11111111111` sin tocar producción.
