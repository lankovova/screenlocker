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

/**
 * Check if arrays are equal
 * @param {[]} a First array
 * @param {[]} b Second array
 * @returns {Boolean} Returns true if arrays are equal, otherwise - returns false
 */
export function arraysAreEqual(a, b) {
    return (JSON.stringify(a) === JSON.stringify(b)) ? true : false;
}
