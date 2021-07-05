'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {
    // console.log(Date.now() - startTime);
    const d = new Date(Date.now() - startTime + elapsedTime);
    //差を時間として取得する
    const m = String(d.getMinutes()).padStart(2, '0');
    //桁数指定する時にpadStartを使用する。そしてその前のものはStringにする。
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutId = setTimeout(() => {
      countUp(); //10ミリ秒ごとにcountUpが表示される。
    }, 10);
  }

  // 2回以上連打で推せてしまうので押せないようにしないといけないので、そこを押せないようにする設定を行う。そのための関数を作成する。
  //disabledがtrueになるとボタンを無効化できる。
  function setButtonStateInitial() {
    // start.disabled = false;
    // stop.disabled = true;
    // reset.disabled = true;
    //buttonタグならこのdisabledをつけていればhtmlのボタンの表示非表示ができたけどdivに変えたのでそれでは対応できないようになったのでクラス追加で対応する。
    start.classList.remove('inactive')
    stop.classList.add('inactive');
    reset.classList.add('inactive');

  }
  function setButtonStateRunning() {
    // start.disabled = true;
    // stop.disabled = false;
    // reset.disabled = true;
    start.classList.add('inactive');
    stop.classList.remove('inactive')
    reset.classList.add('inactive');
  }
  function setButtonStateStopped() {
    // start.disabled = false;
    // stop.disabled = true;
    // reset.disabled = false;
    start.classList.remove('inactive')
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

setButtonStateInitial();
//ページを読み込んだ時の挙動を設定。

  start.addEventListener('click', () => {
    if(start.classList.contains('inactive') === true){
      return ;
      //それ以上の処理をしないようにする
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  stop.addEventListener('click', () => {
    if(stop.classList.contains('inactive') === true){
      return ;
      //それ以上の処理をしないようにする
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    //押したタイミングでストップすることが可能。
    //処理を止めるからclear
    elapsedTime += Date.now() - startTime;
  });

  reset.addEventListener('click', () => {
    if(reset.classList.contains('inactive') === true){
      return ;
      //それ以上の処理をしないようにする
    }
    setButtonStateInitial();
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  });

  //ボタンに対してdisabledを設定していく。
}
