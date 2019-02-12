
const React = require("react");
const ReactRedux = require('react-redux');

const ReactRouterDom = require('react-router-dom');
const HashRouter = ReactRouterDom.HashRouter;
const Route = ReactRouterDom.Route;
const Switch = ReactRouterDom.Switch;

const { Home, TaskList, TaskEdit, TaskView, ProjectDelete, ProjectEdit,
	ProjectImport, ProjectList, ProjectView, SettingsView, SettingsAbout,
	SettingsEdit, SettingsLang,
} = require('./page/index.js');

class AppRouter extends React.Component {

	constructor() {
		super();
		this.routes = (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/tasks" component={TaskList} />
				<Route exact path="/task-edit/:id" component={TaskEdit} />
				<Route exact path="/task-view/:id" component={TaskView} />
				<Route exact path="/projects" component={ProjectList} />
				<Route exact path="/project-edit" component={ProjectEdit} />
				<Route exact path="/project-edit/:id" component={ProjectEdit} />
				<Route exact path="/project-view/:id" component={ProjectView} />
				<Route exact path="/project-delete/:id" component={ProjectDelete} />
				<Route exact path="/project-import" component={ProjectImport} />
				<Route exact path="/settings" component={SettingsView} />
				<Route exact path="/settings-about" component={SettingsAbout} />
				<Route exact path="/settings-edit" component={SettingsEdit} />
				<Route exact path="/settings-lang/:lang" component={SettingsLang} />
				<Route exact path="*" component={Home} />
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