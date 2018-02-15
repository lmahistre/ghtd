
const React = require("react");

const Menu = require('./menu.jsx');
const Alerts = require('./alerts.jsx');

class AppPage extends React.Component {
	render() {
		const self = this;
		const theme = (app.state.data.settings 
			&& app.state.data.settings.theme 
			&& app.state.data.settings.theme === 'dark') ? 'dark' : 'light';
		if (app.state.isInitialized) {
			return (
				<div className="app-container" data-theme={theme}>
					<Menu selectedMenu={self.props.selectedMenu} />
					<Alerts alerts={app.state.alerts} />
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