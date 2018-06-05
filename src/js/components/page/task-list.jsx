const React = require("react");

const AppPage = require("../app-page.jsx");
const Task = require("../task.jsx");
const SmallButton = require("../ui/small-button.jsx");
const CommonButton = require("../ui/common-button.jsx");
const NewTaskForm = require("../forms/new-task-form.jsx");

const actionsService = require('../../services/actions.js');
const browserService = require('../../services/browser.js');
const githubService = require('../../services/github.js');
const storageService = require('../../services/storage.js');
const dataService = require('../../services/data.js');

class TaskList extends React.Component {

	removeResolved () {
		actionsService.removeResolvedTasks();
		browserService.render();
	}


	sort (object) {
		const list = [];
		const projects = dataService.getProjects();
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
		list.sort(function(a, b) {
			return a.timestampModified < b.timestampModified;
		});
		return list;
	}


	render() {
		const self = this;
		let taskList = [];
		const tasks = dataService.getTasks();
		if (tasks) {
			taskList = self.sort(dataService.getTasks());
		}
		const projectList = [
			{
				id : 0,
				name : '',
			},
		];
		const projects = dataService.getProjects();
		for (let i in projects) {
			projectList.push(projects[i]);
		}

		const settings = storageService.getSettings();
		const isConnected = settings.user && settings.gistId && settings.token;

		return (
			<AppPage selectedMenu="tasks">
				<CommonButton onClick={self.removeResolved}>{"Clean resolved"}</CommonButton>
				{isConnected ? 
					<CommonButton onClick={actionsService.pullFromGitHub}>{"Sync with GitHub"}</CommonButton>
				: null}
				{isConnected ? 
					<CommonButton onClick={actionsService.saveToGitHub}>{"Save to GitHub"}</CommonButton>
				: null}
				<table className="list-table" data-table="task-list">
					<tbody>
						<NewTaskForm projectList={projectList} />
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