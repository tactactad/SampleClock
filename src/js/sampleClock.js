function SampleClock() {
    try {
        this.board = document.getElementById('board');
        this.boardContext = this.board.getContext('2d');
        this.canvas = document.getElementById('time');
        this.context = this.canvas.getContext('2d');
        this.board.width = this.canvas.width = window.innerWidth;
        this.board.height = this.canvas.height = window.innerHeight;

        this.boardContext.translate(this.width() / 2, this.height() / 2);
        this.context.translate(this.width() / 2, this.height() / 2);

        this.draw_clock();
    } catch (e) {
        alert('initialize error...');
    }
}
SampleClock.prototype = {
    width: function () {
        return this.canvas.width;
    },
    height: function () {
        return this.canvas.height;
    },
    radius: function () {
        return Math.min(this.width() / 2, this.height() / 2);
    },
    toRad: function (angle) {
        return Math.PI / 180 * angle;
    },
    hourRad: function (time) {
    },
    minutuRad: function (time) {
    },
    secondRad: function (time) {
    },

    draw_time: function () {
    },

    draw_clock: function () {
        console.log('start draw clock...');
        this.boardContext.beginPath();
        this.boardContext.scale(0.9, 0.9);
        this.boardContext.lineWidth = this.radius() * 0.05;
        this.boardContext.shadowBlur = this.radius() * 0.012;
        this.boardContext.shadowColor = '#666666';
        this.boardContext.arc(0, 0, this.radius(), 0, Math.PI * 2, true);
        this.boardContext.stroke();

        // 時の印
        this.boardContext.beginPath();
        this.boardContext.scale(0.9, 0.9);
        this.boardContext.lineWidth = this.radius() * 0.03;
        this.boardContext.lineCap = 'round';
        for (var i = 0; i < 12; i++) {
            this.boardContext.moveTo(this.radius(), 0);
            this.boardContext.lineTo(this.radius() * 0.9, 0);
            this.boardContext.rotate(this.toRad(30));
        }
        this.boardContext.stroke();

        // 分の印
        this.boardContext.beginPath();
        this.boardContext.lineWidth = this.radius() * 0.02;
        for (var i = 0; i < 60; i++) {
            if (i % 5 !== 0) {
                this.boardContext.moveTo(this.radius(), 0);
                this.boardContext.lineTo(this.radius() * 0.97, 0);
            }
            this.boardContext.rotate(this.toRad(6));
        }
        this.boardContext.stroke();

        console.log('end draw clock...');
    }
};

var clock = new SampleClock();

