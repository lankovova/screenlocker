import Keeper from "./Keeper";
import Point from "./Point";
import {drawLine, arraysAreEqual} from './utils';

export const RADIUS = 20;
export const OFFSET_BETWEEN_CIRCLES = 20;
export const MARGIN_FROM_LEFT_SIDE = 50;
export const MARGIN_FROM_TOP_SIDE = 50;

export const PASS = [7, 3, 1, 5, 4, 8];

export default class KeepersController {
    constructor(context, props) {
        this.context = context;

        this.rows = props.rows;
        this.columns = props.columns;

        this.keepers = [];
        this.lockpath = [];

        // Initialize keepres
        for (let i = 0; i < this.rows; i++) {
            let keeperY = MARGIN_FROM_TOP_SIDE + RADIUS + i * (RADIUS * 2 + OFFSET_BETWEEN_CIRCLES);
            for (let j = 0; j < this.columns; j++) {
                let keeperX = MARGIN_FROM_LEFT_SIDE + RADIUS + j * (RADIUS * 2 + OFFSET_BETWEEN_CIRCLES);
                // Add new keeper to row
                this.keepers.push(
                    new Keeper(
                        this.context, {
                            id: this.keepers.length,
                            pos: new Point(keeperX, keeperY),
                            radius: RADIUS,
                            color: 'rgb(153,21,242)'
                        }
                    )
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

    mouseClicked(point) {
        this.checkIntersection(point, (keeper) => {
            // Add starting keeper to lockpath
            this.lockpath.push(keeper);
        });
    }

    mouseReleased() {
        // Get current lock path password
        const enteredPass = this.lockpath.map(k => k.id);

        // Check for if pass is correct
        if (arraysAreEqual(enteredPass, PASS)) {
            console.log('Lock opened');
        } else {
            console.log('Wrong pass');
        }

        // Clear lockpath
        this.lockpath = [];
    }

    mousePressedAndMoved(point, redrawCanvas) {
        // Get last/current lockpath keeper
        const currentPathKeeper = this.lockpath[this.lockpath.length - 1];

        // If there is at least one keeper in the path
        if (currentPathKeeper) {
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
    }

}
