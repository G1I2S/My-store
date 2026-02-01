
const cards = document.querySelectorAll('.card');
const totalGeneralSpan = document.querySelector('#totalGeneral span');


function formatearPrecio(numero) {
  return '$' + numero.toLocaleString('es-CO');
}


function calcularTotalGeneral() {
  let totalGeneral = 0;

  cards.forEach(card => {
    const precio = parseInt(card.dataset.precio);
    const cantidad = parseInt(card.querySelector('.cantidad strong').textContent);
    totalGeneral += precio * cantidad;
  });

  totalGeneralSpan.textContent = formatearPrecio(totalGeneral);
}


cards.forEach(card => {
  const precio = parseInt(card.dataset.precio);
  const cantidadElement = card.querySelector('.cantidad strong');
  const totalElement = card.querySelector('.total span');
  const btnSumar = card.querySelector('.btnSumar');
  const btnRestar = card.querySelector('.btnRestar');

  let cantidad = 0;

 
  btnSumar.addEventListener('click', () => {
    cantidad++;
    cantidadElement.textContent = cantidad;
    totalElement.textContent = formatearPrecio(precio * cantidad);
    calcularTotalGeneral();
  });

 
  btnRestar.addEventListener('click', () => {
    if (cantidad > 0) {
      cantidad--;
      cantidadElement.textContent = cantidad;
      totalElement.textContent = formatearPrecio(precio * cantidad);
      calcularTotalGeneral();
    }
  });
});

const btnCheckout = document.querySelector('.btn-checkout');
btnCheckout.addEventListener('click', () => {
  let hayProductos = false;
  let mensaje = '🛒 Resumen de tu compra:\n\n';

  cards.forEach(card => {
    const cantidad = parseInt(card.querySelector('.cantidad strong').textContent);
    if (cantidad > 0) {
      hayProductos = true;
      const nombre = card.querySelector('h2').textContent;
      const total = card.querySelector('.total span').textContent;
      mensaje += `• ${nombre} x${cantidad} = ${total}\n`;
    }
  });

  if (hayProductos) {
    mensaje += `\n💰 ${document.querySelector('#totalGeneral').textContent}`;
    alert(mensaje);
  } else {
    alert('Tu carrito está vacío. ¡Agrega algunos productos!');
  }
});
