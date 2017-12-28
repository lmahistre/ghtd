
const React = require("react");

const Menu = require('./menu.jsx');
const Alerts = require('./alerts.jsx');

class AppPage extends React.Component {
	render() {
		const self = this;
		if (app.state.isInitialized) {
			return (
				<div className="container">
					<Menu selectedMenu={self.props.selectedMenu} />
					<Alerts alerts={app.state.alerts} />
					{self.props.children}
				</div>
			);
		}
		else {
			return (
				<div>Loading...</div>
			);
		}
	}
}

module.exports = AppPage;