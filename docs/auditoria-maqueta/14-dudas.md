# Dudas y no verificado — maqueta (Fase 2)

---

## Runtime no abierto en esta sesión

Se sirvió Vite y se capturaron Home, Buscar, Ofertas, Login, Marca Pietra. **No se recorrió con clicks** (para no mutar localStorage de más y porque el browser MCP no estaba disponible):

- Submit del form CUIT/código (riesgo `require` en `auth.ts`)
- Botón “Entrar como Cliente / Admin (modo demo)” — el código y el DOM están; el resultado post-click **NO VERIFICADO**
- `/mi-cuenta` logueado, cambio de código
- `/favoritos` con ítems
- CartDrawer con productos, expandir, Vaciar, badge del header
- `/producto/:id`
- `/marca/pietra/rubro/pietra-herramientas`
- `/catalogo`, `/empresa`, `/quiero-ser-cliente` (código leído)
- Todo `/admin/*` en el navegador (modales, tabla desalineada — vista solo en código)
- Combinaciones reales de filtros Marca+Rubro en `/buscar`
- Mobile real (solo CSS `md:` / `lg:` leído; hamburguesa no clickeada)
- localStorage ya poblado de una sesión previa del usuario

El análisis de código de esos flujos **sí está documentado**. Donde hace falta runtime se marcó NO VERIFICADO.

---

## Comportamiento dudoso (código vs intención aparente)

1. ¿El form de login llega a funcionar en Chrome con Vite, o `require` tira? NO VERIFICADO.
2. `setClientDemoMode` escribe `pietra_clients` por su cuenta, sin pasar por `createClient` en memoria: si el módulo `clientStore` ya cargó, ¿el array en RAM queda desfasado del localStorage hasta recargar? Posible. NO VERIFICADO.
3. Logout no borra `pietra_cart_{cuit}`: al volver a entrar el carrito seguiría. Inferido de código.
4. `getCartItemCount` = líneas, no unidades. Alineado con prod “Carrito 1” de Fase 1, pero no se contrastó con varias cantidades.
5. Admin `updateBrand` guarda brands en LS y luego `normalizeBrands` los tira al recargar: editar marca **parece** funcionar hasta F5.
6. Thumbs de ficha no cambian la imagen principal (solo se renderizan).
7. `CatalogCard` vs store de marcas: si Admin editara el nombre, la card de catálogo podría mostrar el mock viejo.
8. WhatsApp de alta `3413589318` vs flotante prod `3415853899`: ¿typo de la maqueta o número distinto a propósito?
9. Catálogo “2025” vs prod “2026”.
10. Copyright footer 2024 vs prod 2026.

---

## Huecos de modelo (hechos, no dudas)

Estos **sí** están verificados en código:

- SUBRUBRO NO ESTÁ MODELADO
- No hay `destacado` boolean
- No hay `oferta` boolean (hay `priceOffer`)
- No hay Pedidos, Listas, paginación, autocomplete, form Quiero ser cliente, recupero password, página Pedido
- `Product` no incluye `shortDescription` ni `ean` aunque el Admin los pinta

---

## Pendiente de producción que sigue abierto (Fase 1)

Sigue valiendo `auditoria-web-real/08-dudas-no-verificadas.md` (Finalizar Compra, sync TXT, stock, matching CUIT vs N° cliente, etc.). Esta fase no reabrió el sitio real.

---

## Fuera de alcance cumplido

No se modificó `src/`. No se implementaron páginas nuevas. No se instalaron paquetes. No se inició Fase 3.
