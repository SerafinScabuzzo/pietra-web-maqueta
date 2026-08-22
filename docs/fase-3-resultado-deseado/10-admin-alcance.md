# Admin — alcance para la demo

Objetivo: **no contradecir gravemente** el modelo deseado y **representar** los cambios de administración que la reunión necesita ver.  
No replicar el Admin de producción.

Nada de esto se implementa en Fase 3. Solo se clasifica.

---

## Principio

| Pregunta | Si la respuesta es no | Etiqueta |
|---|---|---|
| ¿Hace falta para mostrar Productos / Categorías / Oferta / Destacado / Banners? | No entrar | **FUERA DE ALCANCE** |
| ¿La pieza actual contradice el modelo (rubro atado a marca, sin flag, Home sin banners)? | Hay que alinearla | **ADAPTAR** |
| ¿Falta un concepto (subrubro) para que la demo se entienda? | Nivel mínimo | **CREAR** (mínimo, no réplica) |

---

## Secciones Admin

| Sección | Prod | Maqueta | ¿Hace falta para la demo? | Decisión |
|---|---|---|---|---|
| Dashboard | KPIs + sync | 5 KPIs | No demostrar sync | **FUERA DE ALCANCE** paridad / **CONSERVAR** lo que hay |
| Productos | Tabla sync, sin alta web | ABM mock | Sí: flags y clasificación | **ADAPTAR** |
| Marcas | Alta/baja, 3 tamaños de imagen | Solo editar 3 | No hace falta ABM completo | **CONSERVAR** las 3 de demo / **FUERA DE ALCANCE** alta de 8 marcas |
| Rubros | Globales, sin marca | **Con** marca | Sí: dejar de atar a marca | **ADAPTAR** (estructural) |
| SubRubros | Cards, form sin padre visible | No existe | Concepto sí; réplica total no | **CREAR** nivel suficiente / no implementar ahora |
| Catálogos | 1 ítem | CRUD que se pisa al recargar | Página pública se conserva | **FUERA DE ALCANCE** paridad / persistencia |
| Banners | 2, alimentan Home | CRUD, Home no usa | Sí: una arquitectura Admin → Home | **ADAPTAR** (conectar). **CONSERVAR** módulo. No segunda arquitectura |
| Clientes | Miles | 2 mocks | Login demo | **FUERA DE ALCANCE** volumen |
| Pedidos | Listado | No | No demuestra los cambios | **FUERA DE ALCANCE** |
| Listas | 0 ítems, archivos | No | No | **FUERA DE ALCANCE** |
| Menú “Ofertas” / “Destacados” | No existe en prod | No | No crear | **FUERA DE ALCANCE** / **RETIRAR/DEJAR DE USAR** la idea de módulo aparte |
| Chrome visual (doble header) | Distinto | Distinto | No igualar | **FUERA DE ALCANCE** |

---

## Admin Productos — flags

| Campo / flag | ¿Afecta la demo de la reunión? | Decisión |
|---|---|---|
| Nombre | Sí (cards, orden Pietra A–Z) | **CONSERVAR** |
| SKU | Sí (card, Revisar Pedido, búsqueda) | **CONSERVAR** |
| Marca | Sí (filtro, orden Pietra, vía Marcas) | **CONSERVAR** / **ADAPTAR** si cambia el catálogo de rubros |
| Rubro | Sí (vía Categorías + filtros). Debe ser **global** | **ADAPTAR** (select ya no “rubros de la marca”) |
| Subrubro | Sí (vía Categorías + filtros dependientes) | **CREAR** en el form de demo (asignación) |
| Precio lista | Sí (cliente) | **CONSERVAR** |
| Precio oferta numérico | Solo como número de card; no define membresía | **ADAPTAR**: la membresía es el flag |
| **Oferta Sí/No** | Sí (Home, filtro, puerta Ofertas) | **ADAPTAR** (prod ya lo tiene; maqueta no) |
| **Destacado Sí/No** | Sí (Home) | **CREAR** en Admin producto (prod ya lo tiene) |
| Imagen(es) | Sí (cards) | **CONSERVAR** |
| Publicado | No pedido | **FUERA DE ALCANCE** |
| Orden | El default es Pietra/alfa, no este campo | **FUERA DE ALCANCE** |
| Copete / descripción | Ficha no es el foco | **FUERA DE ALCANCE** |
| EAN / shortDescription | UI rota, no están en el type | **FUERA DE ALCANCE** (y no se “arregla” en Fase 3) |
| Alta “+ Nuevo Producto” | Prod no tiene alta web | Extra de maqueta; útil para demo | **FUERA DE ALCANCE** quitarla o igualarla |

---

## Admin Rubros

**ADAPTAR** de “rubro pertenece a marca” a “rubro global”.

Suficiente para la demo:

- listar rubros sin selector de marca obligatorio
- nombre + imagen genérica
- que los productos puedan apuntar a esos rubros

Unicidad actual (`brandId` + nombre): deja de tener sentido tal cual.

---

## Admin Subrubros — nivel suficiente (evaluación)

Producción tiene ABM propio; el form inspeccionado **ni siquiera** elige rubro padre.

Para **esta** demo el padre **sí** importa (Categorías = Rubro → Subrubros).

**Nivel suficiente (no implementar ahora):**

1. Que existan subrubros en **mocks**.
2. Que el producto pueda **tener** un subrubro coherente con su rubro.
3. Opcional: una lista Admin mínima (nombre, rubro padre, imagen) **solo** si hace falta mostrar el cambio de administración.

**No suficiente / no pedido:** clonar cards 800×600, publicado, IDs numéricos, 205 ítems.

**Decisión:** **CREAR** concepto; ABM completo **FUERA DE ALCANCE** si los mocks + el campo en producto alcanzan para recorrer Categorías en la reunión.

---

## Banners

Ya hay Admin. Falta el consumo en Home.

No crear “Banners 2”, no usar catálogos como banners.

---

## TXT / sync / importación

El `;1/;0` de oferta es **explicación de flag**, no una pantalla.

Dashboard de sync, “Eliminar facturas”, importar TXT: **FUERA DE ALCANCE**.
