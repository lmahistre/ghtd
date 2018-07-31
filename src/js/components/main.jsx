
const React = require("react");
const ReactRedux = require('react-redux');
// const ReduxActions = require('../services/redux-actions.js')
const store = require('../services/store.js')

const AppRouter = require('./app-router.jsx');

// store.dispatch({
// 	type : 'INIT',
// });

function mapStateToProps(state, ownProps) {
	return {
	}
}

const ConnectedRoot = ReactRedux.connect(mapStateToProps)(AppRouter);

class Main extends React.Component {
	render() {
		return (
			<ReactRedux.Provider store={store}>
				<ConnectedRoot />
			</ReactRedux.Provider>
		);
	}
}

module.exports = Main;