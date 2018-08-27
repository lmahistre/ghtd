const React = require("react");
const ReactRedux = require('react-redux');
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const DateViewer = require('../ui/date-viewer.jsx');
const TaskEditForm = require('../forms/task-edit.jsx');

const L = require('../../services/i18n.js');
const reduxActions = require('../../services/redux-actions.js');
const store = require('../../services/store.js');
const browserService = require('../../services/browser.js');

class TaskEdit extends React.Component {

	update(task) {
		const form = document.forms['task-edit'];
		task.name = form.name.value;
		task.projectId = form.projectId.value;
		task.timestampModified = parseInt(Date.now()/1000);
		store.dispatch(reduxActions.updateTask(task));
		browserService.redirect('tasks');
	}


	render() {
		let task = this.props.tasks[this.props.match.params.id];
		// let project = task.projectId ? this.props.projects[task.projectId] : null;
		const projectList = [
			{
				id : 0,
				name : '',
			},
		];
		for (let i in this.props.projects) {
			projectList.push(this.props.projects[i]);
		}
		return (
			<AppPage selectedMenu="tasks">
				<CommonButton onClick={this.update.bind(this, task)}>{L("Save")}</CommonButton>
				<CommonButton to={"/task-view/"+this.props.match.params.id}>{L("Cancel")}</CommonButton>
				<TaskEditForm 
					task={task} 
					projectList={projectList} 
					save={this.update.bind(this, task)} 
				/>
			</AppPage>
		);
	}
}

module.exports = store.connect(TaskEdit);