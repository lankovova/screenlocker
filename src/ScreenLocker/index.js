import KeepersController from "./KeepersController";
import Point from "./Point";

let mousePressed = false;

export default class {
    constructor() {
        this.canvas = document.querySelector('#canvas');
        this.context = this.canvas.getContext('2d');

        this.resizeCanvas = this.resizeCanvas.bind(this);

        // Initialize keepers
        this.keepersController = new KeepersController(this.context, {rows: 3, columns: 3});

        this.initListeners();
        this.resizeCanvas();
    }

    initListeners() {
        window.addEventListener('resize', this.resizeCanvas, false);

        this.canvas.onmouseup = () => {
            // Redraw full canvas
            this.draw();
            this.keepersController.releaseHoldedKeeper();
            mousePressed = false;
        }
        this.canvas.onmousedown = (event) => {
            const mousePos = new Point(event.clientX, event.clientY);
            // Check intersection in keepers
            this.keepersController.checkIntersection(mousePos);
            mousePressed = true;
        }
        this.canvas.onmousemove = (event) => {
            if (mousePressed) {
                const mousePos = new Point(event.clientX, event.clientY);
                // Check intersection in keepers
                this.keepersController.mousePressedAndMoved(mousePos, () => this.draw());
            }
        }
        this.canvas.onmouseleave = () => {
            // Redraw full canvas
            this.draw();
            this.keepersController.releaseHoldedKeeper();
            mousePressed = false;
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.draw();
    }

    draw() {
        // Clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Fill canvas with bg color
        this.context.fillStyle = 'rgb(1, 38, 102)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw keepers
        this.keepersController.draw();
    }
}
