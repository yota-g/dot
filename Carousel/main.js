'use strict';

{
  const next = document.getElementById('next');
  const ul = document.querySelector('ul');
  const slides = ul.children;
  //一旦全てのスライドを取得しそれを使用して使っていく。。
  
  next.addEventListener('click', () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    //getBoundingClientRectで要素に関する情報を取得。その中のwidthプロパティを使用すればOK
    ul.style.transform = `translateX(${-1 * slideWidth}px)`;
    //ulをx軸方向に移動させる。 マイナス方向に移動させる。

  })
}