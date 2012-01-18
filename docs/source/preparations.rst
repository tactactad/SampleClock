==============================
作業を始めるその前に。
==============================

実際の制作作業に入る前にindex.html、js/sampleClock.jsの中を覗いておきましょう。見た目や構造を勝手に用意していますので、それの説明をします。このガイドブックはこの構造をベースに説明していきますので、釈然としない部分があっても片目をつむってください。我慢ならない場合は逸脱してもいいですよ。

index.html
==============================

.. code-block:: html

 <canvas id="board"></canvas>
 <canvas id="time"></canvas>

それぞれにid属性を振った *canvas* 要素を二つ用意しています。id属性boardのcanvas要素を文字盤用に、id属性timeの方のcanvasを時計の針用に使うもくろみです。一つのcanvas要素に文字盤、時刻両方を描画する事も可能ですが、時刻を更新する度に毎回毎回描画するのが無駄に思えたので切り分けてみました。

この二つのcanvas要素は同じ大きさで重ねて表示されるように調整します。

.. warning::

 canvas要素の大きさの調整は *JavaScript* で、表示位置は *CSS* で行います。

.. note::

 今回は13行という驚き（？）の短さです。その分、JavaScriptの方で頑張りますよ :-)

js/sampleClock.js
==============================

.. code-block:: javascript

 function SampleClock() {
     try {
         this.board = document.getElementById('board');
         this.boardContext = this.board.getContext('2d');
         this.canvas = document.getElementById('time');
         this.context = this.canvas.getContext('2d');

         this.draw_board();
     } catch (e) {
         alert('initialize error...');
     }
 }

SampleCalcのときと同じく、まず最初に **new** を使って呼び出される事を想定した **コンストラクタ** 関数を用意しています。二つのcanvas要素にアクセスできるように内部変数を初期化しています。最後に文字盤を描画する事を想定してる **メソッド** を呼び出します。

* board
    文字盤用のcanvas要素を保持する。
* boardContext
    文字盤用のcanvas要素を操作するための2Dコンテキストを保持する。
* canvas
    時計の針用のcanvas要素を保持する。
* context
    時計の針用のcanvas要素を操作するための2Dコンテキストを保持する。

.. note::

 **new** で何が起こっているかは、 `作業を始めるその前に。 — SampleCalc work guide 1.1 documentation <http://reiare.net/site_media/file/20111217/WorkGuide/preparations.html#js-samplecalc-js>`_ で少し触れているので参考にしてください。

 次にprototype継承を用いて値を返したり処理を行ったりするメソッドの定義が行われています。これらのメソッドは私が試作の段階で想定したもので、canvas要素の大きさ、ラジアンの算出、実際に描画するメソッドなどがあります。

.. code-block:: javascript

 SampleClock.prototype = {
     width: function () {
     },
     height: function () {
     },
     radius: function () {
     },

     toRad: function (angle) {
     },
     hourRad: function (datetime) {
     },
     minuteRad: function (datetime) {
     },
     secondRad: function (datetime) {
     },

     draw_time: function () {
     },
     draw_board: function () {
     }
 };

* width
* height
* radius
* toRad
* hourRad
* minuteRad
* secondRad
* draw_time
* draw_board

.. code-block:: javascript

 var clock = new SampleClock();
 var timer;

 function tik() {
     clock.draw_time();
     timer = setTimeout('tik()', 1000 / 600);
 }

 function tok() {
     clearInterval(timer);
 }

 //tik();
