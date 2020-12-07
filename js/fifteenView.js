let View = function () {
    this.mainScene = document.querySelector("#mainScene");
    this.pieceMoveSound = document.querySelector("#pieceMove");
    this.solvedSound = document.querySelector("#solved");
    this.mainSound = document.querySelector("#mainSound");
    this.onKeyDownEvent = null;
};
View.prototype.init = function () {
    document.addEventListener('keydown', this.onKeyDownEvent);
};
View.prototype.render = function (objects) {
    while (this.mainScene.lastChild) {
        this.mainScene.removeChild(this.mainScene.lastChild);
    }

    if (objects.hasWonTheGame) {
        this.mainScene.style.backgroundColor = "gold";
    } else {
        this.mainScene.style.backgroundColor = 'cornsilk';
    }

    for (let columnIndex = 0; columnIndex < SQUARE_SIZE; columnIndex++) {
        for (let lineIndex = 0; lineIndex < SQUARE_SIZE; lineIndex++) {
            let orderIndex = lineIndex * SQUARE_SIZE + columnIndex;

            if (orderIndex === objects.hole) continue;

            let r = MIN_COLOR_BASE * objects.order[orderIndex];
            let piece_X = columnIndex * PIECE_SIDE + 20;
            let piece_y = lineIndex * PIECE_SIDE + 20;

            this.mainScene.appendChild(createRectPiece(piece_X, piece_y, r));

            this.mainScene.appendChild(createNbrText(piece_X, piece_y, objects.order[orderIndex]));
        }
    }
};

function createRectPiece(piece_x, piece_y, r) {
    let someRect = document.createElementNS(XML_NS, 'rect');
    someRect.setAttribute('x', String(piece_x));
    someRect.setAttribute('y', String(piece_y));
    someRect.setAttribute('rx', '10');
    someRect.setAttribute('ry', '10');
    someRect.setAttribute('width', String(PIECE_SIDE));
    someRect.setAttribute('height', String(PIECE_SIDE));
    someRect.setAttribute('style', 'fill: rgb(' + r + ',' + r + ',' + r + ');' +
        'stroke: black;stroke-width: 5;opacity: 0.5;');
    return someRect;
}

function createNbrText(piece_x, piece_y, nbr) {
    let squareNumber = document.createElementNS(XML_NS, 'text');
    squareNumber.setAttribute('x', String(piece_x + (PIECE_SIDE / 2) - 10));
    squareNumber.setAttribute('y', String(piece_y + (PIECE_SIDE / 2) + 10));
    squareNumber.setAttribute('fill', 'rgb(16,19,27)');
    squareNumber.style.fontSize = "30px";
    squareNumber.innerHTML = nbr;
    return squareNumber;
}

let fifteenView = new View();