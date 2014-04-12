var Stick = (function () {
    function Stick(element) {
        this.element = element;

        this.max_angle = 15;
        this.prev_x_pos = 0;
    }
    Stick.prototype.onMouseMove = function (event) {
        var x = event.pageX;

        this.speed = this.prev_x_pos - x;

        this.angle = Math.max(-this.max_angle, Math.min(this.max_angle, this.speed));

        this.element.style.left = x.toString() + "px";

        //this.element.setAttribute("style", "-moz-transform: rotate(" + this.angle.toString() + "deg)" );
        this.element.style.MozTransform = "rotate(" + this.angle.toString() + "deg)";

        this.prev_x_pos = x;
    };
    return Stick;
})();

var Ball = (function () {
    function Ball() {
    }
    return Ball;
})();

var stick;

window.onload = function () {
    stick = new Stick(document.getElementById("stick"));
};
//# sourceMappingURL=app.js.map
