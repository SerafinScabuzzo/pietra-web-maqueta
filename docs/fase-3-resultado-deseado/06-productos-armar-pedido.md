# Productos / Armar Pedido — especificación funcional

Una sola lógica central. Dos caras según sesión.

---

## Identidad de la pantalla

| | Visitante | Cliente |
|---|---|---|
| Nombre visible | **Productos** | **Armar Pedido** |
| Menú | Sí | Sí (reemplaza a Productos) |
| Ver / filtrar / buscar / detalle | Sí | Sí |
| Precio B2B | Oculto | Visible |
| Cantidad + agregar | No | Sí |
| Favoritos | No (no se pide corazón público) | Sí |
| Carrito columna (desktop) | No | Sí, **abierto por default** |
| Base maqueta | `/buscar` + `SearchFilters` + `ProductCard` + chips | La misma + carrito |

**Decisión:** **ADAPTAR** `/buscar`. **CREAR** el rol Armar Pedido. No un segundo listado.

---

## Layout desktop

### Visitante — Productos

```
Filtros (izquierda)  |  Grilla + sort + chips + paginación
```

Como producción de `/ofertas` (columna filtros) y como `/buscar` actual.

### Cliente — Armar Pedido

```
Filtros | Productos | Carrito
```

- Carrito **abierto** a la derecha al entrar.
- **No** overlay, **no** drawer que oscurezca, **no** lock de scroll de página.
- Minimizable (la columna se pliega; la grilla gana ancho).
- Mobile de este trío: **definición posterior** (`12`).

---

## Universo de productos

Todos los productos del mock/demo. No hay “otro catálogo” por marca, por ofertas o por rubro.

Las páginas de rubro/subrubro **no** listan productos. Empujan filtros hacia esta pantalla.

---

## Orden default (aprobado; no implementar en Fase 3)

1. Productos de marca **Pietra** primero.
2. Dentro de Pietra: **alfabético** por nombre.
3. Después: el resto.

### Diferencia vs maqueta actual

`applySort` sin `sort` **devuelve el array tal cual**.  
El mock está agrupado `pie-001…010`, `mot-001…010`, `fv-001…010` (Pietra ya sale primero por carga, **no** por regla).  
Dentro de Pietra el orden es el del archivo (herramientas → plomería → baño), **no** A–Z.

Sort de usuario actual: `name_asc`, `price_asc`, `price_desc`. `name_asc` mezcla todas las marcas. No existe “Pietra primero”.

### Diferencia vs producción

Producción no tiene catálogo único “todos”. El orden se ve por subrubro / ofertas. No hay regla documentada “Pietra primero en un listado global”.

### Cuando el usuario elige un sort

El sort elegido **pisa** el default. Vaciar sort vuelve al default Pietra.

El resto (otras marcas) **después** de Pietra: el criterio interno del resto no está fijado (`12`).

---

## Paginación

**DEBE EXISTIR.**

- Hoy: la maqueta lista los 30 de un saque. Producción pagina ofertas y rubro/subrubro.
- Cantidad por página: **no se fija** (no está especificada).
- No se copia el select 10/20/50/100 de producción salvo que más adelante se pida.

---

## Filtros (solo estos)

1. **Solo Ofertas**
2. **Marcas**
3. **Rubros**
4. **Subrubros**

No hay filtro precio min/max, stock, destacado, “relevancia” extra.

### Dependientes

- Elegir **Pietra** reduce la lista de **Rubros** a los rubros que tienen productos Pietra.
- Elegir **Pietra + Grifería** reduce **Subrubros** a los de ese rubro que existan en productos Pietra.
- Quitar marca vuelve a mostrar rubros globales (los que tengan productos en el universo actual / intersección vigente).
- Rubros son **globales**: no aparecen “Herramientas (Pietra)” y “Herramientas (Mota)” como dos ítems si son el mismo rubro.

### Vs maqueta actual

