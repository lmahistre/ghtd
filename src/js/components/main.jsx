
const React = require("react");
const ReactRedux = require('react-redux');
const reduxActions = require('../services/redux-actions.js');
const store = require('../services/store.js');
const browserService = require('../services/browser.js');

const AppRouter = require('./app-router.jsx');

store.dispatch(reduxActions.init());

class Main extends React.Component {

	render() {
		const state = store.getState();
		if (state.settings 
			&& state.settings.backgroundImage 
			&& state.settings.backgroundImage.length > 0
		) {
			browserService.setBackgroundImage(state.settings.backgroundImage);
		}
		return (
			<ReactRedux.Provider store={store}>
				<AppRouter />
			</ReactRedux.Provider>
		);
	}
}

module.exports = Main;