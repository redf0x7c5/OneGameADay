var GameCanvas = (function () {
    function GameCanvas() {
        var _this = this;
        this.entities = new Array();
        this.time = new GameTime();

        var stick = new Stick();
        this.entities.push(stick);

        this.canvasElement = document.getElementById("game-canvas");
        this.canvasElement.onmousemove = function (e) {
            return stick.onMouseMove(e);
        };

        this.canvas = this.canvasElement.getContext('2d');
        window.requestAnimationFrame(function (dt) {
            return _this.update(dt);
        });
    }
    GameCanvas.prototype.update = function (dt) {
        var _this = this;
        this.time.deltaTime = dt;
        this.time.totalTime = this.time.totalTime + dt;

        this.canvas.clearRect(0, 0, 600, 400);
        this.entities.forEach(function (ge) {
            ge.update(_this.time);
            ge.draw(_this.canvas);
        });

        window.requestAnimationFrame(function (dt) {
            return _this.update(dt);
        });
    };
    return GameCanvas;
})();

var GameTime = (function () {
    function GameTime() {
        this.totalTime = 0;
        this.deltaTime = 0;
    }
    return GameTime;
})();

var Stick = (function () {
    function Stick() {
        this.max_angle = 15;
        this.prev_x_pos = 0;

        this.x = 0;
        this.y = 300;
    }
    Stick.prototype.update = function (dt) {
    };

    Stick.prototype.draw = function (gc) {
        gc.fillStyle = "rgb(200,0,0)";
        gc.fillRect(this.x, this.y, 100, 20);
    };

    Stick.prototype.onMouseMove = function (event) {
        var x = event.pageX;
        this.x = x;

        this.speed = this.prev_x_pos - x;

        this.angle = Math.max(-this.max_angle, Math.min(this.max_angle, this.speed));

        this.prev_x_pos = x;
    };
    return Stick;
})();

var Ball = (function () {
    function Ball() {
    }
    return Ball;
})();

var gameCanvas;

window.onload = function () {
    gameCanvas = new GameCanvas();
};
//# sourceMappingURL=app.js.map
