var clock = new SampleClock();
module('initialize', {
    teardown: function () {
        stop();
    }
});
test('initialize', function () {
    expect(4);
    deepEqual(clock.board.id, 'board');
    deepEqual(clock.canvas.id, 'time');
    deepEqual(clock.canvas.width, window.innerWidth);
    deepEqual(clock.canvas.height, window.innerHeight);
});

module('property', {
    teardown: function () {
        stop();
    }
});
test('size', function () {
    expect(3);
    deepEqual(clock.width(), window.innerWidth);
    deepEqual(clock.height(), window.innerHeight);
    deepEqual(clock.radius(), Math.min(window.innerWidth / 2, window.innerHeight / 2));
});

module('rad', {
    setup: function () {
        this.date = new Date(2012, 1, 11, 15, 30, 45, 500);
    },
    teardown: function () {
        stop();
    }
});
test('rad', function () {
    expect(4);
    deepEqual(clock.toRad(360), Math.PI * 2);
    deepEqual(clock.hourRad(this.date), clock.toRad((360 / 12 * 3) + (360 / 12 / 60 * 30)));
    deepEqual(clock.minuteRad(this.date), clock.toRad((360 / 60 * 30) + (360 / 60 / 60 * 45)));
    deepEqual(clock.secondRad(this.date), clock.toRad((360 / 60 * 45) + (360 / 60 / 1000 * 500)));
});









