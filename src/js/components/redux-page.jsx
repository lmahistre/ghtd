const React = require("react");
const ReactRedux = require('react-redux')

const reduxActions = require('../services/redux-actions.js')

class ReduxPage extends React.Component {
	render() {
		return (
			<div>Redux marche</div>
		);
	}
}

function mapStateToProps(state, ownProps) {}

module.exports = ReactRedux.connect(mapStateToProps)(ReduxPage);