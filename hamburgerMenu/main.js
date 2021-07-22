'use strict';

{
  const open = document.getElementById('open');
  const overlay = document.querySelector('.overlay');
  const close = document.getElementById('close');
  open.addEventListener('click', () => {
    document.addEventListener('click', () => {
      overlay.classList.add('show');
      open.classList.add('hide');
    });
  });
  close.addEventListener('click', () => {

  })
}
