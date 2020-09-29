let Model = function () {
    this.movements = {
        39: 'left',
        37: 'right',
        40: 'up',
        38: 'down'
    };
};
Model.prototype.init = function (needRendering, gameWon) {
    this.Move = {up: -4, left: -1, down: 4, right: 1};
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
    if (move === this.Move.left || move === this.Move.right)
        if (Math.floor(this.hole / 4) !== Math.floor(index / 4)) return false;
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
Model.prototype.swap = function (i1, i2) {
    var t = this.order[i1];
    this.order[i1] = this.order[i2];
    this.order[i2] = t;
};
Model.prototype.keyPress = function (e, sound) {
    if (e.keyCode in this.movements) {
        switch (e.keyCode) {
            case 39:
                this.go(this.Move.left, sound);
                break;
            case 37:
                this.go(this.Move.right, sound);
                break;
            case 40:
                this.go(this.Move.up, sound);
                break;
            case 38:
                this.go(this.Move.down, sound);
                break;
        }
    }
};

let fifteenModel = new Model();