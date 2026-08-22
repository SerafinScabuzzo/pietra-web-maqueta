# Categorías y Marcas — resultado deseado

Dos vías de entrada al **mismo** catálogo central. No son dos catálogos.

---

## Diferencia estructural principal

| | Producción | Maqueta actual | Deseado |
|---|---|---|---|
| Rubro | Global. Admin sin Marca. En el front se ve **bajo una marca** | `Category.brandId`: el rubro **pertenece** a una marca | **Global.** Un rubro “Grifería” es el mismo para todas las marcas |
| Subrubro | Existe; el listado de productos vive ahí | **No modelado.** El listado vive en el rubro | Existe. Click subrubro → catálogo central filtrado |
| Marca en la cadena de categorías | Obligatoria (`/rubro/{marca}/{rubro}`) | Obligatoria (`/marca/:id/rubro/:id`) | **Sale de la cadena.** Categorías no pide marca |
| Click marca | Abre rubros de esa marca | Abre rubros de esa marca | Abre **productos** filtrados por esa marca |

**Decisión:** **ADAPTAR** rubros a globales (necesario). **CREAR** subrubro conceptual. **RETIRAR/DEJAR DE USAR** Pietra → Rubros.

---

## Vía Categorías

**Decisión de la página:** **CREAR**. No es dropdown. “Secciones” no la reemplaza (Secciones era marcas).

### Nivel 1 — todos los rubros

- Título de sección: Categorías (o equivalente claro; no “Secciones”).
- Muestra **todos los rubros globales**.
- Card: imagen **genérica del rubro** (no foto de una marca, no logo Pietra) + nombre.
- Click → **subrubros de ese rubro**, **no** productos.

### Nivel 2 — subrubros de un rubro

- Cards de subrubro (imagen genérica + nombre).
- No lista productos.
- Click → **Productos** (visitante) o **Armar Pedido** (cliente) con filtros Rubro + Subrubro ya puestos.
- Es el catálogo general, no otra página de grilla con otra lógica.

### Lo que no ocurre en esta vía

- Elegir marca antes del rubro.
- Saltar del rubro a productos.
- Usar el rubro OFERTA/LIQUIDACION como atajo de ofertas (las ofertas van por flag + filtro).

---

## Vía Marcas

**Decisión:** **CREAR** página de índice. **ADAPTAR** `BrandGrid` (hoy en Home).

- Título: **“Marcas con las que trabajamos”** (el de producción / el de la maqueta Home).
- Grilla de marcas (logo + nombre). Volumen mock (3) es suficiente; 8 de producción = **FUERA DE ALCANCE**.
- Click marca → **Productos** con Marca=X. Si hay sesión → **Armar Pedido** con Marca=X.

**RETIRAR/DEJAR DE USAR:** hero de marca + grilla de rubros (`Marca.tsx` actual, `/marca/pietra` de producción como modelo de esa pantalla).

No se pide conservar el hero de logo de marca para la demo. Si `/marca/:id` permanece, es un **alias** al catálogo filtrado, no una taxonomía.

---

## Imágenes de rubro / subrubro

**CONSERVAR** la idea de producción: una imagen por entidad, no el logo de marca.

**ADAPTAR** contenido: fotos **genéricas** (categoría), no packaging ni campaña de una marca.

Tamaño 800×600 de Admin real: **FUERA DE ALCANCE** copiar la restricción; sí importa que se vean como categoría.

---

## Relación con filtros del catálogo

Las dos vías **solo pre-cargan filtros**:

| Entrada | Filtros que llegan al catálogo |
|---|---|
| Categorías → Rubro → Subrubro | Rubro + Subrubro |
| Marcas → Marca | Marca |
| Menú Productos / Armar Pedido | Ninguno (todos) |
| Ofertas (cliente) | Solo Ofertas |
| Buscador ENTER | `q=` |

Después el usuario puede sumar o quitar filtros (intersección). Ver `06`.

---

## “Secciones”

**RETIRAR/DEJAR DE USAR** por completo:

- ítem de menú
- dropdown de marcas
- ruta `/secciones` de producción (no se recrea)

Marcas y Categorías la reemplazan con roles distintos.
