# Fase 3 — Resultado deseado de la maqueta final

Fecha: 22/08/2026  
Reunión de presentación: 31/08/2026  
Estado: **especificación**. No se modificó código. No se inició Fase 4.

---

## Qué es este paquete

Define **cómo debe quedar exactamente la maqueta final**:

**Web real actual + solamente los cambios solicitados.**

No es un rediseño. No es “igualar producción al 100%”. No es un plan técnico de implementación (eso es Fase 4).

Fuentes usadas, en este orden:

1. **Web real (Fase 1)** = qué CONSERVAR si no se pidió cambiar.
2. **Decisiones aprobadas de este encargo** = cambios funcionales (ganan si contradicen producción).
3. **Imágenes aprobadas** = layout de partes NUEVAS. En este workspace no hay archivos de imagen de maquetas IA; el layout de lo nuevo queda especificado por las decisiones aprobadas. No se copian header, colores ni footer accidentales de una imagen.
4. **Maqueta (Fase 2 + código, solo lectura)** = qué hay, qué se reutiliza, qué contradice.

Etiquetas únicas de decisión: **CONSERVAR | ADAPTAR | CREAR | RETIRAR/DEJAR DE USAR | FUERA DE ALCANCE**.

---

## Confirmación

- Fase 1 y Fase 2: aprobadas, usadas como entrada.
- Fase 3: este paquete.
- `src/`, mocks, routes, types, CSS, assets, localStorage, `package.json` y configs: **no modificados**.
- Errores técnicos de la maqueta (`tsc`, eslint, `require` en login, tabla Admin desalineada, etc.): **no se corrigen acá**.
- Fase 4: **no iniciada**.

---

## Cambios principales definidos (los que sí se piden)

1. Menú público nuevo: Inicio, Productos, Categorías, Marcas, Catálogos, Quiénes somos, Ingresar, Quiero ser cliente.
2. Menú cliente nuevo: Inicio, Armar Pedido, Categorías, Marcas, Ofertas, Favoritos, Catálogos, Mi Cuenta, Salir. Sin “Quiero ser cliente”.
3. “Secciones” desaparece. “Empresa” se llama “Quiénes somos”.
4. Home visitante: se quita el bloque Marcas; los banners ganan protagonismo; Destacados y Ofertas siguen.
5. Una sola lógica central de catálogo: visitante = **Productos**; cliente = **Armar Pedido**.
6. Categorías es página (no dropdown). Cadena: Rubro → Subrubro → Productos. La marca **sale** de esa cadena.
7. Marcas es página independiente. Click marca → Productos / Armar Pedido con Marca=X. **No** Pietra → Rubros.
8. Filtros solo: Solo Ofertas, Marcas, Rubros, Subrubros. Dependientes y acumulativos. Paginación obligatoria.
9. Orden default: Pietra primero, dentro de Pietra alfabético, después el resto.
10. Oferta = flag Sí/No independiente del rubro. No hay módulo Admin Ofertas. `/ofertas` del cliente es puerta a Armar Pedido con Solo Ofertas=on.
11. Armar Pedido desktop: Filtros | Productos | Carrito abierto a la derecha (no overlay).
12. Revisar Pedido = carrito expandido a pantalla completa. Sin wizard de checkout.
13. Mi Cuenta: se conserva + CTA grande a Armar Pedido.
14. Login: label visual CUIT → Usuario.
15. Buscador: autocomplete de producción + ENTER a Productos o Armar Pedido.
16. Destacados del Home por flag, no por `slice(0, 6)`.
17. Home consume banners del Admin existente.
18. Rubros globales (dejar de atar `Category` a `brandId`). Subrubro entra al modelo conceptual de la demo.

---

## Qué se conserva (identidad y piezas no pedidas)

Header (estética de producción, no rediseño), buscador como pieza, banners como concepto, Destacados, Ofertas de Home, footer, colores/fondo/tipografía de la web real, cards de producto (comportamiento y estilo de producción), Catálogos, contenido institucional, Quiero ser cliente (visitante), Favoritos, login → Mi Cuenta, precios B2B ocultos sin sesión, Admin Banners ya existente, flag de oferta ya existente en producción (no inventar otro módulo).

