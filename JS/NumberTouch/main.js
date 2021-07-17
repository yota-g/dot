'use strict';

{
  class Panel {
    constructor(game) {
      this.game = game; //PanelでGameのコンストラクターを使用できるようになった。
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', () => {
        this.check();
      });
    }
    getEl() {
      return this.el;
    }
    activate(num) {
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }
    check() {
      // if (currentNum === parseInt(this.el.textContent, 10)) {
      if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) {
        //10進数に数値化
        this.el.classList.add('pressed');
        // currentNum ++ ;
        this.game.addCurrentNum();
        // if (currentNum === 4) {
        if (this.game.getCurrentNum() === this.game.getLevel() ** 2 ) {
          clearTimeout(this.game.getTimeoutId());
          // clearTimeout(timeoutId);
        }
      }
    }
  }

  class Board {
    constructor(game) {
      this.game = game
      this.panels = [];
      // for (let i = 0; i < 4; i++) {
      for (let i = 0; i < this.game.getLevel()** 2 ;  i++) {
        this.panels.push(new Panel(game));
      }
      this.setup();
    }

    setup() {
      const board = document.getElementById('board');
      this.panels.forEach((panel) => {
        // board.appendChild(panel.el); 直で入れない方がいい。
        board.appendChild(panel.getEl());
        //カプセル化という。
      });
    }

    activate() {
      const nums = [];
      // const nums = [0, 1, 2, 3];
      for ( let i = 0; i < this.game.getLevel() ** 2 ; i++) {
        nums.push(i);
      }
      
      this.panels.forEach((panel) => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        //spliceの返り値は配列なので0がいる。
        panel.activate(num);
      });
    }
  }

  // function runTimer() {
  //   const timer = document.getElementById('timer');
  //   timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2);
    //小数点以下2桁まで表示するためにtoFixedをする
  //   timeoutId = setTimeout(() => {
  //     runTimer();
  //   }, 10);
  // }

  class Game {
    constructor(level) {
      this.level = level;
      this.board = new Board(this);
      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined;

      const btn = document.getElementById('btn');
      btn.addEventListener('click', () => {
        this.start();
      });
      this.setUp();
    }

    getLevel(){
      return this.level;
    }

    setUp() {
      const container = document.getElementById('container');
      const PANEL_WIDTH = 50;
      const BOARD_PADDING= 10;
      container.style.width = PANEL_WIDTH * this.level  + BOARD_PADDING * 2 + 'px';
    }

    start() {
      if (typeof this.timeoutId !== 'undefined') {
        clearTimeout(this.timeoutId);
      }
      this.currentNum = 0;
      this.board.activate();
      this.startTime = Date.now();
      this.runTimer();
    }

    runTimer() {
      const timer = document.getElementById('timer');
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
      //小数点以下2桁まで表示するためにtoFixedをする
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }
    addCurrentNum () {
      this.currentNum ++;
    }
    getCurrentNum() {
      return this.currentNum;
    }

    getTimeoutId () {
      return this.timeoutId;
    }
  }
  new Game(3);

  // const board = new Board();
  // let currentNum;
  // let startTime;
  // let timeoutId;
  // const btn = document.getElementById('btn');
  // btn.addEventListener('click', () => {
  //   if (typeof timeoutId !== 'undefined') {
  //     clearTimeout(timeoutId);
  //   }
  //   currentNum = 0;
  //   board.activate();
  //   startTime = Date.now();
  //   runTimer();
  // });
}
