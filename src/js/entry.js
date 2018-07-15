
const browserService = require('./services/browser.js');
const dataService = require('./services/data.js');
window.onload = function () {
	browserService.setTitle();
	const settings = dataService.getSettings();
	browserService.setBackgroundColor(settings.theme);
	browserService.render();
}
