const React = require("react");

const AppPage = require("./app-page.jsx");
const Task = require("./task.jsx");
const SmallButton = require("./small-button.jsx");
const CommonButton = require("./common-button.jsx");

class TaskList extends React.Component {

	addTask() {
		// Task ID
		let id = 0;
		if (app.state.data.tasks) {
			for (let i in app.state.data.tasks) {
				if (app.state.data.tasks[i].id && app.state.data.tasks[i].id > id) {
					id = app.state.data.tasks[i].id;
				}
			}
		}
		id++;

		// Project ID
		const name = document.forms['new-task'].name.value;
		let projectId = parseInt(document.forms['new-task'].projectId.value);
		if (isNaN(projectId)) {
			projectId = 0;
		}

		let task = {
			id : id,
			name : name,
			projectId : projectId,
			status : 'active',
		};
		app.state.data.tasks[id] = task;
		app.services.saveData();
		app.render();
	}


	handleInputKeyDown(event) {
		if (event.which == 13) {
			this.addTask();
		}
	}


	formFakeSubmit(event) {
		event.stopPropagation();
		event.preventDefault();
	}


	removeResolved() {
		for (let i in app.state.data.tasks) {
			if (app.state.data.tasks[i].status === 'done') {
				delete app.state.data.tasks[i];
			}
		}
		app.services.saveData();
		app.render();
	}


	render() {
		const self = this;
		const taskList = [];
		if (app.state.data.tasks) {
			for (let i in app.state.data.tasks) {
				let task = app.state.data.tasks[i];
				if (app.state.data.projects[task.projectId].visible 
						|| app.state.data.projects[task.projectId].visible === undefined) {
					if (app.state.data.projects && app.state.data.projects[task.projectId]) {
						task.projectName = app.state.data.projects[task.projectId].name;
					}
					else {
						task.projectName = ' ';
					}
					taskList.push(task);
				}
			}
		}
		const projectList = [
			{
				id : 0,
				name : '',
			},
		];
		if (app.state.data.projects) {
			for (let i in app.state.data.projects) {
				projectList.push(app.state.data.projects[i]);
			}
		}
		return (
			<AppPage selectedMenu="tasks">
				<form name="new-task" onSubmit={self.formFakeSubmit}>
					<select name="projectId">
						{projectList.map(elt => (
							<option key={elt.id} value={elt.id}>{elt.name}</option>
						))}
					</select>
					<input name="name" onKeyDown={this.handleInputKeyDown.bind(this)} />
					<SmallButton glyphicon="plus-sign" onClick={self.addTask} title="Add task" />
				</form>
				<CommonButton onClick={self.removeResolved}>Clean resolved tasks</CommonButton>
				<table className="list-table">
					<tbody>
						{taskList.map(elt => (
							<Task key={elt.id} task={elt} />
						))}
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = TaskList;