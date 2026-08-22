# Navegación deseada (diagramas)

Flujos de la maqueta **final**. No son el mapa de producción ni el de la maqueta actual.

---

## 1. Visitante (público)

```
[Header]
  Logo → Inicio
  Buscador (autocomplete + ENTER)
  Inicio | Productos | Categorías | Marcas | Catálogos | Quiénes somos | Ingresar | Quiero ser cliente

Inicio
  → Banners (protagonistas, Admin)
  → Destacados (flag)
  → Ofertas (vitrina recortada)
  → Footer
  ✗ sin bloque Marcas
  ✗ sin bloque “Todos nuestros productos”

Productos
  → todos los productos (filtrar, buscar, ordenar, paginar, ver detalle)
  → NO comprar, NO precio B2B

Categorías → Rubro → Subrubros → Productos (filtrados)
Marcas → Productos (Marca=X)
Catálogos → PDF
Quiénes somos → institucional
Ingresar → login
Quiero ser cliente → alta comercial
```

“Secciones” no existe. “Ofertas” no está en este menú. Las ofertas del Home sí.

---

## 2. Cliente logueado

```
[Header]
  Logo → Inicio
  Buscador (autocomplete + ENTER → Armar Pedido)
  Inicio | Armar Pedido | Categorías | Marcas | Ofertas | Favoritos | Catálogos | Mi Cuenta | Salir

  ✗ Ingresar
  ✗ Quiero ser cliente

Armar Pedido
  → misma grilla que Productos
  → + precio, cantidad, agregar, favoritos, detalle
  → + carrito abierto a la derecha (desktop)

Ofertas (menú)
  → NO es otra grilla de compra
  → abre Armar Pedido con Solo Ofertas = on

Mi Cuenta
  → datos (se conservan)
  → CTA grande “¿Querés hacer un pedido?” → Armar Pedido

Salir → Home pública
```

Post-login: **Mi Cuenta** (como producción y como maqueta actual). Desde ahí el CTA lleva a Armar Pedido.

---

## 3. Categorías (marca fuera de la cadena)

```
Menú “Categorías”
    │
    ▼
Página Categorías
    todos los RUBROS globales
    (imagen genérica + nombre; no logo de marca)
    │
    │  click un rubro  (ej. Grifería)
    ▼
Página de ese rubro
    SUBRUBROS de ese rubro
    (no productos)
    │
    │  click un subrubro  (ej. Griferías 1 agua)
    ▼
Productos  o  Armar Pedido
    filtro Rubro + Subrubro ya aplicados
    (catálogo central; no otro listado)
```

La marca **no** se elige en esta vía.  
Un producto sigue teniendo marca; el filtro Marca queda disponible en el catálogo si el usuario quiere cruzarlo.

**Vs producción:** producción obliga Marca → Rubro → Subrubro.  
**Vs maqueta actual:** maqueta hace Marca → Rubro → Productos (sin subrubro).

---

## 4. Marcas

```
Menú “Marcas”
    │
    ▼
Página “Marcas con las que trabajamos”
    grilla tipo BrandGrid
    │
    │  click una marca  (ej. Pietra)
    ▼
Productos  o  Armar Pedido
    filtro Marca=Pietra ya aplicado
```

**No** ocurre:

```
Pietra → grilla de rubros     ← RETIRAR/DEJAR DE USAR
```

---

## 5. Buscador

```
Tipear
    → sugerencias (autocomplete de producción)
        click sugerencia → ficha de producto

ENTER / submit
    visitante → Productos ?q=
    cliente   → Armar Pedido ?q=

Campo vacío + submit
    catálogo central sin q  (la maqueta ya navega a /buscar)
```

---

## 6. Ofertas

```
HOME visitante
    bloque Ofertas (cards, sin precio)
    click “Ingresar para comprar” / “Ingresá para comprar” → Login
        (texto de card existente; no se inventa modal)
    “Ver todas” → Productos con Solo Ofertas=on

MENÚ cliente “Ofertas”
    → Armar Pedido con Solo Ofertas=on

FLAG del producto
    Oferta = Sí/No
    independiente del rubro
    el producto NO pierde Marca / Rubro / Subrubro
```

No hay un segundo universo de productos “solo de liquidación”.

---

## 7. Armar Pedido (desktop)

```
┌────────────┬─────────────────────┬──────────────┐
│  Filtros   │     Productos       │   Carrito    │
│  (izq.)    │     (grilla)        │  (derecha,   │
│            │     sort            │   ABIERTO    │
│  Solo of.  │     paginación      │   DEFAULT)   │
│  Marcas    │                     │              │
│  Rubros *  │                     │  minimizable │
│  Subrubros*│                     │  sin overlay │
└────────────┴─────────────────────┴──────────────┘

* listas dependientes + scroll interno
```

Mobile de este layout: **definición posterior**. No bloquea Fase 3.

---

## 8. Carrito → Revisar Pedido

```
Armar Pedido
    carrito columna (abierto)
        minimizar / restaurar
        editar qty, eliminar
        confirmar / “revisar”
            │
            ▼
Revisar Pedido  (pantalla completa = carrito expandido)
    foto | producto | SKU | precio | qty editable | subtotal | eliminar
    # productos | # unidades | total
    Volver (a Armar Pedido)
    Confirmar
        ✗ no wizard
        ✗ no envío
        ✗ no pago
        ✗ no observaciones
```

Carrito del header **fuera** de Armar Pedido: **definición posterior**.

---

## 9. Lo que deja de ser camino

```
Secciones → marcas
Home → bloque Marcas → /marca/:id → rubros → productos
/secciones  (= Home)
/ofertas como catálogo de compra paralelo
Marca → Rubro → Productos   (maqueta actual)
Marca → Rubro → Subrubro    (producción; ya no es la vía única)
```
