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
        this.context.rotate(-Math.PI / 2);

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
        var h = time.getHours();
        h = (h < 12) ? h : h - 12;
        var m = time.getMinutes();
        // console.log('h = ' + h + ', ' + 'm = ' + m);
        return this.toRad((360 / 12) * h + (360 / 12 / 60) * m);
    },
    minuteRad: function (time) {
        var m = time.getMinutes();
        var s = time.getSeconds();
        // console.log('m = ' + m + ', ' + 's = ' + s);
        return this.toRad((360 /  60) * m + (360 / 60 / 60) * s);
    },
    secondRad: function (time) {
        var s = time.getSeconds();
        var ms = time.getMilliseconds();
        // console.log('s = ' + s + ', ' + 'ms = ' + ms);
        return this.toRad((360 / 60) * s + (360 / 60 / 1000) * ms);
        // return this.toRad(6 * s);
    },

    draw_time: function () {
        this.context.clearRect(-this.width() / 2, -this.height() / 2, this.width(), this.height());
        this.context.lineCap = 'round';
        this.context.shadowBlur = this.radius() * 0.012;
        this.context.shadowColor = 'rgba(0, 0, 0, 0.5)';
        var now = new Date();

        // 短針
        var rad = this.hourRad(now);
        // console.log('短針のradiusは' + rad);
        this.context.save();
        this.context.beginPath();
        this.context.lineWidth = this.radius() * 0.06;
        this.context.rotate(rad);
        this.context.moveTo(-this.radius() * 0.05, 0);
        this.context.lineTo(this.radius() * 0.5, 0);
        this.context.stroke();
        this.context.restore();

        // 長針
        rad = this.minuteRad(now);
        // console.log('長針のradiusは' + rad);
        this.context.save();
        this.context.beginPath();
        this.context.lineWidth = this.radius() * 0.04;
        this.context.rotate(rad);
        this.context.moveTo(-this.radius() * 0.1, 0);
        this.context.lineTo(this.radius() * 0.75, 0);
        this.context.stroke();
        this.context.restore();

        // 秒針
        rad = this.secondRad(now);
        // console.log('秒針のradiusは' + rad);
        this.context.save();
        this.context.beginPath();
        this.context.lineWidth = this.radius() * 0.02;
        this.context.strokeStyle = '#ff0000';
        this.context.rotate(rad);
        this.context.moveTo(-this.radius() * 0.1, 0);
        this.context.lineTo(this.radius() * 0.8, 0);
        this.context.stroke();

        this.context.beginPath();
        this.context.shadowBlur = 0;
        this.context.arc(0, 0, this.radius() * 0.025, 0, Math.PI * 2, true);
        this.context.fillStyle = '#ff0000';
        this.context.fill();

        this.context.beginPath();
        this.context.arc(0, 0, this.radius() * 0.01, 0, Math.PI * 2, true);
        this.context.fillStyle = '#000000';
        this.context.fill();
        this.context.restore();
    },

    draw_clock: function () {
        this.boardContext.shadowBlur = this.radius() * 0.015;
        this.boardContext.shadowColor = 'rgba(0, 0, 0, 0.5)';

        this.boardContext.beginPath();
        this.boardContext.arc(0, 0, this.radius() * 0.05, 0, Math.PI * 2, true);
        this.boardContext.fill();

        this.boardContext.beginPath();
        this.boardContext.scale(0.9, 0.9);
        this.boardContext.lineWidth = this.radius() * 0.05;
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
            this.boardContext.rotate(this.toRad(360 / 12));
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
            this.boardContext.rotate(this.toRad(360 / 60));
        }
        this.boardContext.stroke();
    }
};

var clock = new SampleClock();
var timer;

function start() {
    timer = setInterval('clock.draw_time()', 1000 / 600);
}

function stop() {
    clearInterval(timer);
}

start();
