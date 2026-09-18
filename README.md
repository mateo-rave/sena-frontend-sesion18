# Sesión 18 — Bootstrap: componentes principales

**Fecha de entrega:** 18 de septiembre de 2026
**Nombres y apellidos:** Mateo Rave Girlado
**Número de ficha:** 3267541
**Competencia:** Crear Componentes Front-End del Software
**Instructor:** Alexander Patiño

## Descripción

Panel de usuario de **FluneXy** construido con Bootstrap 5 (CDN) y un archivo JS modular, como evidencia de la Sesión 18 (navbar, cards, badges, alertas, progress bars, list group y formularios con validación visual).

## Qué incluye

- **Navbar responsivo:** colapsa a un botón hamburguesa en móvil (`navbar-expand-md`) usando solo `data-bs-toggle="collapse"` — sin JavaScript adicional para el propio colapso.
- **3 cards de estadística** (Ingresos, Gastos, Meta de ahorro), cada una con un badge y una `progress-bar` cuyo ancho y porcentaje se calculan en JS a partir de los movimientos reales (no están hardcodeados en el HTML). La barra de gastos cambia de color (`bg-success` / `bg-warning` / `bg-danger`) según qué tan cerca está del presupuesto.
- **List group dinámico** de movimientos recientes, generado con `createElement`/`appendChild` desde un array de JS; cada uno se puede eliminar, lo que recalcula al instante las estadísticas y los badges.
- **Formulario de perfil con validación Bootstrap:** los campos se marcan `is-valid` / `is-invalid` en vivo mientras el usuario escribe, y al enviar se agrega `was-validated` (el patrón estándar de Bootstrap) para bloquear el envío si algo sigue inválido.
- **Badge con conteo dinámico:** el badge del navbar y el del encabezado de la lista muestran la cantidad real de movimientos, actualizada por JS cada vez que se elimina uno.
- **Botones con variantes semánticas:** `btn-primary`, `btn-outline-danger` — ningún color escrito a mano.
- **Sin CSS propio:** todo el estilo viene de clases de Bootstrap.

## Estructura del proyecto

```
sena-frontend-sesion18/
├── index.html      — navbar, cards de estadística, list group y formulario
├── js/
│   └── app.js        — datos, estadísticas, lista dinámica y validación
└── README.md
```

## Cómo probarlo

1. Clonar o descargar el repositorio.
2. Abrir `index.html` en el navegador (requiere conexión a internet, porque Bootstrap se carga desde el CDN).
3. Reducir el ancho de la ventana a menos de 768px y usar el botón ☰ para ver el navbar colapsado.
4. Eliminar un movimiento de la lista (botón "×") y observar cómo cambian las cards y los badges de conteo.
5. Escribir en el formulario de perfil y ver el borde verde/rojo (`is-valid`/`is-invalid`) actualizarse mientras escribes; enviar el formulario para ver el mensaje de confirmación.

## Conceptos aplicados de la sesión

- `navbar`, `navbar-expand-md`, `navbar-toggler`, `collapse`/`navbar-collapse` para el menú responsivo.
- `card`, `card-header`, `card-body`, `badge`, `progress`/`progress-bar` para las estadísticas.
- `list-group`, `list-group-item` para los movimientos.
- `form-control`, `is-valid`, `is-invalid`, `was-validated`, `valid-feedback`, `invalid-feedback` para la validación visual.
- Delegación de eventos con `closest()` para eliminar movimientos.
