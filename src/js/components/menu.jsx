
const React = require("react");
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const L = require('../services/i18n.js');

class Menu extends React.Component {

	render() {
		const self = this;
		return (
			<div className="menu">
				<Link className={"menu-entry"+(self.props.selectedMenu == 'tasks' ? ' active' : '')} to="/tasks" replace>{L("Tasks")}</Link>
				<Link className={"menu-entry"+(self.props.selectedMenu == 'projects' ? ' active' : '')} to="/projects" replace>{L("Projects")}</Link>
				<Link className={"menu-entry"+(self.props.selectedMenu == 'settings' ? ' active' : '')} to="/settings" replace>{L("Settings")}</Link>
				<Link className={"menu-entry"+(self.props.selectedMenu == 'about' ? ' active' : '')} to="/about" replace>{L("About")}</Link>
				{self.props.busy ? 
					<span className="please-wait">
						<span className="fa fa-clock-o fa-spin" aria-hidden="true" />
					</span>
				: null}
			</div>
		);
	}
}

module.exports = Menu;