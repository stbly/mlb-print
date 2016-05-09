export function getOffset (elem) {
    //...
    // console.log('getOffset for', elem);
    var win, rect, doc, docElem;

    if ( !elem ) {
        return;
    }

    rect = elem.getBoundingClientRect();

    // Make sure element is not hidden (display: none) or disconnected
    if ( rect.width || rect.height || elem.getClientRects().length ) {
        doc = elem.ownerDocument;
        win = doc.defaultView;
        docElem = doc.documentElement;

        return {
            top: rect.top + win.pageYOffset - docElem.clientTop,
            left: rect.left + win.pageXOffset - docElem.clientLeft
        };
    }
}

export function getMousePosition (e) {
	var xPos = e.clientX,
		yPos = e.clientY,
		doc = e.target.ownerDocument,
        win = doc.defaultView,
    	x = xPos + win.pageXOffset,
        y = yPos + win.pageYOffset;

    return { x, y }
}

export function getScroll () {
	var doc = document,
		win = doc.defaultView;

	return {
		y: win.pageYOffset,
		x: win.pageXOffset
	}
}