// Muestra en la franja verde las fechas y los huéspedes que se buscaron en la portada
const busqueda = leerBusqueda();
document.getElementById('bus-entrada').textContent = formatearFecha(busqueda.entrada);
document.getElementById('bus-salida').textContent = formatearFecha(busqueda.salida);
document.getElementById('bus-huespedes').textContent = `${textoHuespedes(busqueda.huespedes)} · ${textoNoches(busqueda.noches)}`;

// Calcula el precio total de cada habitación y pasa la búsqueda a la página de reserva
document.querySelectorAll('.js-seleccionar').forEach(boton => {
  const precio = Number(boton.dataset.precio);
  const tarjeta = boton.closest('article');
  tarjeta.querySelector('.js-desglose').textContent = `${precio} € × ${textoNoches(busqueda.noches)}`;
  tarjeta.querySelector('.js-total').textContent = `${precio * busqueda.noches} €`;
  boton.href = `reserva.html?hab=${boton.dataset.hab}&${busqueda.url}`;
});
