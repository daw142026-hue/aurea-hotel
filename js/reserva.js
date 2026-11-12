// Datos de las habitaciones que se pueden reservar
const habitaciones = {
  'doble-deluxe':   { nombre: 'Habitación Doble Deluxe',   precio: 120, img: 'img/hab-doble-deluxe.jpg' },
  'vistas-museo':   { nombre: 'Doble Deluxe Vistas Museo', precio: 135, img: 'img/hab-vistas-museo.jpg' },
  'junior-torreon': { nombre: 'Junior Suite Torreón',      precio: 170, img: 'img/hab-junior-torreon.jpg' }
};

// Lee la habitación elegida y la búsqueda de la URL; si no llega habitación, usa la Vistas Museo
const busqueda = leerBusqueda();
const clave = new URLSearchParams(location.search).get('hab');
const hab = habitaciones[clave] || habitaciones['vistas-museo'];
const total = hab.precio * busqueda.noches;

// Rellena el resumen con la habitación, las fechas, los huéspedes y el precio total
document.getElementById('res-nombre').textContent = hab.nombre;
document.getElementById('res-img').src = hab.img;
document.getElementById('res-img').alt = hab.nombre;
document.getElementById('res-entrada').textContent = formatearFecha(busqueda.entrada);
document.getElementById('res-salida').textContent = formatearFecha(busqueda.salida);
document.getElementById('res-huespedes').textContent = textoHuespedes(busqueda.huespedes);
document.getElementById('res-desglose').textContent = `${hab.precio} € × ${textoNoches(busqueda.noches)}`;
document.getElementById('res-subtotal').textContent = `${total} €`;
document.getElementById('res-total').textContent = `${total} €`;
document.getElementById('res-boton').textContent = `Confirmar reserva · ${total} €`;

// El enlace "Elige habitación" vuelve a los resultados de la misma búsqueda
document.getElementById('res-volver').href = `disponibles.html?${busqueda.url}`;

// Al confirmar, la página se recarga con #confirmada: se reenvían la habitación y la búsqueda para no perderlas
document.getElementById('dato-hab').value = habitaciones[clave] ? clave : 'vistas-museo';
document.getElementById('dato-entrada').value = busqueda.entrada;
document.getElementById('dato-salida').value = busqueda.salida;
document.getElementById('dato-huespedes').value = busqueda.huespedes;
