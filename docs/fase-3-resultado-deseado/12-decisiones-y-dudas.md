# Decisiones ya tomadas vs dudas reales

No se repreguntan las decisiones aprobadas.  
Las dudas son solo huecos que **esta** especificación no puede cerrar sin inventar.

---

## Decisiones ya tomadas (requisitos)

1. La maqueta final = web real + **solo** los cambios pedidos. No rediseñar. No igualar producción al 100%.
2. Home visitante: conservar header, buscador, banners, destacados, ofertas, footer, identidad.
3. Quitar Marcas del Home. Marcas pasa a página propia.
4. Banners con más protagonismo; Admin Banners ya existe; Home debe usarlos. Una arquitectura.
5. Menú público exacto: Inicio, Productos, Categorías, Marcas, Catálogos, Quiénes somos, Ingresar, Quiero ser cliente.
6. “Secciones” desaparece. “Empresa” → “Quiénes somos”.
7. Menú cliente exacto: Inicio, Armar Pedido, Categorías, Marcas, Ofertas, Favoritos, Catálogos, Mi Cuenta, Salir. Sin “Quiero ser cliente”.
8. Productos (visitante) = catálogo central de **todos** los productos. Base posible: `/buscar`.
9. Sin login: navegar, filtrar, buscar, detalle. No comprar. Precios B2B ocultos.
10. Layout catálogo: filtros izquierda, grilla, sort, **paginación**.
11. Orden default: Pietra primero → Pietra alfabético → resto. Documentado; no implementar en Fase 3.
12. Paginación debe existir. Cantidad por página **no** se fija.
13. Categorías es **página**, no dropdown. Nivel 1 = todos los rubros **globales**.
14. Click rubro → subrubros (no productos). Click subrubro → catálogo central filtrado.
15. Marca **sale** de la cadena Categorías.
16. Click marca → Productos/Armar Pedido con Marca=X. **No** Pietra → Rubros.
17. Productos y Armar Pedido = **una** lógica. Cambia el estado de sesión.
18. Filtros solo: Solo Ofertas, Marcas, Rubros, Subrubros. Dependientes. Acumulativos. Scroll interno.
19. Oferta = Sí/No independiente del rubro. El producto conserva Marca/Rubro/Subrubro.
20. `;1/;0` es concepto mock, no importación. No hay módulo Admin Ofertas.
21. `/ofertas` cliente = puerta a Armar Pedido con Solo Ofertas=on.
22. Home visitante puede mostrar ofertas; comprar → login con texto **existente**, no modal inventado.
23. Armar Pedido desktop: Filtros | Productos | Carrito **abierto**. Sin overlay. Minimizable.
24. Revisar Pedido = carrito expandido (campos listados). Sin wizard/envío/pago/observaciones.
25. Mi Cuenta: conservar + CTA grande Armar Pedido.
26. Login: label visual CUIT → **Usuario**. Estructura interna no ahora.
27. Autocomplete de producción se conserva. ENTER → Productos o Armar Pedido. Mecanismo ENTER de `/buscar` es reutilizable.
28. Product card: no rediseñar; conservar “ya agregado”.
29. Destacados: flag, no `slice(0, 6)`.
30. `Category.brandId` vs rubros globales = adaptación estructural **necesaria**.
31. Admin: no replicar todo. Pedidos/Listas fuera si no demuestran cambios.
32. Visual: web real = identidad. IA = layout de lo nuevo. Imágenes de rubro/subrubro genéricas.
33. Desktop = prioridad. No destruir responsive.
34. Carrito del header fuera de Armar Pedido: **definición posterior**.
35. Armar Pedido mobile: **definición posterior**.

---

## Dudas reales (pendientes)

Estas **no** estaban cerradas por el pedido. Inventarlas sería Fase 4 disfrazada o un rediseño.

### 1. Orden del “resto” después de Pietra

Pietra va primero y, dentro, A–Z.  
¿El resto va A–Z global, agrupado por marca y luego A–Z, o en el orden del mock?

### 2. Cantidad por página

La paginación es obligatoria. El tamaño de página **no está especificado**. No se elige 12, 20 ni 24 en Fase 3.

### 3. Qué hace “Confirmar” en Revisar Pedido

Está pedido el botón. No está pedido el después (éxito mock, pedido guardado, volver a Mi Cuenta, vaciar carrito). Producción `enviar_pedido.php` no se visitó. No se inventa un wizard para llenar el hueco.

### 4. Carrito en el header fuera de Armar Pedido

Definición posterior: ¿no se muestra, abre Armar Pedido, o un panel distinto? No bloquea esta fase.

### 5. Layout mobile de Armar Pedido

Definición posterior: cómo conviven filtros + grilla + carrito en chico. No bloquea esta fase.

### 6. Nombre de URL visible del catálogo

Se recomienda **reutilizar `/buscar`**. No está prohibido un alias más legible. No se fija `/productos` ni `/armar-pedido` como obligatorio.

### 7. Nombre de URL de Categorías / Marcas / Revisar Pedido

No existen. El rol sí. El string final es de implementación.

### 8. Autocomplete: cuántas sugerencias y qué campos

Producción sugiere al tipear (calidad irregular). No hay regla de “máximo N” ni de buscar en rubro. Para la demo: nombre + SKU alcanza; el detalle es de implementación.

### 9. Nivel exacto de Admin Subrubros

Se evaluó un **mínimo** (mocks + asignación en producto). Si en la reunión quieren **ver** una pantalla Admin Subrubros, eso se confirma después. No se implementa ahora.

### 10. Precio de oferta numérico vs solo flag

El pedido fija el **flag** como membresía. No fija si el número `priceOffer` sigue mostrándose tachado/naranja. La card de producción muestra un precio; no se rediseña.

---

## Lo que parece duda y no lo es

| Tema | Por qué no se pregunta |
|---|---|
| ¿Igualar 8 marcas y 2258 productos? | No. Volumen mock = **FUERA DE ALCANCE** |
| ¿Replicar Admin Pedidos/Listas? | No. **FUERA DE ALCANCE** |
| ¿Pietra debe abrir rubros? | No. Ya decidido: abre productos |
| ¿Oferta es un rubro? | No. Es flag |
| ¿Hay que crear Admin Ofertas? | No |
| ¿Hay checkout? | No |
| ¿Se rediseña el header? | No |
| ¿Se copia el header de una imagen IA? | No |
| ¿Se corrigen tsc/eslint ahora? | No (Fase 3) |
| ¿Texto del modal de login al comprar? | No hay modal nuevo; va la card |
| ¿Subrubro en Fase 3 código? | No. Solo especificación |

---

## Dudas de Fase 1 / 2 que siguen abiertas y no bloquean

Siguen valiendo `auditoria-web-real/08` y `auditoria-maqueta/14` (Finalizar real, matching CUIT vs N°, `require` del login, etc.).  
No se reabren: no cambian el **resultado deseado** de la demo.
