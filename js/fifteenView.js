let View = function () {
    this.mainScene = document.querySelector("#mainScene");
    this.pieceMoveSound = document.querySelector("#pieceMove");
    this.solvedSound = document.querySelector("#solved");
    this.mainSound = document.querySelector("mainSound" );
    this.onKeyDownEvent = null;
};
View.prototype.init = function () {
    for (let i = 0; i < 16; i++) this.mainScene.appendChild(document.createElement("div"));
    document.addEventListener('keydown', this.onKeyDownEvent);
};
View.prototype.render = function (order) {
    for (let i = 0, childDiv; childDiv = this.mainScene.children[i], i < 16; i++) {
        childDiv.textContent = order[i];
        childDiv.style.visibility = order[i] ? 'visible' : 'hidden';
    }
};

let fifteenView = new View();