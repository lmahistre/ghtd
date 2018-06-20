
const storageService = require('./storage.js');

const langs = {
	en : require('../lang/en.js'),
	fr : require('../lang/fr.js'),
}

module.exports = function(key) {
	const settings = storageService.getSettings();
	let lang = settings && settings.language ? settings.language : 'en';
	if (langs[lang] && langs[lang][key]) {
		return langs[lang][key];
	}
	else {
		return key;
	}
}
