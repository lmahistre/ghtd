const React = require("react");

class Alerts extends React.Component {

	hide() {
		app.state.alerts = {};
		app.render();
	}

	render() {
		if (this.props.alerts.error) {
			const error = typeof this.props.alerts.error === 'string' ? this.props.alerts.error : JSON.stringify(this.props.alerts.error);
			return (
				<div className="alerts">
					<div className="alert error">
						{error}
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