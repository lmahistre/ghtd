
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const HashRouter = ReactRouterDom.HashRouter;
const Route = ReactRouterDom.Route;
const Switch = ReactRouterDom.Switch;

const TaskList = require("./task-list.jsx");
const ProjectList = require("./project-list.jsx");

module.exports = React.createClass({

	displayName : "AppRouter",

	routes : (
		<Switch>
			<Route exact path="/" component={TaskList} />
			<Route exact path="/tasks" component={TaskList} />
			<Route exact path="/projects" component={ProjectList} />
			<Route exact path="*" component={TaskList} />
		</Switch>
	),

	render : function () {
		return (
			<HashRouter>
				{this.routes}
			</HashRouter>
		);
	},
});

