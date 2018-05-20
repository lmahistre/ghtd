
const React = require("react");
const ReactTooltip = require("react-tooltip");

const Menu = require('./menu.jsx');
const Alerts = require('./alerts.jsx');

const storageService = require('../services/storage.js');
const stateContainerService = require('../services/state-container.js');

class AppPage extends React.Component {
	render() {
		const self = this;
		const settings = storageService.getSettings();
		const theme = (settings.theme 
			&& settings.theme === 'dark') ? 'dark' : 'light';
		if (stateContainerService.getIsInitialized()) {
			return (
				<div className="app-container" data-theme={theme}>
					<Menu selectedMenu={self.props.selectedMenu} busy={stateContainerService.getPleaseWait()} />
					<Alerts alerts={stateContainerService.getAlerts()} />
					<ReactTooltip />
					{self.props.children}
				</div>
			);
		}
		else {
			return (
				<div className="first-loader" data-theme={theme}>
					<div className="loader-horizontal">
						<img src="dist/loader.gif" />
					</div>
				</div>
			);
		}
	}
}

module.exports = AppPage;