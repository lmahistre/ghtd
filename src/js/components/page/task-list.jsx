const React = require("react");

const AppPage = require("../app-page.jsx");
const Task = require("../task.jsx");
const SmallButton = require("../ui/small-button.jsx");
const CommonButton = require("../ui/common-button.jsx");
const NewTaskForm = require("../new-task-form.jsx");

class TaskList extends React.Component {

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
				if (!task.status) {
					task.status = 'active';
				}
				if (!app.state.data.projects[task.projectId]
						|| app.state.data.projects[task.projectId].visible 
						|| app.state.data.projects[task.projectId].visible === undefined) {
					if (app.state.data.projects && app.state.data.projects[task.projectId]) {
						task.projectName = app.state.data.projects[task.projectId].name;
						task.projectColor = app.state.data.projects[task.projectId].color;
					}
					else {
						task.projectName = ' ';
						task.projectColor = 'FFF';
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
				<CommonButton onClick={self.removeResolved}>Clean resolved</CommonButton>
				<NewTaskForm projectList={projectList} />
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