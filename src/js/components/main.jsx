const React = require("react");
const ReactRedux = require('react-redux');
const reduxActions = require('../services/redux-actions.js');
const store = require('../services/store.js');
const browserService = require('../services/browser.js');

const AppRouter = require('./app-router.jsx');


class Main extends React.Component {

	constructor () {
		super();
		store.dispatch(reduxActions.init());
	}

	render() {
		return (
			<ReactRedux.Provider store={store}>
				<AppRouter />
			</ReactRedux.Provider>
		);
	}
}

module.exports = Main;