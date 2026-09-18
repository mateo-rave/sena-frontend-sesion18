/* ═══════════════════════════════════════════
   app.js — Panel de usuario FluneXy
   Sesión 18 — Bootstrap: componentes
   Organizado en módulos funcionales: Datos, Estadísticas,
   Lista de movimientos y Formulario.
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     MÓDULO: Datos
  ───────────────────────────────────────── */
  let movimientos = [
    { id: 1, descripcion: 'Pago de nómina',        monto: 2200000, tipo: 'ingreso', fecha: '2026-09-01' },
    { id: 2, descripcion: 'Arriendo',                monto: 850000,  tipo: 'gasto',   fecha: '2026-09-03' },
    { id: 3, descripcion: 'Mercado',                 monto: 320000,  tipo: 'gasto',   fecha: '2026-09-06' },
    { id: 4, descripcion: 'Venta curso en línea',    monto: 180000,  tipo: 'ingreso', fecha: '2026-09-10' },
    { id: 5, descripcion: 'Servicios públicos',      monto: 145000,  tipo: 'gasto',   fecha: '2026-09-12' },
    { id: 6, descripcion: 'Transporte',              monto: 90000,   tipo: 'gasto',   fecha: '2026-09-14' },
  ];

  const METAS = {
    ingresos: 3000000,   // meta mensual de ingresos
    presupuesto: 1600000, // presupuesto mensual de gastos
    ahorro: 900000,       // meta de ahorro mensual
  };

  const formatoCOP = (valor) => `$${valor.toLocaleString('es-CO')}`;

  /* ─────────────────────────────────────────
     MÓDULO: Estadísticas — cards con progress bars
  ───────────────────────────────────────── */
  const ElValorIngresos = document.getElementById('valor-ingresos');
  const ElPctIngresos = document.getElementById('pct-ingresos');
  const ElProgresoIngresos = document.getElementById('progreso-ingresos');
  const ElProgresoIngresosWrap = document.getElementById('progreso-ingresos-wrap');

  const ElValorGastos = document.getElementById('valor-gastos');
  const ElPctGastos = document.getElementById('pct-gastos');
  const ElProgresoGastos = document.getElementById('progreso-gastos');
  const ElProgresoGastosWrap = document.getElementById('progreso-gastos-wrap');

  const ElValorAhorro = document.getElementById('valor-ahorro');
  const ElPctAhorro = document.getElementById('pct-ahorro');
  const ElProgresoAhorro = document.getElementById('progreso-ahorro');
  const ElProgresoAhorroWrap = document.getElementById('progreso-ahorro-wrap');

  function calcularEstadisticas(listaMovimientos) {
    const totalIngresos = listaMovimientos
      .filter(({ tipo }) => tipo === 'ingreso')
      .reduce((acumulado, { monto }) => acumulado + monto, 0);

    const totalGastos = listaMovimientos
      .filter(({ tipo }) => tipo === 'gasto')
      .reduce((acumulado, { monto }) => acumulado + monto, 0);

    const ahorroActual = totalIngresos - totalGastos;

    return { totalIngresos, totalGastos, ahorroActual };
  }

  function porcentaje(valor, meta) {
    return Math.max(0, Math.min(100, Math.round((valor / meta) * 100)));
  }

  function renderEstadisticas() {
    const { totalIngresos, totalGastos, ahorroActual } = calcularEstadisticas(movimientos);

    /* Ingresos */
    const pctIngresos = porcentaje(totalIngresos, METAS.ingresos);
    ElValorIngresos.textContent = formatoCOP(totalIngresos);
    ElPctIngresos.textContent = `${pctIngresos}%`;
    ElProgresoIngresos.style.width = `${pctIngresos}%`;
    ElProgresoIngresosWrap.setAttribute('aria-valuenow', String(pctIngresos));

    /* Gastos — cambia de color según qué tan cerca está del presupuesto */
    const pctGastos = porcentaje(totalGastos, METAS.presupuesto);
    ElValorGastos.textContent = formatoCOP(totalGastos);
    ElPctGastos.textContent = `${pctGastos}%`;
    ElProgresoGastos.style.width = `${pctGastos}%`;
    ElProgresoGastosWrap.setAttribute('aria-valuenow', String(pctGastos));

    ElProgresoGastos.classList.remove('bg-success', 'bg-warning', 'bg-danger');
    if (pctGastos >= 90) {
      ElProgresoGastos.classList.add('bg-danger');
    } else if (pctGastos >= 70) {
      ElProgresoGastos.classList.add('bg-warning');
    } else {
      ElProgresoGastos.classList.add('bg-success');
    }

    /* Ahorro */
    const pctAhorro = porcentaje(ahorroActual, METAS.ahorro);
    ElValorAhorro.textContent = formatoCOP(ahorroActual);
    ElPctAhorro.textContent = `${pctAhorro}%`;
    ElProgresoAhorro.style.width = `${pctAhorro}%`;
    ElProgresoAhorroWrap.setAttribute('aria-valuenow', String(pctAhorro));
  }

  /* ─────────────────────────────────────────
     MÓDULO: Lista de movimientos (list group dinámico)
  ───────────────────────────────────────── */
  const listaMovimientosEl = document.getElementById('lista-movimientos');
  const badgeMovimientosNav = document.getElementById('badge-movimientos');
  const badgeListaEl = document.getElementById('badge-lista');

  function crearItemMovimiento({ id, descripcion, monto, tipo, fecha }) {
    const item = document.createElement('li');
    item.className = 'list-group-item d-flex justify-content-between align-items-center';
    item.dataset.id = String(id);

    const info = document.createElement('div');
    const desc = document.createElement('div');
    desc.className = 'fw-semibold small';
    desc.textContent = descripcion;
    const fechaEl = document.createElement('div');
    fechaEl.className = 'text-muted small';
    fechaEl.textContent = fecha;
    info.appendChild(desc);
    info.appendChild(fechaEl);

    const derecha = document.createElement('div');
    derecha.className = 'd-flex align-items-center gap-2';

    const montoBadge = document.createElement('span');
    montoBadge.className = `badge ${tipo === 'ingreso' ? 'bg-success' : 'bg-danger'}`;
    montoBadge.textContent = `${tipo === 'ingreso' ? '+' : '-'}${formatoCOP(monto)}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.type = 'button';
    btnEliminar.className = 'btn btn-outline-danger btn-sm py-0';
    btnEliminar.dataset.accion = 'eliminar';
    btnEliminar.dataset.id = String(id);
    btnEliminar.setAttribute('aria-label', `Eliminar movimiento: ${descripcion}`);
    btnEliminar.textContent = '×';

    derecha.appendChild(montoBadge);
    derecha.appendChild(btnEliminar);

    item.appendChild(info);
    item.appendChild(derecha);
    return item;
  }

  function renderLista() {
    listaMovimientosEl.innerHTML = '';

    if (movimientos.length === 0) {
      const vacio = document.createElement('li');
      vacio.className = 'list-group-item text-muted text-center small';
      vacio.textContent = 'No hay movimientos registrados.';
      listaMovimientosEl.appendChild(vacio);
    } else {
      movimientos.forEach(m => listaMovimientosEl.appendChild(crearItemMovimiento(m)));
    }

    /* Badges con conteo dinámico — se recalculan cada vez que la lista cambia */
    badgeMovimientosNav.textContent = movimientos.length;
    badgeListaEl.textContent = movimientos.length;
  }

  /* Delegación de eventos: un solo listener elimina cualquier movimiento */
  listaMovimientosEl.addEventListener('click', (evento) => {
    const btn = evento.target.closest('[data-accion="eliminar"]');
    if (!btn) return;

    const id = Number(btn.dataset.id);
    movimientos = movimientos.filter(m => m.id !== id);

    renderLista();
    renderEstadisticas();
  });

  /* ─────────────────────────────────────────
     MÓDULO: Formulario — validación visual Bootstrap
  ───────────────────────────────────────── */
  const formPerfil = document.getElementById('form-perfil');
  const alertaGuardado = document.getElementById('alerta-guardado');
  const camposValidables = formPerfil.querySelectorAll('.form-control');

  /* Validación EN VIVO: cada campo se marca is-valid/is-invalid
     apenas el usuario escribe, sin esperar al submit. */
  camposValidables.forEach((campo) => {
    campo.addEventListener('input', () => {
      if (campo.checkValidity()) {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
      } else {
        campo.classList.remove('is-valid');
        campo.classList.add('is-invalid');
      }
    });
  });

  /* Al enviar: si algo sigue inválido, se bloquea el envío y
     Bootstrap muestra los mensajes de error de todo el formulario. */
  formPerfil.addEventListener('submit', (evento) => {
    evento.preventDefault();
    alertaGuardado.classList.add('d-none');

    if (!formPerfil.checkValidity()) {
      evento.stopPropagation();
      formPerfil.classList.add('was-validated');
      return;
    }

    formPerfil.classList.add('was-validated');
    alertaGuardado.classList.remove('d-none');
  });

  /* ─────────────────────────────────────────
     Inicialización
  ───────────────────────────────────────── */
  renderLista();
  renderEstadisticas();
});
