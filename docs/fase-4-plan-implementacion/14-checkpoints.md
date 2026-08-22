# Checkpoints conceptuales

**No son commits git reales** (Fase 4 no toca el repo de código; Fase 5 solo commitea si el usuario lo pide).  
Sirven para saber **hasta dónde se llegó** y qué revertir si una etapa rompe la demo.

En Fase 5, si hay git: un commit por checkpoint es opcional y **solo si el usuario lo pide**. El nombre del checkpoint es el mensaje mental / tag local.

---

## Lista

| Checkpoint | Después de | Estado esperable | Cómo volver atrás |
|---|---|---|---|
| `checkpoint-preflight` | Etapa 0 | Maqueta actual intacta; A/B tsc escrito | N/A (no hay diff) |
| `checkpoint-modelo` | Etapa 1 | Types+mocks+store. UI vieja sigue abriendo con ids nuevos | Revertir `types`, `mocks`, `adminStore`, puente Admin. Restaurar/limpiar `pietra_admin_store` |
| `checkpoint-catalogo` | Etapa 2 | `/buscar` = catálogo único + filtros + página 24. `/ofertas` redirect | Revertir `search.ts`, `Buscar`, `SearchFilters`, chips, `Ofertas` |
| `checkpoint-categorias-marcas` | Etapa 3 | `/categorias`, `/marcas`, redirects `/marca` | Quitar rutas nuevas; restaurar `Marca.tsx`/`Rubro.tsx` listados; BrandGrid a `/marca/:id` |
| `checkpoint-header-home` | Etapa 4 | Menús nuevos; Home banners; sin marcas Home | Restaurar `Header`, `Home`, `BannerSlider` |
| `checkpoint-carrito` | Etapa 5 | 3 col cliente; carrito abierto + minimizar; `clientStore`; qty/totales; CTA **sin** `/revisar-pedido`; **sin 404** | Restaurar `Buscar` 2 col; CartDrawer solo overlay |
| `checkpoint-revisar-pedido` | Etapa 6 (misma tanda que E5) | `/revisar-pedido` creada; lateral + Header Carrito cableados; confirmación mock | Quitar página/ruta; Header vuelve a `setShowCart`; CTA columna vuelve a inerte |
| `checkpoint-auth-buscador` | Etapa 7 | Autocomplete; label Usuario; CTA cuenta | Restaurar SearchBar/Login/MiCuenta/Producto |
| `checkpoint-admin` | Etapa 8 | Flags y rubros globales en Admin | Restaurar AdminProductos/AdminRubros |
| `checkpoint-regresion` | Etapa 9 | Guion de reunión OK | Hotfix puntual o volver al checkpoint anterior |

---

## Regla de rollback

Volver **un** checkpoint, no mezclar.  
Si Etapa 5 rompe scroll, no “arreglar” tsc global: volver a `checkpoint-header-home` y rehacer el `variant`.

Etapas 5 y 6 se ejecutan **en la misma tanda**. Se puede marcar `checkpoint-carrito` intermedio (maqueta navegable, CTA sin destino nuevo) y seguir de inmediato a E6. **Prohibido** dejar E5 con `navigate('/revisar-pedido')` y la página sin crear.

`localStorage`: al volver Etapa 1, borrar `pietra_admin_store` si los products quedaron a medio remap.

---

## Qué no es un checkpoint

- Cada file save
- `vite build`
- Un filtro más en SearchFilters a mitad de Etapa 2

Una etapa = un checkpoint.
