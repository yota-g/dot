'use strict';

{
  class Panel {
    constructor() {
      const section = document.createElement('section');
      //セクションはコンストラクターの中でしか使用しないから変数にしている。
      section.classList.add('panel');
      this.img = document.createElement('img');
      // this.img.src = './img/seven.png';
      this.img.src = this.getRandomImage();
      this.timeoutId = undefined;
      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');
      this.stop.addEventListener('click', () =>{
        if(this.stop.classList.contains('inactive')){
          return ;
        }
        this.stop.classList.add('inactive');
        clearTimeout(this.timeoutId)
        //setTimeoutをクリアする。
        panelsLeft --;

        if (panelsLeft === 0 ) {
          spin.classList.remove('inactive');
          paneslLeft = 3;
          checkResult();
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector('main');
      main.appendChild(section);
    }
    getRandomImage() {
      const images = ['./img/bell.png', './img/cherry.png', './img/seven.png'];
      return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout ( () => {
        this.spin();
      },50)

    }

    isUnmatched(p1, p2){
      // if(this.img.src !== p1.img.src && this.img.src !== p2.img.src){
      //   return true;
      // }else {
      //   return false;
      // }
      //上下どちらでもいける。
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch() {
      this.img.classList.add('unmatched');
    }
    
    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }
  }

  function checkResult () {
    if (panels[0].isUnmatched(panels[1], panels[2])){
    //引数とマッチしなかった場合は、その部分を薄くする。
    panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0],panels[2])){
    panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])){
    panels[2].unmatch();
    }
  }

  const panels = [new Panel(), new Panel(), new Panel()];

  let panelsLeft = 3;

  //spinボタンを押すとスロットが回るようにする。
  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    if (spin.classList.contains('inactive')){
      return ;
    }
    spin.classList.add('inactive');
    panels.forEach((panel) => {
      panel.activate();
      panel.spin();
      //spinメソッドをクラスに定義
    });
  });


}
