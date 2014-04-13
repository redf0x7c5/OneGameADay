
class GameCanvas {
    entities: GameEntity[];
    time: GameTime;
    canvas: CanvasRenderingContext2D;
    canvasElement: HTMLCanvasElement;

    constructor() {
        this.entities = new Array<GameEntity>();
        this.time = new GameTime();

        var stick: Stick = new Stick();
        this.entities.push(stick);

        this.entities.push(new Ball(200,10, stick));

        this.canvasElement = <HTMLCanvasElement> document.getElementById("game-canvas")
        this.canvasElement.onmousemove = (e) => stick.onMouseMove(e);

        this.canvas = this.canvasElement.getContext('2d');
        window.requestAnimationFrame((dt) => this.update(dt));
    }

    update(timeStamp: number) {
        this.time.deltaTime = timeStamp - (this.time.totalTime || timeStamp);
        this.time.totalTime = timeStamp;

        this.canvas.clearRect(0, 0, 600, 400);
        this.entities.forEach((ge: GameEntity) => { ge.update(this.time); ge.draw(this.canvas); } );

        window.requestAnimationFrame((dt) => this.update(dt));
    }
}

class GameTime {
    totalTime: number;
    deltaTime: number;

    constructor() {
        this.totalTime = 0;
        this.deltaTime = 0;
    }
}

interface GameEntity {
    x: number;
    y: number;

    sx: number;
    sy: number

    angle: number;

    update(dt: GameTime);
    draw(gc: CanvasRenderingContext2D);
}

class Stick implements GameEntity {
    x: number;
    y: number;

    sx: number;
    sy: number;

    angle: number;
    speed: number;

    max_angle: number;
    prev_x_pos: number;

    constructor() {
        this.max_angle = 15;
        this.prev_x_pos = 0;

        this.x = 0;
        this.y = 300;
    }

    update(dt: GameTime) {
        
    }

    draw(gc: CanvasRenderingContext2D) {

        gc.save();

        gc.fillStyle = "rgb(200,0,0)";

        gc.translate(this.x, this.y);
        gc.rotate(-this.angle * (Math.PI/180));
        gc.fillRect(-50, -10, 100, 20);

        gc.restore();
    }

    onMouseMove(event: MouseEvent) {
        var x = event.pageX;
        this.x = x;

        this.speed = this.prev_x_pos - x;

        this.angle = Math.max(-this.max_angle, Math.min(this.max_angle, this.speed));

        this.prev_x_pos = x;
    }
}

class Ball implements GameEntity {
    x: number;
    y: number;

    sx: number;
    sy: number

    angle: number;

    gravity: number;
    stick: Stick;
    bounceSpeed: number;

    constructor(x: number, y: number, stick: Stick) {
        this.x = x;
        this.y = y;

        this.sx = 0;
        this.sy = 0;

        this.gravity = 10.0;
        this.stick = stick;

        this.bounceSpeed = 10;
    }

    update(dt: GameTime) {
        this.sy += this.gravity * (dt.deltaTime/1000);

        this.checkCollision(this.stick);

        this.x += this.sx;
        this.y += this.sy;

        if (this.x < 0 || this.x > 600) {
            this.sx *= -1;
            this.x += this.sx * 2;
        }
    }

    draw(gc: CanvasRenderingContext2D) {

        gc.save();

        gc.fillStyle = "rgb(200,0,0)";
        gc.translate(this.x, this.y);
        gc.fillRect(-10, -10, 20, 20);

        gc.restore();
    }

    checkCollision(stick: Stick) {
        if (this.x > stick.x - 50 && this.x < stick.x + 50 &&
            this.y > stick.y - 10 && this.y < stick.y + 20) {
            
            this.sx = -this.bounceSpeed * Math.sin(stick.angle * Math.PI/180);
            this.sy = -this.bounceSpeed * Math.cos(stick.angle * Math.PI/180);
        }
    }
}

var gameCanvas: GameCanvas;

window.onload = () => {
    gameCanvas = new GameCanvas();
};