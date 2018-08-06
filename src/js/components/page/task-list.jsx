const React = require("react");
const ReactRedux = require('react-redux');

const AppPage = require("../app-page.jsx");
const Task = require("../forms/task.jsx");
const SmallButton = require("../ui/small-button.jsx");
const CommonButton = require("../ui/common-button.jsx");
const NewTaskForm = require("../forms/new-task-form.jsx");

const browserService = require('../../services/browser.js');
const githubService = require('../../services/github.js');
const L = require('../../services/i18n.js');
const reduxActions = require('../../services/redux-actions.js');
const store = require('../../services/store.js');

class TaskList extends React.Component {

	removeResolved () {
		store.dispatch(reduxActions.removeResolvedTasks());
	}


	formatList (tasks, projects) {
		const list = [];
		for (let i in tasks) {
			let task = tasks[i];
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
				}
				list.push(task);
			}
		}
		list.sort(function(a, b) {
			if (a.timestampModified < b.timestampModified) {
				return 1;
			}
			else if (a.timestampModified > b.timestampModified) {
				return -1;
			}
			else {
				return 0;
			}
		});
		return list;
	}


	render() {
		const self = this;
		let taskList = [];
		const tasks = self.props.tasks;
		const projects = self.props.projects;
		if (tasks) {
			taskList = self.formatList(tasks, projects);
		}
		const projectList = [
			{
				id : 0,
				name : '',
			},
		];
		for (let i in projects) {
			projectList.push(projects[i]);
		}

		const settings = self.props.settings;
		const isConnected = settings.user && settings.gistId && settings.token;

		return (
			<AppPage selectedMenu="tasks">
				<CommonButton onClick={self.removeResolved}>{L("Clean resolved")}</CommonButton>
				<table className="list-table" data-table="task-list">
					<tbody>
						<NewTaskForm projectList={projectList} settings={settings} />
						{taskList.map(elt => (
							<Task key={elt.id} task={elt} projects={projects} />
						))}
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = store.connect(TaskList);
