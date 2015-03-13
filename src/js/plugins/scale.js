/*
 * Loosely based on bespoke.js's scale plugin
 */
function resize(root, children, srcWidth, srcHeight) {
	var slides = Array.prototype.slice.call(children);
	var dstWidth = root.offsetWidth;
	var dstHeight = root.offsetHeight;
	var scaleX = dstWidth / srcWidth;
	var scaleY = dstHeight / srcHeight;
	var ratio = Math.min(scaleX, scaleY);
	var zoomOrTransform = transform; // TODO actually detect which one
	
	console.log('resize', dstWidth, dstHeight, scaleX, scaleY, ratio);

	slides.forEach(function(slide) {
		zoomOrTransform(ratio, slide);
	});
}

var transform = (function() {
	/*var prefixes = 'Moz Webkit O ms'.split(' ');
	return function transform(ratio, element) {
		
	}*/
	return function(ratio, element) {
		element.style['transform'] = 'scale(' + ratio + ')';
	};
})();

function scale(deckRoot, childrenSelector) {
	console.log('scaling', deckRoot);

	childrenSelector = childrenSelector ? childrenSelector : 'section';

	var children = deckRoot.querySelectorAll(childrenSelector);
	var firstChild = children[0];

	var slideWidth = firstChild.offsetWidth;
	var slideHeight = firstChild.offsetHeight;

	console.log(slideWidth, slideHeight);

	function onResize() {
		resize(deckRoot, children, slideWidth, slideHeight);
	}

	window.addEventListener('resize', onResize);

	onResize();

}

module.exports = scale;
