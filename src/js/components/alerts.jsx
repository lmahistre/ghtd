const React = require("react");

class Alerts extends React.Component {

	hide() {
		app.state.alerts = {};
		app.render();
	}

	render() {
		if (this.props.alerts.error) {
			return (
				<div className="alerts">
					<div className="alert error">
						{this.props.alerts.error}
						<span className="glyphicon glyphicon-remove alert-hide" aria-hidden="true" onClick={this.hide}></span>
					</div>
				</div>
			);
		}
		else {
			return <div />;
		}
	}
}

module.exports = Alerts;