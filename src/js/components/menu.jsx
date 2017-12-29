
const React = require("react");
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

class Menu extends React.Component {

	render() {
		const self = this;
		return (
			<div className="menu">
				<Link className={"menu-entry"+(self.props.selectedMenu == 'tasks' ? ' active' : '')} to="/tasks" replace>Tasks</Link>
				<Link className={"menu-entry"+(self.props.selectedMenu == 'projects' ? ' active' : '')} to="/projects" replace>Projects</Link>
				<Link className={"menu-entry"+(self.props.selectedMenu == 'settings' ? ' active' : '')} to="/settings" replace>Settings</Link>
			</div>
		);
	}
}

module.exports = Menu;