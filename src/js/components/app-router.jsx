
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const HashRouter = ReactRouterDom.HashRouter;
const Route = ReactRouterDom.Route;
const Switch = ReactRouterDom.Switch;

const TaskList = require("./page/task-list.jsx");
const ProjectEdit = require("./page/project-edit.jsx");
const ProjectList = require("./page/project-list.jsx");
const Settings = require("./page/settings.jsx");

class AppRouter extends React.Component {

	constructor() {
		this.routes = (
			<Switch>
				<Route exact path="/" component={TaskList} />
				<Route exact path="/tasks" component={TaskList} />
				<Route exact path="/projects" component={ProjectList} />
				<Route exact path="/project-edit" component={ProjectEdit} />
				<Route exact path="/project-edit/:id" component={ProjectEdit} />
				<Route exact path="/settings" component={Settings} />
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