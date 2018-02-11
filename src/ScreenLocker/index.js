import KeepersController from "./KeepersController";
import Point from "./Point";
import {isTouchDevice} from './utils';

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

        if (isTouchDevice()) {
            this.canvas.ontouchend = () => {
                // Redraw full canvas
                this.draw();
                this.keepersController.mouseReleased();
                mousePressed = false;
            }
            this.canvas.ontouchstart = (event) => {
                const mousePos = new Point(event.touches[0].clientX, event.touches[0].clientY);
                // Check intersection in keepers
                this.keepersController.mouseClicked(mousePos);
                mousePressed = true;
            }
            this.canvas.ontouchmove = (event) => {
                if (mousePressed) {
                    const mousePos = new Point(event.touches[0].clientX, event.touches[0].clientY);
                    // Check intersection in keepers
                    this.keepersController.mousePressedAndMoved(mousePos, () => this.draw());
                }
            }
            this.canvas.ontouchcancel = () => {
                // Redraw full canvas
                this.draw();
                this.keepersController.mouseReleased();
                mousePressed = false;
            }
        } else {
            this.canvas.onmouseup = () => {
                // Redraw full canvas
                this.draw();
                this.keepersController.mouseReleased();
                mousePressed = false;
            }
            this.canvas.onmousedown = (event) => {
                const mousePos = new Point(event.clientX, event.clientY);
                // Check intersection in keepers
                this.keepersController.mouseClicked(mousePos);
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
                this.keepersController.mouseReleased();
                mousePressed = false;
            }
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
        this.context.fillStyle = 'rgb(200, 200, 200)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw keepers
        this.keepersController.draw();
    }
}
