
const reducers = require('./reducers.js');

module.exports = function (state, action) {
	if (action.type && 'function' === typeof reducers[action.type]) {
		return reducers[action.type](state, action);
	}
	else {
		return state;
	}
}