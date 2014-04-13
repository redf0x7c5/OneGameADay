var GameCanvas = (function () {
    function GameCanvas() {
        var _this = this;
        this.entities = new Array();
        this.time = new GameTime();

        var stick = new Stick();
        this.entities.push(stick);

        this.entities.push(new Ball(200, 10, stick));

        this.canvasElement = document.getElementById("game-canvas");
        this.canvasElement.onmousemove = function (e) {
            return stick.onMouseMove(e);
        };

        this.canvas = this.canvasElement.getContext('2d');
        window.requestAnimationFrame(function (dt) {
            return _this.update(dt);
        });
    }
    GameCanvas.prototype.update = function (timeStamp) {
        var _this = this;
        this.time.deltaTime = timeStamp - (this.time.totalTime || timeStamp);
        this.time.totalTime = timeStamp;

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
        gc.save();

        gc.fillStyle = "rgb(200,0,0)";

        gc.translate(this.x, this.y);
        gc.rotate(-this.angle * (Math.PI / 180));
        gc.fillRect(-50, -10, 100, 20);

        gc.restore();
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
    function Ball(x, y, stick) {
        this.x = x;
        this.y = y;

        this.sx = 0;
        this.sy = 0;

        this.gravity = 10.0;
        this.stick = stick;

        this.bounceSpeed = 10;
    }
    Ball.prototype.update = function (dt) {
        this.sy += this.gravity * (dt.deltaTime / 1000);

        this.checkCollision(this.stick);

        this.x += this.sx;
        this.y += this.sy;

        if (this.x < 0 || this.x > 600) {
            this.sx *= -1;
            this.x += this.sx * 2;
        }
    };

    Ball.prototype.draw = function (gc) {
        gc.save();

        gc.fillStyle = "rgb(200,0,0)";
        gc.translate(this.x, this.y);
        gc.fillRect(-10, -10, 20, 20);

        gc.restore();
    };

    Ball.prototype.checkCollision = function (stick) {
        if (this.x > stick.x - 50 && this.x < stick.x + 50 && this.y > stick.y - 10 && this.y < stick.y + 10) {
            this.sx = -this.bounceSpeed * Math.sin(stick.angle * Math.PI / 180);
            this.sy = -this.bounceSpeed * Math.cos(stick.angle * Math.PI / 180);
        }
    };
    return Ball;
})();

var gameCanvas;

window.onload = function () {
    gameCanvas = new GameCanvas();
};
//# sourceMappingURL=app.js.map
