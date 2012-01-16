var clock = new SampleClock();
module('initialize');
test('initialize', function () {
    expect(4);
    deepEqual(clock.board.id, 'board');
    deepEqual(clock.canvas.id, 'time');
    deepEqual(clock.canvas.width, window.innerWidth);
    deepEqual(clock.canvas.height, window.innerHeight);
});

module('property');
test('size', function () {
    expect(3);
    deepEqual(clock.width(), window.innerWidth);
    deepEqual(clock.height(), window.innerHeight);
    deepEqual(clock.radius(), Math.min(window.innerWidth / 2, window.innerHeight / 2));
});

module('rad');
test('rad', function () {
    deepEqual(clock.toRad(360), Math.PI * 2);
});
