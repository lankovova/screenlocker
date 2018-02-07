import Circle from "./Circle";

export default class {
    constructor() {
        this.canvas = document.querySelector('#canvas');
        this.context = this.canvas.getContext('2d');

        this.resizeCanvas = this.resizeCanvas.bind(this);

        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas, false);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.draw();
    }

    draw() {
        this.context.beginPath();
        this.context.moveTo(50, 50);
        this.context.lineTo(100, 100);
        this.context.stroke();

        const circle = new Circle(this.context, {
            x: 100,
            y: 100
        });
        circle.draw();
    }
}
