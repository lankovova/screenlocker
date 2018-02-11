import Keeper from "./Keeper";
import Point from "./Point";
import {drawLine, arraysAreEqual} from './utils';

export const RADIUS = 20;
export const OFFSET_BETWEEN_CIRCLES = 20;

export const PASS = [7, 3, 1, 5, 4, 8];

let STATES = {
    IDLE: 'IDLE',
    PICKING: 'PICKING',
    DO_NOTHING: 'DO_NOTHING'
};

export default class KeepersController {
    constructor(context, props) {
        this.context = context;

        this.rows = props.rows;
        this.columns = props.columns;

        this.STATE = STATES.IDLE;

        this.keepers = [];
        this.lockpath = [];

        this.initializeKeepers();
    }

    initializeKeepers() {
        // Initialize keepres
        for (let i = 0; i < this.rows; i++) {
            const topOffset = (this.context.canvas.height / 2) - this.columns * RADIUS;
            const keeperY = topOffset + i * (RADIUS * 2 + OFFSET_BETWEEN_CIRCLES);

            for (let j = 0; j < this.columns; j++) {
                const leftOffset = (this.context.canvas.width / 2) - this.rows * RADIUS;
                const keeperX = leftOffset + j * (RADIUS * 2 + OFFSET_BETWEEN_CIRCLES);

                // Add new keeper to row
                this.keepers.push(new Keeper(
                                    this.context, {
                                        id: this.keepers.length,
                                        pos: new Point(keeperX, keeperY),
                                        radius: RADIUS,
                                        color: 'rgb(153,21,242)'
                                    })
                                );
            }
        }
    }

    draw() {
        this.keepers.forEach(keeper => keeper.draw());
    }

    drawLockPath() {
        this.lockpath.reduce((curr, next) => {
            drawLine(this.context, curr.center, next.center);
            return next;
        });
    }

    checkIntersection(point, intersectionWithKeeper) {
        this.keepers.forEach((keeper, index) => {
            if (keeper.isIntersect(point)) {
                intersectionWithKeeper(this.keepers[index]);
            }
        });
    }

    startTyping(point) {
        this.checkIntersection(point, (keeper) => {
            // Add starting keeper to lockpath
            this.lockpath.push(keeper);
            // Set state to PICKING
            this.STATE = STATES.PICKING;
        });
    }

    passEntered() {
        return this.lockpath.length !== 0;
    }

    submitPass() {
        if (this.passEntered()) {
            // Set state to IDLE
            this.STATE = STATES.IDLE;

            // Get current lock path password
            const enteredPass = this.lockpath.map(k => k.id);

            // Clear lockpath
            this.lockpath = [];

            // Check pass
            return arraysAreEqual(enteredPass, PASS);
        } else {
            return false;
        }
    }

    moveLine(point, redrawCanvas) {
        switch(this.STATE) {
            case STATES.PICKING: {
                // If all keeper has been picked
                if (this.lockpath.length === this.rows * this.columns) {
                    // Redraw whole canvas
                    redrawCanvas();
                    // Draw path between all lockpath keepers
                    this.drawLockPath();
                    // Set state to DO_NOTHING
                    // to disable useless re-rendering
                    this.STATE = STATES.DO_NOTHING;
                } else if (this.lockpath.length !== 0) {
                    // If there is at least one keeper in the path
                    // Check if mouse has entered in a new keeper
                    this.checkIntersection(point, (keeper) => {
                        // Add only uniqe keepers to lock path
                        if (!this.lockpath.find(inPathKeeper => inPathKeeper === keeper)) {
                            // Add new picked keeper to lockpath
                            this.lockpath.push(keeper);
                        }
                    });

                    // Redraw whole canvas
                    redrawCanvas();
                    // Draw path between all lockpath keepers
                    this.drawLockPath();
                    // Draw line between current holded keeper and mouse
                    drawLine(this.context, this.lockpath[this.lockpath.length - 1].center, point);
                }
                break;
            }
            case STATES.IDLE:
            case STATES.DO_NOTHING: { break; }
            default: { console.warn(`Unhandeled KeepersContorller state: ${this.STATE}`) }
        }
    }

}
