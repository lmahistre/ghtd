const React = require("react");
const ReactRedux = require('react-redux')

const AppPage = require("../app-page.jsx");
const Task = require("../task.jsx");
const SmallButton = require("../ui/small-button.jsx");
const CommonButton = require("../ui/common-button.jsx");
const NewTaskForm = require("../forms/new-task-form.jsx");

const actionsService = require('../../services/actions.js');
const browserService = require('../../services/browser.js');
const githubService = require('../../services/github.js');
const dataService = require('../../services/data.js');
const L = require('../../services/i18n.js');
const reduxActions = require('../services/redux-actions.js')


class TaskList extends React.Component {

	removeResolved () {
		actionsService.removeResolvedTasks();
		browserService.render();
	}


	retrieveList (object) {
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
		const tasks = dataService.getTasks();
		if (tasks) {
			taskList = self.retrieveList(dataService.getTasks());
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

		const settings = dataService.getSettings();
		const isConnected = settings.user && settings.gistId && settings.token;

		return (
			<AppPage selectedMenu="tasks">
				<CommonButton onClick={self.removeResolved}>{L("Clean resolved")}</CommonButton>
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

function mapStateToProps(state, ownProps) {
	console.log(state);
}

module.exports = ReactRedux.connect(mapStateToProps)(TaskList);
