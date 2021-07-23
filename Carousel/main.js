'use strict';

{
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul = document.querySelector('ul');
  const slides = ul.children;
  //一旦全てのスライドを取得しそれを使用して使っていく。。
  let currentIndex = 0;

  function updateButtons() {
    prev.classList.remove('hidden');
    next.classList.remove('hidden');

    if(currentIndex === 0) {
      prev.classList.add('hidden');
    }

    if(currentIndex === slides.length - 1){
      next.classList.add('hidden');
    }
  }

  updateButtons();
  //ページを読み込んだ時にcurrentIndexが0で必要だから読み込む。
  
  next.addEventListener('click', () => {
    currentIndex++;
    updateButtons();
    const slideWidth = slides[0].getBoundingClientRect().width;
    //getBoundingClientRectで要素に関する情報を取得。その中のwidthプロパティを使用すればOK
    ul.style.transform = `translateX(${-1 * slideWidth * currentIndex }px)`;
    //ulをx軸方向に移動させる。 マイナス方向に移動させる。移動させる距離に対して何番目に移動させるかをかければいい。clickする度に増えるようにすればいい。
  });

  prev.addEventListener('click', () =>{
    currentIndex --;
    updateButtons();
    const slideWidth = slides[0].getBoundingClientRect().width;
    ul.style.transform = `translateX( ${-1 * slideWidth * currentIndex}px)`;
  });
}