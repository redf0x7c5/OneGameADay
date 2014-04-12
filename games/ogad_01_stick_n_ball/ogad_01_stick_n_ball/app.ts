
class Stick {
    element: HTMLElement;

    angle: number;
    speed: number;

    max_angle: number;
    prev_x_pos: number;

    constructor(element: HTMLElement) {
        this.element = element;

        this.max_angle = 15;
        this.prev_x_pos = 0;
    }

    onMouseMove(event: MouseEvent) {
        var x = event.pageX;

        this.speed = this.prev_x_pos - x;

        this.angle = Math.max(-this.max_angle, Math.min(this.max_angle, this.speed));

        this.element.style.left = x.toString() + "px";
        //this.element.setAttribute("style", "-moz-transform: rotate(" + this.angle.toString() + "deg)" );
        this.element.style.MozTransform = "rotate(" + this.angle.toString() + "deg)";

        this.prev_x_pos = x;
    }
}

class Ball {

}

var stick: Stick;

window.onload = () => {
    stick = new Stick(document.getElementById("stick"));
};