import KeepersController from "./KeepersController";
import Point from "./Point";
import {isTouchDevice} from './utils';

let pointerPressed = false;

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
            this.canvas.ontouchstart = (e) => this.pointerClick(e.touches[0]);
            this.canvas.ontouchmove = (e) => this.pointerMove(e.touches[0]);
            this.canvas.ontouchend = () => this.pointerLeave();
            this.canvas.ontouchcancel = () => this.pointerLeave();
        } else {
            this.canvas.onmousedown = (e) => this.pointerClick(e);
            this.canvas.onmousemove = (e) => this.pointerMove(e);
            this.canvas.onmouseup = () => this.pointerLeave();
            this.canvas.onmouseleave = () => this.pointerLeave();
        }
    }

    pointerClick(event) {
        // Redraw canvas
        this.draw();
        pointerPressed = true;
        const mousePos = new Point(event.clientX, event.clientY);
        // Check intersection in keepers
        this.keepersController.startTyping(mousePos);
    }
    pointerMove(event) {
        if (pointerPressed) {
            const mousePos = new Point(event.clientX, event.clientY);
            // Check intersection in keepers
            this.keepersController.moveLine(mousePos, () => this.draw());
        }
    }
    pointerLeave() {
        pointerPressed = false;
        if (this.keepersController.passEntered()) {
            const bgColor = this.keepersController.passIsCorrect() ? 'rgb(0,150,0)' : 'rgb(150,0,0)';
            // Redraw full canvas
            this.draw(bgColor);
        } else {
            this.draw();
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.draw();
    }

    draw(bg='rgb(200, 200, 200)') {
        // Clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Fill canvas with bg color
        this.context.fillStyle = bg;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw keepers
        this.keepersController.draw();
    }
}
