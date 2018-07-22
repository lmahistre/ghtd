const Redux = require('redux');
const ReduxReducers = require('./redux-reducers.js');


module.exports = function(preloadedState) {
	return Redux.createStore(ReduxReducers, preloadedState);
}