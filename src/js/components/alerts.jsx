const React = require("react");

const stateContainerService = require('../services/state-container.js');
const browserService = require('../services/browser.js');

class Alerts extends React.Component {

	hide() {
		stateContainerService.setAlerts({});
		browserService.render();
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