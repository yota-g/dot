'use strict';

{ 
  const images = [
    'img/pic00.png', 
    'img/pic01.png', 
    'img/pic02.png', 
    'img/pic03.png', 
    'img/pic04.png', 
    'img/pic05.png', 
    'img/pic06.png', 
    'img/pic07.png'
  ];

  let currentIndex = 0;
  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];
  
  //indexは配列の何番目かを示している。
  images.forEach( (image, index) => {
    const img = document.createElement('img');
    img.src = image;
    const li = document.createElement('li');
    if (index === currentIndex ){
      li.classList.add('current');
    };

    li.addEventListener('click', () => {
      mainImage.src = image;
      const thumbnail = document.querySelectorAll('.thumbnails > li');
    thumbnail[currentIndex].classList.remove('current');
    currentIndex = index;
    thumbnail[currentIndex].classList.add('current');
    })

    li.appendChild(img);
    document.querySelector('.thumbnails').appendChild(li);
  });

  const next = document.getElementById('next');
  next.addEventListener ( 'click', () => {
    let target = currentIndex + 1;
    if (target === images.length) {
      target = 0;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  //要素に対してクリックを記載すると前回記載したclickと同じ挙動になるのでそれを応用する。
  });

  const prev = document.getElementById('prev');

  prev.addEventListener('click', () => {
    let target = currentIndex - 1;
    if (target < 0 ){
      target = images.length -1;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  });
  
  let timeOutId;
  //setTimeoutをクリアするための変数

  function playSlideShow() {
    timeOutId = setTimeout(() => {
      next.click();
      playSlideShow();
    }, 2000);
  }

  let isPlaying = false;

  const play = document.getElementById('play');
  play.addEventListener ('click', () =>{
    if (isPlaying === false ) {
      playSlideShow();
      play.textContent = 'Pause';
    }else {
      clearTimeout(timeOutId);
      play.textContent = 'Play';
    }
    isPlaying = !isPlaying;
  })
}