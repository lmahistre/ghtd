
const browserService = require('./services/browser.js');

exports.state = require('./services/state-container.js'),

exports.consts = require('./services/consts.js'),
exports.utils = require('./services/utils.js'),
exports.actions = require('./services/actions.js'),


// TO REMOVE
exports.error = browserService.error;
exports.setTitle = browserService.setTitle;
exports.render = browserService.render;

