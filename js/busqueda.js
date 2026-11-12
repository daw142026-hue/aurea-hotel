// Convierte fechas entre el formato del calendario (AAAA-MM-DD) y objetos Date
const aISO = fecha => `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
const desdeISO = texto => { const [a, m, d] = texto.split('-').map(Number); return new Date(a, m - 1, d); };
const sumarDias = (texto, dias) => { const f = desdeISO(texto); f.setDate(f.getDate() + dias); return aISO(f); };

// Textos que se muestran en el resumen: "vie 12 mar 2027", "2 adultos", "2 noches"
const formatearFecha = texto => desdeISO(texto).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '');
const textoHuespedes = n => n === 1 ? '1 adulto' : `${n} adultos`;
const textoNoches = n => n === 1 ? '1 noche' : `${n} noches`;

// Buscador de la portada: no deja elegir fechas pasadas y la salida tiene que ser posterior a la entrada
const buscador = document.querySelector('.buscador');
if (buscador) {
  const entrada = buscador.querySelector('#entrada');
  const salida = buscador.querySelector('#salida');
  entrada.min = aISO(new Date());
  salida.min = sumarDias(entrada.min, 1);

  const comprobarFechas = () => {
    if (entrada.value) salida.min = sumarDias(entrada.value, 1);
    const correcta = !entrada.value || !salida.value || salida.value > entrada.value;
    salida.setCustomValidity(correcta ? '' : 'La salida tiene que ser posterior a la entrada');
  };
  entrada.addEventListener('change', comprobarFechas);
  salida.addEventListener('change', comprobarFechas);
}

// Lee la búsqueda de la URL (?entrada=...&salida=...&huespedes=...); si falta o no es válida, usa una de ejemplo
function leerBusqueda() {
  const p = new URLSearchParams(location.search);
  const fecha = /^\d{4}-\d{2}-\d{2}$/;
  let entrada = p.get('entrada'), salida = p.get('salida');
  if (!fecha.test(entrada || '') || !fecha.test(salida || '') || salida <= entrada) {
    entrada = '2027-03-12';
    salida = '2027-03-14';
  }
  const huespedes = Math.min(4, Math.max(1, parseInt(p.get('huespedes'), 10) || 2));
  const noches = Math.round((desdeISO(salida) - desdeISO(entrada)) / 86400000);
  return { entrada, salida, huespedes, noches, url: new URLSearchParams({ entrada, salida, huespedes }).toString() };
}
