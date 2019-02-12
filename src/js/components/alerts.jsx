const React = require("react");

const reduxActions = require('../services/redux-actions.js');
const store = require('../services/store.js');

class Alerts extends React.Component {

	hide(index) {
		store.dispatch(reduxActions.clearAlert(index));
	}

	render() {
		const self = this;
		if (this.props.alerts.length > 0) {
			return (
				<div className="alerts">
					{self.props.alerts.map((elt, index) => (
						<div key={index} className={"alert "+elt.type}>
							{elt.message}
							<span className="fa fa-remove alert-hide" aria-hidden="true" onClick={self.hide.bind(self, index)}></span>
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