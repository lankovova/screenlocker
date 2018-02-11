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
    if (a.length !== b.length) return false;

    for (let i = a.length - 1; i >= 0; i--) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}
