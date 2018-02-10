import Keeper from "./Keeper";
import Point from "./Point";

export const RADIUS = 20;
export const OFFSET_BETWEEN_CIRCLES = 20;
export const MARGIN_FROM_LEFT_SIDE = 50;
export const MARGIN_FROM_TOP_SIDE = 50;

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
                        this.context,
                        {
                            pos: new Point(keeperX, keeperY),
                            radius: RADIUS,
                            color: 'rgba(53,121,232,0.5)'
                        }
                    )
                );
            }
        }
    }

    draw() {
        this.keepers.forEach(keeper => keeper.draw());
    }

    checkIntersection(point) {
        this.keepers.forEach((keeper, index) => {
            if (keeper.isIntersect(point)) {
                console.log(`Mouse pressed on keeper ${index}`);
            }
        });
    }

}
