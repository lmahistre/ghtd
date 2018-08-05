
const Redux = require('redux');
const ReactRedux = require('react-redux');
const ReduxReducers = require('./dispatcher.js');
const storage = require('./storage.js');

const ConfigureStore = function(preloadedState) {
	return Redux.createStore(ReduxReducers, preloadedState);
}

const configuredStore = ConfigureStore();

const next = configuredStore.dispatch;

configuredStore.dispatch = function(action) {
	let result = next(action)
	storage.save(configuredStore.getState());
	return result;
}

configuredStore.connect = ReactRedux.connect(function(state, ownProps) {
	return {
		tasks : state && state.tasks ? state.tasks : {},
		projects : state && state.projects ? state.projects : {},
		settings : state && state.settings ? state.settings : {},
		importProjects : state && state.importProjects ? state.importProjects : [],
		busy : state.busy ? true : false,
		alerts : state.alerts ? state.alerts : [],
	}
});

module.exports = configuredStore;
