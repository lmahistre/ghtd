const React = require("react");

const AppPage = require("../app-page.jsx");
const Task = require("../task.jsx");
const SmallButton = require("../ui/small-button.jsx");
const CommonButton = require("../ui/common-button.jsx");
const NewTaskForm = require("../forms/new-task-form.jsx");

const actionService = require('../../services/actions.js');
const browserService = require('../../services/browser.js');
const dataContainerService = require('../../services/data-container.js');

class TaskList extends React.Component {

	removeResolved () {
		const tasks = dataContainerService.getTasks();
		for (let i in tasks) {
			if (tasks[i].status === 'done') {
				dataContainerService.deleteTask(i);
			}
		}
		actionService.saveData();
		browserService.render();
	}


	sort (object) {
		const list = [];
		const projects = dataContainerService.getProjects();
		for (let i in object) {
			let task = object[i];
			if (!task.status) {
				task.status = 'active';
			}
			if (!projects[task.projectId]
					|| projects[task.projectId].visible 
					|| projects[task.projectId].visible === undefined) {
				if (projects[task.projectId]) {
					task.projectName = projects[task.projectId].name;
					task.projectColor = projects[task.projectId].color;
				}
				else {
					task.projectName = ' ';
					task.projectColor = 'FFF';
				}
				list.push(task);
			}
		}
		return list;
	}


	render() {
		const self = this;
		let taskList = [];
		if (dataContainerService.getDataIsLoaded()) {
			taskList = self.sort(dataContainerService.getTasks());
		}
		const projectList = [
			{
				id : 0,
				name : '',
			},
		];
		const projects = dataContainerService.getProjects();
		for (let i in projects) {
			projectList.push(projects[i]);
		}
		return (
			<AppPage selectedMenu="tasks">
				<CommonButton onClick={self.removeResolved}>{"Clean resolved"}</CommonButton>
				<div className="list-container">
					<NewTaskForm projectList={projectList} />
					{taskList.map(elt => (
						<Task key={elt.id} task={elt} />
					))}
				</div>
			</AppPage>
		);
	}
}

module.exports = TaskList;