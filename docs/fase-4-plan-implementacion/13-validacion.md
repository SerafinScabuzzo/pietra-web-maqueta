# Validación y Etapa 9 — regresión visual

---

## Principio

Cada etapa de código termina con la **validación manual de su propio doc**.  
La Etapa 9 no agrega features: recorre la checklist completa y compara con las 8 pantallas (layout, no píxeles).

---

## Etapa 9 — OBJETIVO

Recoorrido de reunión (31/08) en desktop: visitante → login → armar → revisar → admin mínimo. Anotar solo fallos de lo **pedido**.

---

## PRECONDICIONES

Etapas 0–8 hechas. Maqueta servida.

---

## ARCHIVOS A MODIFICAR / NUEVOS

Ninguno, salvo **hotfix quirúrgico** de un criterio de aceptación ya escrito que se rompió. Si el hotfix es un feature nuevo, **no** entra: vuelve a plan.

---

## ARCHIVOS INTACTOS

Todo, por defecto.

---

## CAMBIOS DE MODELO / RUTAS / VISUAL

Ninguno nuevo. Visual = verificar mapeo de `12-riesgos-regresiones.md`.

---

## REUTILIZADOS

Checklist de `12`.

---

## RIESGO

**BAJO** si no se “aprovecha” para rediseñar.

---

## REGRESIONES

Esta etapa **es** la regresión.

---

## VALIDACIÓN MANUAL (guion de reunión)

### Visitante desktop

1. Home: banners (no catálogo PDF), sin marcas, destacados, **ofertas visibles**, footer. “Ver todas las ofertas” visitante → aviso (Ingresar / Quiero ser cliente), **no** `/buscar?offer=1`.
2. Productos: 24 + página 2, Pietra primero luego A–Z global, filtros dependientes.
3. Categorías → rubro → subrubro → Productos filtrado.
4. Marcas → **8 marcas** → Productos `brand=` (ningún click vacío). Visitante en `/buscar` puede tildar Solo Ofertas.
5. Buscador: sugerencias + ENTER.
6. Quiénes somos, Catálogos, Quiero ser cliente, Ingresar.
7. Precios ocultos. Card “Ingresá para comprar” → login.

### Cliente

8. Demo login → Mi Cuenta → CTA Armar Pedido.
9. Armar Pedido: 3 columnas, carrito abierto, sin overlay. CTA “Revisar pedido” **no** 404 si se corta en E5; tras E6 (misma tanda) sí navega.
10. Agregar, qty, favorito, ficha agrega. Importe de línea Card = columna = Revisar Pedido.
11. Ofertas **menú cliente** → `offer=1` en Armar Pedido. Visitante **sin** ítem Ofertas.
12. Revisar Pedido (columna y Header Carrito, cableados en E6): campos + confirmar mock + vacío + volver.
13. Logout.

### Admin

14. Producto: rubro global, subrubro, oferta, destacado → se refleja en Home/catálogo (reload).
15. Rubros sin marca.
16. Banner editado → Home.

### Responsive

17. Hamburguesa: mismos ítems. **No** exigir Armar Pedido 3 col en mobile.

---

## CRITERIOS DE ACEPTACIÓN (Etapa 9)

- [ ] Checklist público / cliente / admin de `12` en verde.
- [ ] No hay segundo catálogo.
- [ ] No overlay en Armar Pedido.
- [ ] Confirmación sin wizard.
- [ ] Nada de `src/` cambiado “de gusto”.

---

## NO HACER EN ESTA ETAPA

- No design polish.
- No tsc repo-wide.
- No paridad de volumen.
- No mobile Armar Pedido.

---

## Validación por etapa (índice)

| Etapa | Dónde están los pasos |
|---|---|
| 0 | `01-preflight.md` |
| 1 | `02-modelo-datos.md` |
| 2 | `03` + `06` |
| 3 | `04-plan-categorias-marcas.md` |
| 4 | `05-plan-header-home.md` |
| 5 | `07-plan-carrito.md` |
| 6 | `08-plan-revisar-pedido.md` |
| 7 | `09-plan-auth-buscador-mi-cuenta.md` |
| 8 | `10-plan-admin-minimo.md` |
| 9 | Este archivo |

Checkpoint: `checkpoint-regresion`.
