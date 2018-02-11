import Keeper from "./Keeper";
import Point from "./Point";
import {drawLine} from './utils';

export const RADIUS = 20;
export const OFFSET_BETWEEN_CIRCLES = 20;
export const MARGIN_FROM_LEFT_SIDE = 50;
export const MARGIN_FROM_TOP_SIDE = 50;

let holdedKeeper;

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

    checkIntersection(point, keeperClicked) {
        this.keepers.forEach((keeper, index) => {
            if (keeper.isIntersect(point)) {
                keeperClicked(this.keepers[index]);
            }
        });
    }

    mouseClicked(point) {
        this.checkIntersection(point, (keeper) => {
            // TODO: Add to lock path
            this.lockpath.push(keeper);
        });
    }

    mouseReleased() {
        // TODO: Clear lock path
        this.lockpath = [];
    }

    mousePressedAndMoved(point, redrawCanvas) {
        // Get last/current lockpath keeper
        const currentPathKeeper = this.lockpath[this.lockpath.length - 1];

        if (currentPathKeeper) {
            redrawCanvas();
            drawLine(this.context, currentPathKeeper.center, point);

            // Check if mouse has entered in a new keeper
            this.checkIntersection(point, (keeper) => {
                // Add only uniqe keepers to lock path
                if (!this.lockpath.find(inPathKeeper => inPathKeeper === keeper)) {
                    console.log('move inside new keeper ' + keeper.id);
                    // Add new picked keeper to lockpath
                    this.lockpath.push(keeper);

                    // TODO: Draw path between all lockpath keepers
                }

            });
        }
    }

}
