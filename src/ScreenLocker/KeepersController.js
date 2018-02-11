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

        // Initialize keepres
        for (let i = 0; i < this.rows; i++) {
            let keeperY = MARGIN_FROM_TOP_SIDE + RADIUS + i * (RADIUS * 2 + OFFSET_BETWEEN_CIRCLES);
            for (let j = 0; j < this.columns; j++) {
                let keeperX = MARGIN_FROM_LEFT_SIDE + RADIUS + j * (RADIUS * 2 + OFFSET_BETWEEN_CIRCLES);
                // Add new keeper to row
                this.keepers.push(
                    new Keeper(
                        this.context, {
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

    checkIntersection(point, todo) {
        this.keepers.forEach((keeper, index) => {
            if (keeper.isIntersect(point)) {
                todo(this.keepers[index]);
            }
        });
    }

    mouseClicked(point) {
        this.checkIntersection(point, (keeper) => {
            holdedKeeper = keeper;
        });
    }

    releaseHoldedKeeper() {
        holdedKeeper = undefined;
    }

    mousePressedAndMoved(point, redrawCanvas) {
        if (holdedKeeper) {
            redrawCanvas();
            drawLine(this.context, holdedKeeper.center, point);

            // Check if mouse has entered in a new keeper
            this.checkIntersection(point, (keeper) => {
                // FIXME: Replace with current keeper
                if (keeper != holdedKeeper) {
                    console.log('move inside new keeper ' + keeper);
                }
            });
        }
    }

}
