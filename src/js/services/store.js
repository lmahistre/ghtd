
const Redux = require('redux');
const ReduxReducers = require('./dispatcher.js');
const storage = require('./storage.js');

// const mw = function(s) {
// 	return function(next) {
// 		return function(action) {
// 			console.log('mw')
// 			console.log(s.getState());
// 			console.log(action);
// 			return next(action);
// 		}
// 	}
// }

const ConfigureStore = function(preloadedState) {
	// return Redux.createStore(ReduxReducers, preloadedState, Redux.applyMiddleware(mw));
	return Redux.createStore(ReduxReducers, preloadedState);
}

const configuredStore = ConfigureStore();

const next = configuredStore.dispatch;

configuredStore.dispatch = function(action) {
	let result = next(action)
	// console.log('next state', configuredStore.getState())
	storage.save(configuredStore.getState());
	return result;
}

module.exports = configuredStore;
