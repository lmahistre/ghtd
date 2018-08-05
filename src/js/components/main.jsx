
const React = require("react");
const ReactRedux = require('react-redux');
const reduxActions = require('../services/redux-actions.js');
const store = require('../services/store.js');
const browserService = require('../services/browser.js');

const AppRouter = require('./app-router.jsx');

store.dispatch(reduxActions.init());

class Main extends React.Component {
	render() {
		browserService.setBackgroundColor(store.getState().settings.theme);
		return (
			<ReactRedux.Provider store={store}>
				<AppRouter />
			</ReactRedux.Provider>
		);
	}
}

module.exports = Main;