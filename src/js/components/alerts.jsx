const React = require("react");

const stateContainerService = require('../services/state-container.js');
const browserService = require('../services/browser.js');

class Alerts extends React.Component {

	hide() {
		// stateContainerService.setAlerts({});
		browserService.render();
	}

	render() {
		const self = this;
		if (this.props.alerts.length > 0) {
			const error = typeof this.props.alerts.error === 'string' ? this.props.alerts.error : JSON.stringify(this.props.alerts.error);
			return (
				<div className="alerts">
					{self.props.alerts.map(elt => (
						<div className={"alert "+elt.type}>
							{elt.message}
							<span className="glyphicon glyphicon-remove alert-hide" aria-hidden="true" onClick={self.hide}></span>
						</div>
					))}
				</div>
			);
		}
		else {
			return null;
		}
	}
}

module.exports = Alerts;