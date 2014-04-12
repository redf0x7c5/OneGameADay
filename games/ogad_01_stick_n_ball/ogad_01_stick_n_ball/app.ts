
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

        this.canvasElement = <HTMLCanvasElement> document.getElementById("game-canvas")
        this.canvasElement.onmousemove = (e) => stick.onMouseMove(e);

        this.canvas = this.canvasElement.getContext('2d');
        window.requestAnimationFrame((dt) => this.update(dt));
    }

    update(dt: number) {
        this.time.deltaTime = dt;
        this.time.totalTime = this.time.totalTime + dt;

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
    speed: number;

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
        gc.fillStyle = "rgb(200,0,0)";
        gc.fillRect(this.x, this.y, 100, 20);
    }

    onMouseMove(event: MouseEvent) {
        var x = event.pageX;
        this.x = x;

        this.speed = this.prev_x_pos - x;

        this.angle = Math.max(-this.max_angle, Math.min(this.max_angle, this.speed));

        this.prev_x_pos = x;
    }
}

class Ball {

}

var gameCanvas: GameCanvas;

window.onload = () => {
    gameCanvas = new GameCanvas();
};