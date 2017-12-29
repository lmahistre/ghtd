
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const HashRouter = ReactRouterDom.HashRouter;
const Route = ReactRouterDom.Route;
const Switch = ReactRouterDom.Switch;

const TaskList = require("./task-list.jsx");
const ProjectEditPage = require("./project-edit-page.jsx");
const ProjectList = require("./project-list.jsx");
const SettingsPage = require("./settings-page.jsx");

class AppRouter extends React.Component {

	constructor() {
		this.routes = (
			<Switch>
				<Route exact path="/" component={TaskList} />
				<Route exact path="/tasks" component={TaskList} />
				<Route exact path="/projects" component={ProjectList} />
				<Route exact path="/project-edit" component={ProjectEditPage} />
				<Route exact path="/project-edit/:id" component={ProjectEditPage} />
				<Route exact path="/settings" component={SettingsPage} />
				<Route exact path="*" component={TaskList} />
			</Switch>
		);
	}

	render() {
		return (
			<HashRouter>
				{this.routes}
			</HashRouter>
		);
	}
}

module.exports = AppRouter;