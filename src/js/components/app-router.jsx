
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const HashRouter = ReactRouterDom.HashRouter;
const Route = ReactRouterDom.Route;
const Switch = ReactRouterDom.Switch;

const About = require("./page/about.jsx");
const TaskList = require("./page/task-list.jsx");
const TaskView = require("./page/task-view.jsx");
const ProjectDelete = require("./page/project-delete.jsx");
const ProjectEdit = require("./page/project-edit.jsx");
const ProjectImport = require("./page/project-import.jsx");
const ProjectList = require("./page/project-list.jsx");
const ProjectView = require("./page/project-view.jsx");
const Settings = require("./page/settings.jsx");
const SettingsEdit = require("./page/settings-edit.jsx");

class AppRouter extends React.Component {

	constructor() {
		super();
		this.routes = (
			<Switch>
				<Route exact path="/" component={TaskList} />
				<Route exact path="/about" component={About} />
				<Route exact path="/tasks" component={TaskList} />
				<Route exact path="/task-view/:id" component={TaskView} />
				<Route exact path="/projects" component={ProjectList} />
				<Route exact path="/project-edit" component={ProjectEdit} />
				<Route exact path="/project-edit/:id" component={ProjectEdit} />
				<Route exact path="/project-view/:id" component={ProjectView} />
				<Route exact path="/project-delete/:id" component={ProjectDelete} />
				<Route exact path="/project-import" component={ProjectImport} />
				<Route exact path="/settings" component={Settings} />
				<Route exact path="/settings-edit" component={SettingsEdit} />
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