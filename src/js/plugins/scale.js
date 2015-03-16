/*
 * Loosely based on bespoke.js's scale plugin
 */
function resize(deckContainer, deckElement, srcWidth, srcHeight) {
	//var slides = Array.prototype.slice.call(children);
	var dstWidth = deckContainer.offsetWidth;
	var dstHeight = deckContainer.offsetHeight;
	var scaleX = dstWidth / srcWidth;
	var scaleY = dstHeight / srcHeight;
	var ratio = Math.min(scaleX, scaleY);
	var translateX = 0;
	var translateY;
	var zoomOrTransform = transform; // TODO actually detect which one

	translateX = Math.min(srcWidth / 2, srcHeight / 2);
	translateX = Math.round(translateX);
	translateY = translateX;

	console.log('resize', dstWidth, dstHeight, scaleX, scaleY, ratio);

	/*slides.forEach(function(slide) {
		zoomOrTransform(ratio, slide);
	});*/

	//zoomOrTransform(ratio, deckElement);
	//
	zoomOrTransform(ratio, translateX, translateY, deckElement);
}

var transform = (function() {
	/*var prefixes = 'Moz Webkit O ms'.split(' ');
	return function transform(ratio, element) {
		
	}*/
	return function(ratio, translateX, translateY, element) {
		//var translateX =;
		//translateX = Math.round(translateX);
		//var translateY = translateX;
		var style = 'translate(' + translateX + 'px, ' + translateY +'px) scale(' + ratio + ')';
		//var style = 'translate(' + translateX + '%, ' + translateY +'%) scale(' + ratio + ')';
		//var style = 'scale(' + ratio + ') translate(1%, 0)';
		console.log('style', style);
		element.style['transform'] = style;
	};
})();

// We'll make deck expand as much as possible inside deckContainer
function scale(deckContainer, deck) {
	console.log('scaling', deck.el);

	// childrenSelector = childrenSelector ? childrenSelector : 'section';

	//var children = deckRoot.querySelectorAll(childrenSelector);
	var firstChild = deck.slides[0];

	var slideWidth = 0;
	var slideHeight = 0;

	// find max width and height so we don't clip any content
	deck.slides.forEach(function(slide) {
		slideWidth = Math.max(slideWidth, slide.offsetWidth);
		slideHeight = Math.max(slideHeight, slide.offsetHeight);
	});

	//var slideWidth = firstChild.offsetWidth;
	//var slideHeight = firstChild.offsetHeight;

	console.log(slideWidth, slideHeight);

	function onResize() {
		resize(deckContainer, deck.el, slideWidth, slideHeight);
	}

	window.addEventListener('resize', onResize);

	onResize();

}

module.exports = scale;
