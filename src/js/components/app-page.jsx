
const React = require("react");
const ReactTooltip = require("react-tooltip");

const Menu = require('./menu.jsx');
const Alerts = require('./alerts.jsx');

const store = require('../services/store.js');
const reduxActions = require('../services/redux-actions.js');
const L = require('../services/i18n.js');

class AppPage extends React.Component {

	updateOnlineStatus () {
		store.dispatch(reduxActions.render());
	}

	render() {
		if (this.props.settings 
			&& (this.props.settings.isSyncDirty || this.props.busy)
			&& this.props.settings.warnIfDirty
		) {
			window.onbeforeunload = function(e) {
				e.preventDefault()
				store.dispatch(reduxActions.addAlert('warning', L('Data is not synchronized')));
				return true;
			};
		}
		else {
			window.onbeforeunload = e => null;
		}

		window.addEventListener('offline', this.updateOnlineStatus);
		window.addEventListener('online', this.updateOnlineStatus);

		return (
			<div className="app-container">
				<Menu selectedMenu={this.props.selectedMenu} 
					busy={this.props.busy} 
					settings={this.props.settings} />
				<Alerts alerts={this.props.alerts} />
				<ReactTooltip />
				<div className="page-content">
					{this.props.children}
				</div>
			</div>
		);
	}
}

module.exports = store.connect(AppPage);