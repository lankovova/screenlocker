// Circle radius
export const RAD = 50;

export default class Circle {
    constructor(context, props) {
        this.context = context;
        this.props = props;

        this.pos = {
            x: this.props.x,
            y: this.props.y
        }
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.pos.x, this.pos.y, RAD, 0, 2 * Math.PI);
        this.context.stroke();
    }
}
