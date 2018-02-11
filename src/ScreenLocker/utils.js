/**
 * Draw line
 * @param {Context} context Context where to draw on
 * @param {Point} from Start line point
 * @param {Point} to End line Point
 */
export function drawLine(context, from, to) {
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
}
