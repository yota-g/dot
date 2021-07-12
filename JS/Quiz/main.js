'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle( [
    { q: '世界で一番大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖'] },
    { q: '2の8乗は？', c: ['256', '64', '1028'] },
    { q: '次のうち、最初にリリースされた言語は？', c: ['Python', 'JavaScript', 'HTML'] },
  ]);

  //何問目なのかを確認できるようにその情報を配列で持っておく。
  let currentNum = 0;
  let isAnswered;
  let score = 0;
  function shuffle(arr) {
    //jsの分割代入を実施。iとjを入れ替えた配列を配列に入れる。
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  // const shuffledChoices = shuffle(quizSet[currentNum].c);
  // const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  //データの配列が変わって、正誤判定がおかしくなってしまう。変数を関数に渡すと大元の変数を変更してしまう。
  //shuffleに渡すのは値のコピーにするスプレッド演算子を渡して配列に入れることで防げる。

  function checkAnswer(li) {
    // if (  isAnswered === true) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      // console.log('correct');
      li.classList.add('correct');
      score++;
    } else {
      // console.log('wrong');
      li.classList.add('wrong');
    }
    btn.classList.remove('disabled');
  }

  // console.log(quizSet[currentNum].c);
  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
    //choicesの中の値がなくなるまでwhile文がループされる。
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    // quizSet[currentNum].c.forEach( choice => {
    shuffledChoices.forEach((choice) => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }
  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');
    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score : ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
      // console.log(`Score : ${score} / ${quizSet.length}`);
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
