let Controller = function (View, Model) {
    this.fifteenView = View;
    this.fifteenModel = Model;
};
Controller.prototype.init = function() {
    this.fifteenView.onKeyDownEvent = this.moving.bind(this);
    this.fifteenView.init();
    this.fifteenModel.init(this.needRendering.bind(this), this.gameWon.bind(this));
    this.needRendering();
};
Controller.prototype.moving = function(e) {
    this.fifteenModel.keyPress(e, this.fifteenView.pieceMoveSound);
};
Controller.prototype.needRendering = function(){
    this.fifteenView.render(this.fifteenModel.objects);
};
Controller.prototype.gameWon = function (){
    this.fifteenView.solvedSound.play();
    let ctx = this.fifteenView.canvas.getContext("2d");

    ctx.strokeStyle = 'rgb(229,209,96)';
    ctx.lineWidth = this.fifteenView.canvas.border;
    ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);

    document.removeEventListener('keydown', this.fifteenView.onKeyDownEvent);
    this.fifteenView.mainSound.stop();
    this.needRendering();
};

let marioController = new Controller(fifteenView, fifteenModel);
marioController.init();