`SearchFilters` lista **todas** las categorías (`getCategories()`), cada una con `brandId`. Elegir Pietra **no** esconde rubros de Mota/FV. Combinar Pietra + Grifería (FV) puede dar 0 resultados. **Casi hecho** el filtro de productos; **no** la dependencia de listas.

### Acumulativos

Intersección (AND): Marca ∩ Rubro ∩ Subrubro ∩ Solo Ofertas ∩ `q`.

Varios checks en la misma dimensión: la maqueta ya permite `brand` y `category` repetibles (OR dentro de la dimensión, AND entre dimensiones). **CONSERVAR** ese comportamiento salvo contradicción. Subrubro igual.

### Scroll interno

Listas largas de marcas/rubros/subrubros: scroll **dentro** del bloque de filtros, no una página infinita de checkboxes.

### Chips — evaluación de `ActiveFiltersChips`

**ADAPTAR / reutilizar.** Ya muestra marca, rubro, Solo ofertas, sort, “Limpiar todo”.

Deseado:

- Chips para las **4** dimensiones + quitar uno a uno + limpiar filtros.
- Añadir chip de **Subrubro** cuando exista.
- El chip de **sort** no es un quinto filtro del set aprobado; puede quedarse como feedback de UI.
- Hoy “Limpiar todo” de chips **no borra `q`**; el “Limpiar” de `Buscar` sí. Deseado: limpiar filtros no tiene por qué borrar la búsqueda de texto; son controles distintos. **CONSERVAR** esa separación.

---

## Oferta dentro de esta pantalla

- Checkbox **Solo Ofertas** = productos con flag **Sí**.
- El producto en oferta **sigue** teniendo Marca, Rubro, Subrubro.
- No se crea un rubro “OFERTA/LIQUIDACION” para que esto funcione.
- Menú Ofertas (cliente) = esta pantalla con el checkbox ya on.

---

## Búsqueda en esta pantalla

- Llega con `q=` desde el header (ENTER).
- Sigue pudiendo filtrar encima.
- `matchesQuery` hoy busca `name` y `sku`. **CONSERVAR** ese alcance salvo pedido. El placeholder actual dice “rubro” pero no busca rubro: no se pide ampliar a Fase 3.

---

## Product card (en esta pantalla)

**CONSERVAR** estilo y comportamiento de producción. **ADAPTAR** solo lo necesario.

| Pieza | Visitante | Cliente | Nota |
|---|---|---|---|
| Imagen, marca, título, SKU | Sí | Sí | No rediseñar |
| Precio | No | Sí | B2B |
| CTA login | “Ingresar / Ingresá para comprar” → login | — | Texto existente; no modal nuevo |
| Cantidad + Agregar | No | Sí | |
| Estado “ya agregado” | — | Sí (`✓ Agregado` de la maqueta) | **CONSERVAR** |
| Ver detalles | Sí → ficha | Sí → ficha | |
| Favorito | No pedido | Sí | |
| Badge oferta | Aceptable si el flag es Sí | Igual | No rediseñar |

`OfferProductCard` (borde naranja, **sin** compra) **DEJAR DE USAR** como card de un catálogo paralelo de `/ofertas`. Si Ofertas es puerta, no hace falta una card distinta que no agrega.

Cantidad default 0 (prod) vs 1 (maqueta): **no se pidió unificar**. **FUERA DE ALCANCE** salvo que rompa la demo. La demo debe poder agregar.

---

## Ficha (desde esta pantalla)

**CONSERVAR** `/producto/:id`.

Visitante: detalle, sin precio, sin compra.  
Cliente: precio, cantidad, agregar, favorito — para no contradecir Armar Pedido (hoy la ficha maqueta **no** agrega).

**ADAPTAR** la ficha en lo mínimo. No rediseñar galería.

---

## Armar Pedido — operaciones

En desktop el cliente puede, **en la misma pantalla**:

- buscar
- filtrar (4 dimensiones, dependientes)
- ver precio
- cambiar cantidad
- agregar
- marcar favorito
- abrir detalle
- ver / editar el carrito (columna)

Confirmar el pedido no ocurre acá: va a **Revisar Pedido** (`07`).
