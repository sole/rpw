var scale = require('./plugins/scale');

var deckRoot = document.querySelector('article');
var deck = {
	el: deckRoot,
	slides: Array.prototype.slice.call(deckRoot.querySelectorAll('section'))
};

scale(document.body, deck);
