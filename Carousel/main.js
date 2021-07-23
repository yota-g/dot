'use strict';

{
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul = document.querySelector('ul');
  const slides = ul.children;
  //一旦全てのスライドを取得しそれを使用して使っていく。。
  let currentIndex = 0;
  const dots = [];

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

  function moveSlides() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    ul.style.transform = `translateX( ${-1 * slideWidth * currentIndex}px)`;
  }

  function setupDots() {
    for (let i = 0; i < slides.length; i ++){
      const button = document.createElement('button');
      button.addEventListener('click', () => {
        currentIndex = i;
        updateDots();
        updateButtons();
        moveSlides();
      })
      dots.push(button);
      // 後で処理ができるようにdosに格納
      document.querySelector('nav').appendChild(button);
    }
    dots[0].classList.add('current');
  }

  function updateDots() {
    dots.forEach( dot => {
      dot.classList.remove('current');
    })
    dots[currentIndex].classList.add('current');
  }
  updateButtons();
  //ページを読み込んだ時にcurrentIndexが0で必要
  setupDots();
  
  next.addEventListener('click', () => {
    currentIndex++;
    updateButtons();
    updateDots();
    moveSlides();
    // const slideWidth = slides[0].getBoundingClientRect().width;
    // //getBoundingClientRectで要素に関する情報を取得。その中のwidthプロパティを使用すればOK
    // ul.style.transform = `translateX(${-1 * slideWidth * currentIndex }px)`;
    // //ulをx軸方向に移動させる。 マイナス方向に移動させる。移動させる距離に対して何番目に移動させるかをかければいい。clickする度に増えるようにすればいい。
  });

  prev.addEventListener('click', () =>{
    currentIndex --;
    updateButtons();
    updateDots();
    moveSlides();
    // const slideWidth = slides[0].getBoundingClientRect().width;
    // ul.style.transform = `translateX( ${-1 * slideWidth * currentIndex}px)`;
  });

  window.addEventListener('resize', () => {
    moveSlides();
    // スライドの幅を再計算することで幅を変えたときに他の要素が入り込むのを防ぐことができる。
  });
}