# Modelo conceptual (no es TypeScript final)

Describe entidades de la **maqueta deseada**. No define interfaces ni nombres de campos TS.

---

## Producto

Un producto **siempre** tiene:

- Identidad: nombre, SKU, imagen(es)
- **Marca** (una)
- **Rubro** (uno, global)
- **Subrubro** (uno, hijo del rubro)
- **Oferta** Sí/No (independiente del rubro)
- **Destacado** Sí/No
- Precio de lista (para la demo logueada)
- Precio de oferta numérico: puede existir como dato de demo; **no** es el criterio de “está en oferta”

Un producto **no** cambia de rubro por estar en oferta.  
Un producto **no** pierde marca por navegarse desde Categorías.

---

## Marca

Catálogo de marcas con las que se trabaja.

- No es dueña de los rubros.
- No abre una taxonomía propia.
- Filtra el catálogo central.

**Vs maqueta:** sigue existiendo `Brand`. Cambia el **uso** (índice + filtro), no el concepto de “hay marcas”.

---

## Rubro

Nivel 1 de Categorías. **Global.**

- “Grifería” es uno solo, no “Grifería de Pietra” y “Grifería de FV”.
- Tiene imagen genérica.
- Tiene muchos **subrubros**.
- Click → subrubros, no productos.

**Vs maqueta:** hoy `Category` tiene `brandId` obligatorio. 9 rubros = 3 por marca. Eso **contradice** el deseado.

**Vs producción:** coincide en “rubro global”. Difiere en la navegación: producción lo muestra **dentro** de una marca.

**Decisión:** **ADAPTAR** — separación estructural necesaria.

---

## Subrubro

Nivel 2 de Categorías. Hijo de **un** rubro.

- Imagen genérica.
- Click → catálogo central filtrado (Rubro + Subrubro).
- En filtros: lista dependiente del rubro (y de la marca si hay marca elegida).

**Vs maqueta:** **SUBRUBRO NO ESTÁ MODELADO** (0 ocurrencias en `src/`).  
**Vs producción:** existe; el listado de productos vive en `/subrubro/{marca}/{rubro}/{subrubro}`. Acá el listado vive en Productos/Armar Pedido.

**Decisión:** **CREAR** el concepto en mocks/demo. No se pide la URL de 4 segmentos de producción.

Para la reunión alcanza un set chico (ej. un rubro con 2–3 subrubros y productos asignados). No 205.

---

## Oferta

Atributo del **producto**: Sí o No.

Independiente de:

- qué rubro tiene
- qué subrubro tiene
- qué marca tiene

**Web real:** radio `oferta` Sí/No **y** rubro OFERTA/LIQUIDACION. Ambos conviven. El pedido elige el **flag**, no el rubro-como-oferta.

**Maqueta:** `isProductOnOffer` = `priceOffer < priceList`. No hay boolean.

**TXT `;1/;0`:** concepto para entender un mock de flag. **No** es un módulo de importación. **FUERA DE ALCANCE** sync/TXT.

**No se crea** sección Admin “Ofertas”.

**Decisión:** **ADAPTAR** criterio a flag. **RETIRAR/DEJAR DE USAR** el rubro liquidación como mecanismo. **CONSERVAR** que producción ya tenía el flag (no inventar otro sistema).

---

## Destacado

Atributo del **producto**: Sí o No.

Solo lo consume el **Home**.  
No hay ABM “Destacados”.  
No son los primeros 6 del array.

**Decisión:** **CREAR** en el modelo de demo. **ADAPTAR** Home.

---

## Relaciones (deseado)

```
Marca 1 ──< Producto >── 1 Rubro
                 │
                 └── 1 Subrubro  (el subrubro pertenece a ese rubro)

Producto.offer      : Sí | No
Producto.destacado  : Sí | No
```

Integridad conceptual: el subrubro de un producto debe ser hijo del rubro de ese producto.  
Marca y rubro **no** se validan entre sí (cualquier marca puede tener productos en Grifería).

---

## Qué no entra al modelo de esta demo

| Concepto | Motivo |
|---|---|
| Publicado / Orden / Copete / EAN | No demuestran los cambios pedidos |
| Stock | No verificado en prod; no pedido |
| Pedido persistido / factura / lista de precios archivo | **FUERA DE ALCANCE** |
| Rubro OFERTA/LIQUIDACION | Deja de ser mecanismo |
| `Category.brandId` | Contradice rubros globales |
| Cliente email / N° vs CUIT matching | Label pasa a Usuario; matching interno **no ahora** |

---

## Mapeo rápido maqueta → deseado

| Hoy | Deseado |
|---|---|
| `Product.brandId` | Sigue (marca del producto) |
| `Product.categoryId` | Rubro global (el id ya no implica marca) |
| — | Subrubro del producto |
| `Product.priceOffer?` | Precio opcional de demo; **Oferta** es Sí/No |
| — | Destacado Sí/No |
| `Category.brandId` | **Deja de existir** como dueño |
| `getCategoriesByBrand` | Deja de ser la forma de armar taxonomía. Puede vivir un “rubros que tienen productos de esta marca” **solo para filtros dependientes** |
