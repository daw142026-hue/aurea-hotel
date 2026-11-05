// Datos de las habitaciones que se pueden reservar
const habitaciones = {
  'doble-deluxe':   { nombre: 'Habitación Doble Deluxe',   precio: 120, img: 'img/hab-doble-deluxe.jpg' },
  'vistas-museo':   { nombre: 'Doble Deluxe Vistas Museo', precio: 135, img: 'img/hab-vistas-museo.jpg' },
  'junior-torreon': { nombre: 'Junior Suite Torreón',      precio: 170, img: 'img/hab-junior-torreon.jpg' }
};
const noches = 2;

// Lee la habitación elegida de la URL (reserva.html?hab=...); si no llega ninguna, usa la Vistas Museo
const clave = new URLSearchParams(location.search).get('hab');
const hab = habitaciones[clave] || habitaciones['vistas-museo'];
const total = hab.precio * noches;

// Rellena el resumen de la reserva y el botón con la habitación y el precio total
document.getElementById('res-nombre').textContent = hab.nombre;
document.getElementById('res-img').src = hab.img;
document.getElementById('res-img').alt = hab.nombre;
document.getElementById('res-desglose').textContent = `${hab.precio} € × ${noches} noches`;
document.getElementById('res-subtotal').textContent = `${total} €`;
document.getElementById('res-total').textContent = `${total} €`;
document.getElementById('res-boton').textContent = `Confirmar reserva · ${total} €`;
