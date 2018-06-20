
const browserService = require('./services/browser.js');
window.onload = function () {
	browserService.setTitle();
	browserService.render();
}
