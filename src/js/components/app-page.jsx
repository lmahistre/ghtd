
const React = require("react");
const ReactTooltip = require("react-tooltip");

const Menu = require('./menu.jsx');
const Alerts = require('./alerts.jsx');

const store = require('../services/store.js');

class AppPage extends React.Component {

	render() {
		const theme = (this.props.settings 
			&& this.props.settings.theme 
			&& this.props.settings.theme === 'dark') ? 'dark' : 'light';
		return (
			<div className="app-container" data-theme={theme}>
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

// module.exports = AppPage;
module.exports = store.connect(AppPage);