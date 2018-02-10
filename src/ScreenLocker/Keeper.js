export default class Keeper {
    constructor(context, props) {
        this.context = context;

        this.center = props.pos;
        this.color = props.color;
        this.radius = props.radius;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.stroke();
    }

    /**
     * Check the intersection of object and given point
     * @param {Point} point Point to check for intersection
     * @returns Returns true if there is intersection, otherwise - returns false
     */
    isIntersect(point) {
        // Get distance between point and center of keeper
        const d = Math.sqrt((point.x - this.center.x) ** 2 + (point.y - this.center.y) ** 2);
        // Return true if distance is lower that radius
        // otherwise - return false
        return d < this.radius;
    }
}
