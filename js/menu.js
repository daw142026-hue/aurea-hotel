// Menú del móvil: al pulsar un enlace se cierra y, cuando termina de cerrarse, baja a la sección elegida
const menu = document.getElementById('menu');
menu.querySelectorAll('a').forEach(enlace => enlace.addEventListener('click', evento => {
  if (!menu.classList.contains('show')) return;
  const url = new URL(enlace.href);
  const destino = url.pathname === location.pathname && url.hash ? document.querySelector(url.hash) : null;
  if (destino) {
    evento.preventDefault();
    menu.addEventListener('hidden.bs.collapse', () => {
      history.pushState(null, '', url.hash);
      destino.scrollIntoView();
    }, { once: true });
  }
  bootstrap.Collapse.getOrCreateInstance(menu).hide();
}));
