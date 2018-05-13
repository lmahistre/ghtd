const React = require("react");

const stateContainerService = require('../services/state-container.js');
const browserService = require('../services/browser.js');

class Alerts extends React.Component {

	hide(index) {
		stateContainerService.clearAlert(index);
		browserService.render();
	}

	render() {
		const self = this;
		if (this.props.alerts.length > 0) {
			return (
				<div className="alerts">
					{self.props.alerts.map((elt, index) => (
						<div key={index} className={"alert "+elt.type}>
							{elt.message}
							<span className="glyphicon glyphicon-remove alert-hide" aria-hidden="true" onClick={self.hide.bind(self, index)}></span>
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