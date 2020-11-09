let View = function () {
    this.pieceMoveSound = document.querySelector("#pieceMove");
    this.solvedSound = document.querySelector("#solved");
    this.mainSound = document.querySelector("#mainSound");
    this.canvas = document.querySelector(".canvas");
    if (this.canvas.getContext) {
        this.ctx = this.canvas.getContext("2d");
    } else {
        // canvas-unsupported code here
    }
    this.onKeyDownEvent = null;
};
View.prototype.init = function () {
    document.addEventListener('keydown', this.onKeyDownEvent);
};
View.prototype.render = function (objects) {
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    if (objects.hasWonTheGame) {
        this.ctx.strokeStyle = 'rgb(229,209,96)';
    } else {
        this.ctx.strokeStyle = 'rgb(175, 0, 0)';
    }
    this.ctx.lineWidth = CANVAS_BORDER;
    this.ctx.fillStyle = 'rgb(194, 174, 176)';
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);


    for (let columnIndex = 0; columnIndex < SQUARE_SIZE; columnIndex++) {
        for (let lineIndex = 0; lineIndex < SQUARE_SIZE; lineIndex++) {
            let orderIndex = lineIndex * SQUARE_SIZE + columnIndex;

            if (orderIndex === objects.hole) continue;

            let r = 16 * objects.order[orderIndex];
            this.ctx.fillStyle = 'rgb(' + r + ',' + r + ',' + r + ')';

            let piece_X = columnIndex * PIECE_SIDE + 20;
            let piece_y = lineIndex * PIECE_SIDE + 20;
            this.ctx.fillRect(piece_X, piece_y, PIECE_SIDE, PIECE_SIDE);

            this.ctx.font = 'bold 20pt Arial';
            this.ctx.fillStyle = 'rgb(175, 0, 0)';
            this.ctx.fillText(
                objects.order[orderIndex],
                piece_X + (PIECE_SIDE / 2) - 10,
                piece_y + (PIECE_SIDE / 2) + 10,
            );
        }
    }
};

let fifteenView = new View();