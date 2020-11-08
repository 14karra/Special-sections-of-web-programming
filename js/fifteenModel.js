let Model = function () {
    this.movements = {
        39: {'name': 'left', 'move': (sound) => { this.go(this.objects.move.left, sound); } },
        37: {'name': 'right', 'move': (sound) => { this.go(this.objects.move.right, sound); } },
        40: {'name': 'up', 'move': (sound) => { this.go(this.objects.move.up, sound); } },
        38: {'name': 'down', 'move': (sound) => { this.go(this.objects.move.down, sound); } }
    };
};
Model.prototype.init = function (needRendering, gameWon) {
    this.objects = {
        move: {up: -1 * SQUARE_SIZE, left: -1, down: SQUARE_SIZE, right: 1},
        order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
            .sort(function () {
                return Math.random() - .5;})
            .concat(0),
        hole: 15,
        needRendering: needRendering,
        gameWon: gameWon
    };
};
Model.prototype.checkIsCompleted = function () {
    return !this.objects.order.some(function (item, i) {
        return item > 0 && item - 1 !== i;
    });
};
Model.prototype.go = function (move, sound) {
    let index = this.objects.hole + move;
    if (!this.objects.order[index]) return false;
    if (this.movementImpossible(move, index)) return false;
    this.swap(index, this.objects.hole);
    this.objects.hole = index;
    sound.play();
    if (this.checkIsCompleted()) {
        this.objects.gameWon();
    } else {
        this.objects.needRendering();
    }
    return true;
};
Model.prototype.movementImpossible = function (move, index) {
    return (move === this.objects.move.left || move === this.objects.move.right) &&
        (Math.floor(this.objects.hole / SQUARE_SIZE) !== Math.floor(index / SQUARE_SIZE));
};
Model.prototype.swap = function (i1, i2) {
    let t = this.objects.order[i1];
    this.objects.order[i1] = this.objects.order[i2];
    this.objects.order[i2] = t;
};
Model.prototype.keyPress = function (e, sound) {
    if (e.keyCode in this.movements) {
        this.movements[e.keyCode].move(sound);
    }
};

let fifteenModel = new Model();