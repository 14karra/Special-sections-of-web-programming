let Model = function () {
    this.movements = {
        39: {'name': 'left', 'move': (sound) => { this.go(this.Move.left, sound); } },
        37: {'name': 'right', 'move': (sound) => { this.go(this.Move.right, sound); } },
        40: {'name': 'up', 'move': (sound) => { this.go(this.Move.up, sound); } },
        38: {'name': 'down', 'move': (sound) => { this.go(this.Move.down, sound); } }
    };
    this.squareSize = 4;
};
Model.prototype.init = function (needRendering, gameWon) {
    this.Move = {up: -1 * this.squareSize, left: -1, down: this.squareSize, right: 1};
    this.order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function () {
        return Math.random() - .5;
    }).concat(0);
    this.hole = 15;
    this.needRendering = needRendering;
    this.gameWon = gameWon;
};
Model.prototype.checkIsCompleted = function () {
    return !this.order.some(function (item, i) {
        return item > 0 && item - 1 !== i;
    });
};
Model.prototype.go = function (move, sound) {
    var index = this.hole + move;
    if (!this.order[index]) return false;
    if (this.movementImpossible(move, index)) return false;
    this.swap(index, this.hole);
    this.hole = index;
    sound.play();
    if (this.checkIsCompleted()) {
        this.gameWon();
    } else {
        this.needRendering();
    }
    return true;
};
Model.prototype.movementImpossible = function (move, index) {
    return (move === this.Move.left || move === this.Move.right) &&
        (Math.floor(this.hole / this.squareSize) !== Math.floor(index / this.squareSize));
};
Model.prototype.swap = function (i1, i2) {
    var t = this.order[i1];
    this.order[i1] = this.order[i2];
    this.order[i2] = t;
};
Model.prototype.keyPress = function (e, sound) {
    if (e.keyCode in this.movements) {
        this.movements[e.keyCode].move(sound);
    }
};

let fifteenModel = new Model();