let FifteenModel = function () {
};

FifteenModel.prototype.init = function () {
    this.Move = {up: -4, left: -1, down: 4, right: 1};
    this.order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function () {
        return Math.random() - .5;
    }).concat(0);
    this.hole = 15;
};

FifteenModel.prototype.checkIsCompleted = function () {
    return !this.order.some(function (item, i) {
        return item > 0 && item - 1 !== i;
    });
};
FifteenModel.prototype.go = function (move) {
    var index = this.hole + move;
    if (!this.order[index]) return false;
    if (move === this.Move.left || move === this.Move.right)
        if (Math.floor(this.hole / 4) !== Math.floor(index / 4)) return false;
    this.swap(index, this.hole);
    this.hole = index;
    return true;
};
FifteenModel.prototype.swap = function (i1, i2) {
    var t = this.order[i1];
    this.order[i1] = this.order[i2];
    this.order[i2] = t;
};
FifteenModel.prototype.solvable = function (a) {
    for (var kDisorder = 0, i = 1, len = a.length - 1; i < len; i++)
        for (var j = i - 1; j >= 0; j--)
            if (a[j] > a[i]) kDisorder++;
    return !(kDisorder % 2);
};
FifteenModel.prototype.addEventListener = function () {
    let obj = this;
    window.addEventListener('keydown', function (e) {
        if (obj.go(obj.Move[{
            39: 'left',
            37: 'right',
            40: 'up',
            38: 'down'
        } [e.keyCode]])) {
            let sound = document.querySelector("#pieceMove");
            sound.play();
            obj.draw();
            if (obj.checkIsCompleted()) {
                let sound = document.querySelector("#solved");
                sound.play();
                mainScene.style.backgroundColor = "gold";
                window.removeEventListener('keydown', arguments.callee);
            }
        }
    });
};
FifteenModel.prototype.draw = function () {
    for (let i = 0, childDivs; childDivs = mainScene.children[i], i < 16; i++) {
        childDivs.textContent = fifteenModel.order[i];
        childDivs.style.visibility = fifteenModel.order[i] ? 'visible' : 'hidden';
    }
};

let fifteenModel = new FifteenModel();

fifteenModel.init();

if (!fifteenModel.solvable(fifteenModel.order)) fifteenModel.swap(0, 1);
let mainScene = document.querySelector("#mainScene");
for (let i = 0; i < 16; i++) mainScene.appendChild(document.createElement("div"));

fifteenModel.addEventListener();

fifteenModel.draw();