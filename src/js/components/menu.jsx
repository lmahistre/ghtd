
const React = require("react");
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const L = require('../services/i18n.js');
const SyncIndicator = require('./ui/sync-indicator.jsx');

class Menu extends React.Component {

	render() {
		const self = this;
		return (
			<div className="menu">
				<Link className={"menu-entry"+(self.props.selectedMenu == 'tasks' ? ' active' : '')} to="/tasks" replace>{L("Tasks")}</Link>
				<Link className={"menu-entry"+(self.props.selectedMenu == 'projects' ? ' active' : '')} to="/projects" replace>{L("Projects")}</Link>
				<Link className={"menu-entry"+(self.props.selectedMenu == 'settings' ? ' active' : '')} to="/settings" replace>{L("Settings")}</Link>
				<SyncIndicator busy={self.props.busy} settings={self.props.settings} />
			</div>
		);
	}
}

module.exports = Menu;