---

## Qué se adapta (ya existe, cambia de rol o de contrato)

`/buscar` como base del catálogo central; menús; Home (sin marcas, banners del Admin, destacados por flag); filtros (dependientes + subrubro); Ofertas cliente como puerta; carrito de overlay a columna; `Category.brandId` → rubros globales; oferta numérica `priceOffer` → flag Sí/No conceptual; label de login; “Empresa” → “Quiénes somos”; “Catálogo” → “Catálogos”; click de marca; click de rubro (subrubros, no productos); ProductCard solo lo necesario; chips de filtros.

---

## Qué se crea (no está, o no cubre el pedido)

Página Categorías; página Marcas; concepto Subrubro (mocks/demo); Armar Pedido (misma lógica, otro estado de sesión); Revisar Pedido; paginación; orden Pietra-primero; autocomplete en la maqueta; CTA Armar Pedido en Mi Cuenta; layout de 3 columnas desktop; filtro Subrubros; flag Destacado; Home conectado a banners.

---

## Qué deja de utilizarse

Dropdown y concepto “Secciones”; bloque Marcas del Home; bloque extra “Todos nuestros productos” del Home (no está en producción y no se pidió); navegación Marca → Rubros; rubro como dueño de la marca; `/ofertas` como segundo catálogo de compra; `CatalogCarousel` como fuente del hero; carrito overlay que oscurece dentro de Armar Pedido; “Quiero ser cliente” después del login; rubro OFERTA/LIQUIDACION como mecanismo obligatorio de oferta.

---

## Fuera de alcance (diferencias que no hay que “arreglar” para la demo)

Admin visual distinto; 2 clientes mock vs miles reales; Pedidos Admin / Listas; importación TXT real; wizard envío/pago/observaciones; mobile de Armar Pedido (definición posterior); carrito del header fuera de Armar Pedido (definición posterior); recupero de contraseña; pedidos/facturas/listas de Mi Cuenta de producción; stock; igualar 8 marcas / 2258 productos; corregir errores `tsc`/eslint en esta fase.

---

## Documentos de esta carpeta

| Archivo | Contenido |
|---|---|
| `00-resumen.md` | Este archivo |
| `01-matriz-web-maqueta-deseado.md` | Área \| Web real \| Maqueta \| Resultado deseado \| Decisión |
| `02-rutas-deseadas.md` | Mapa conceptual (visible vs reutilizar) |
| `03-navegacion.md` | Diagramas de flujos |
| `04-home.md` | Home visitante y logueado |
| `05-categorias-marcas.md` | Dos vías de entrada al catálogo |
| `06-productos-armar-pedido.md` | Especificación funcional del catálogo central |
| `07-carrito-revisar-pedido.md` | Carrito de columna y Revisar Pedido |
| `08-header-auth-buscador.md` | Menús exactos, login, buscador |
| `09-modelo-conceptual.md` | Producto, Marca, Rubro, Subrubro, Oferta, Destacado |
| `10-admin-alcance.md` | Qué Admin representa el cambio y qué no |
| `11-reglas-visuales.md` | Identidad, layout de lo nuevo, imágenes |
| `12-decisiones-y-dudas.md` | Ya tomado vs dudas reales |
| `13-componentes-aprovechables.md` | Qué código cubre parcialmente cada futuro |
| `14-impacto-cascada.md` | Áreas afectadas por los cambios estructurales |

---

## Dependencias de mayor impacto (aviso, no plan)

1. Separar Rubro de Marca (`Category.brandId` → rubros globales).
2. Añadir Subrubro al modelo y a la navegación.
3. Una sola lógica Productos / Armar Pedido.
4. Filtros dependientes + paginación + orden Pietra.
5. Carrito como columna (no overlay) + Revisar Pedido.
6. Home: banners del Admin + Destacado por flag + sin marcas.

Detalle: `14-impacto-cascada.md` y `12-decisiones-y-dudas.md`.
