function SampleClock(id) {
    try {
        if (!id) id = 'board';
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx.translate(this.width() / 2, this.height() / 2);
    } catch (e) {
        alert('Not found Canvas element.');
        return;
    }
}
SampleClock.prototype = {
    width: function () {
        return this.canvas.width;
    },
    height: function () {
        return this.canvas.height;
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
    draw_clock: function () {
        console.log('start draw clock...');
        console.log('end draw clock...');
    }
};

var clock = new SampleClock();
