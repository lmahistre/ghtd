const React = require("react");
const ReactRedux = require('react-redux');
const ReactRouterDom = require('react-router-dom');

const Redirect = ReactRouterDom.Redirect;
const reduxActions = require('../../services/redux-actions.js');

const store = require('../../services/store.js');

class SettingsLang extends React.Component {
	render () {
		const language = this.props.match.params.lang;
		store.dispatch(reduxActions.changeLanguage(language));
		return (
			<Redirect to="/tasks" />
		);
	}
}


function mapStateToProps(state, ownProps) {
	return {
		tasks : state && state.tasks ? state.tasks : {},
		projects : state && state.projects ? state.projects : {},
		settings : state && state.settings ? state.settings : {},
	}
}

module.exports = ReactRedux.connect(mapStateToProps)(SettingsLang);