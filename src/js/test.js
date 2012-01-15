var clock = new SampleClock();
module('initialize');
test('initialize', function () {
    expect(3);
    deepEqual(clock.canvas.id, 'board');
    deepEqual(clock.canvas.width, window.innerWidth);
    deepEqual(clock.canvas.height, window.innerHeight);
});

module('property');
test('size', function () {
    expect(2);
    deepEqual(clock.width(), window.innerWidth);
    deepEqual(clock.height(), window.innerHeight);
});

module('rad');
test('rad', function () {
    deepEqual(clock.toRad(360), Math.PI * 2);
});
