import KeepersController from "./KeepersController";

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

        this.canvas.onmousedown = (event) => {
            const mousePos = {
                x: event.clientX,
                y: event.clientY
            };
            // TODO: Check for collision in keepersController
            this.keepersController.checkIntersection(mousePos);
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.draw();
    }

    draw() {
        // Fill canvas with bg color
        this.context.fillStyle = 'rgb(1, 38, 102)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw keepers
        this.keepersController.draw();
    }
}
