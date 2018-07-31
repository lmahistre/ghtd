
const Redux = require('redux');
const ReduxReducers = require('./dispatcher.js');

const ConfigureStore = function(preloadedState) {
	return Redux.createStore(ReduxReducers, preloadedState);
}

module.exports = ConfigureStore();