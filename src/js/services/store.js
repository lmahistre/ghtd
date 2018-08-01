
const Redux = require('redux');
const ReduxReducers = require('./dispatcher.js');

const mw = function(s) {
	return next => action => {
		console.log('mw')
		console.log(s.getState());
		return {
			afterMW : 'afterMW',
		}
	}
}

const ConfigureStore = function(preloadedState) {
	// return Redux.createStore(ReduxReducers, preloadedState, Redux.applyMiddleware(mw));
	return Redux.createStore(ReduxReducers, preloadedState);
}

module.exports = ConfigureStore();