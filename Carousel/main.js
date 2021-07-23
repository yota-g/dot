'use strict';

{
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul = document.querySelector('ul');
  const slides = ul.children;
  //一旦全てのスライドを取得しそれを使用して使っていく。。
  let currentIndex = 0;
  
  next.addEventListener('click', () => {
    currentIndex++;
    const slideWidth = slides[0].getBoundingClientRect().width;
    //getBoundingClientRectで要素に関する情報を取得。その中のwidthプロパティを使用すればOK
    ul.style.transform = `translateX(${-1 * slideWidth * currentIndex }px)`;
    //ulをx軸方向に移動させる。 マイナス方向に移動させる。移動させる距離に対して何番目に移動させるかをかければいい。clickする度に増えるようにすればいい。

  });

  prev.addEventListener('click', () =>{
    currentIndex --;
    const slideWidth = slides[0].getBoundingClientRect().width;
    ul.style.transform = `translateX( ${-1 * slideWidth * currentIndex}px)`;
  });
}