'user strinct';

{
  function setWord() {
    // word = words[Math.floor(Math.random() * words.length)];
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    //配列から取り出して、ランダムにセットをする。spliceは配列で取り出されるので配列の数字を指定することが必要。
    target.textContent = word;
    loc = 0;
  }
  const words = ['red', 'blue', 'pink'];
  // const word = 'red';
  let word;
  let loc = 0;
  let startTime;
  let isPlaying =false;
  //location  今何文字目かを示している。
  const target = document.getElementById('target');

  // word = words[Math.floor(Math.random() * words.length)];
  //最後まで言ったら次の文字にいくようにする。
  // target.textContent = word;
  // setWord();

  //文字を打っている段階でもクリックできるのでをこの不具合を直す。
  document.addEventListener('click', () => {
    if (isPlaying === true ) {
      return; 
      //始まっていたらクリックはできないようにする。
    }
    isPlaying = true
    //スタート時刻を取得する
    startTime = Date.now();
    setWord();
  });

  //引数のeはキーを押した値を取得するため。
  document.addEventListener('keydown', (e) => {
    if (e.key !== word[loc]) {
      return;
      //打ったキーが間違っていたらすぐ返すようにする。
      // そうすると打ったキーが正解というのを保証できるので下の条件分岐をなくすことができる。
      //メインの処理以外を早めになくしてあげて、メインの処理をわかりやすくするのをアーリーリータン・早期リターンという。
    }
    // const target = document.getElementById('target');
    //target.textContent = e.key;
    //「key」と「keyCode」はデバイスの英字入力設定に依存して大文字・小文字を区別して取得しますのでいずれの場合も処理したい場合は大文字・小文字の両方を判別フラグに含める。
    // if (e.key === word[loc]){
    loc++;

    //1: _ed;
    //2: __d;
    //3: ___ のようにlocが進むにつれなる。
    target.textContent = '_'.repeat(loc) + word.substring(loc);
    //substringはloc番目以降の文字を取得する。結合して表示するようにする。
    //異なる文字列を押しても反応しない。
    // }
    if (loc === word.length) {
      if (words.length === 0) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        //小数点以下の表示桁数を指定。
        //m秒単位なので1000で割る必要がある。
        const result = document.getElementById('result');
        result.textContent = `Finished! ${elapsedTime} seconds!`;
        return; //ここで処理が終わるようにする。
      }
      setWord();
    }
  });
}
