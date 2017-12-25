
const React = require("react");

// const TaskList = require('./task-list.jsx');
// const ProjectList = require('./project-list.jsx');
// const AppRouter = require('./app-router.jsx');
const Menu = require('./menu.jsx');

module.exports = React.createClass({

	displayName : "AppPage",

	addTask : function() {
		const taskName = document.getElementById('new-task').value;
		let id = 0;
		if (app.state.data.tasks) {
			for (let i in app.state.data.tasks) {
				if (app.state.data.tasks[i].id && app.state.data.tasks[i].id > id) {
					id = app.state.data.tasks[i].id;
				}
			}
		}
		id++;
		app.state.data.tasks[id] = {
			id : id,
			name : taskName,
			projectId : 0,
			status : 'active',
		}
		app.services.saveData();
		app.render();
	},


	handleInputKeyDown(event) {
		if (event.which == 13) {
			this.addTask();
		}
	},


	render : function() {
		const self = this;
		// const authorized = (app.state.currentUser ? true : false);
		// const taskList = [];
		// const projectList = [];
		// if (app.state.data.tasks) {
		// 	for (let i in app.state.data.tasks) {
		// 		taskList.push(app.state.data.tasks[i]);
		// 	}
		// }
		// if (app.state.data.projects) {
		// 	for (let i in app.state.data.projects) {
		// 		taskList.push(app.state.data.projects[i]);
		// 	}
		// }

		// if (app.state.isInitialized) {
		// 	if (authorized) {
		// 		pageContent = this.props.children;
		// 	}
		// 	else {
		// 		pageContent = (
		// 			LoginPage
		// 		);
		// 	}
		// }
		// console.log(taskList);

		return (
			<div className="container">
				<Menu currentPage={app.state.currentPage} />
				<input id="new-task" onKeyDown={this.handleInputKeyDown.bind(this)} />
				<button onClick={self.addTask}>GO</button>
				{self.props.children}
			</div>
		);
	},
});
