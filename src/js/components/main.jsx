
const React = require("react");
const ReactRedux = require('react-redux');
const ReduxActions = require('../services/redux-actions.js')
const store = require('../services/store.js')

const AppRouter = require('./app-router.jsx');

// console.log('Main')
// store.dispatch({
// 	type : 'INIT',
// });
store.dispatch(ReduxActions.init());

// function mapStateToProps(state, ownProps) {
// 	return {
// 		tasks : state && state.tasks ? state.tasks : {},
// 	}
// }

// const ConnectedRoot = ReactRedux.connect(mapStateToProps)(AppRouter);

class Main extends React.Component {
	render() {
		return (
			<ReactRedux.Provider store={store}>
				<AppRouter />
			</ReactRedux.Provider>
		);
	}
}

module.exports = Main;