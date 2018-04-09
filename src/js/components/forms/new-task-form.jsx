
const React = require("react");

const SmallButton = require("../ui/small-button.jsx");

const actionsService = require('../../services/actions.js');
const dataContainerService = require('../../services/data-container.js');
const browserService = require('../../services/browser.js');

class NewTaskForm extends React.Component {

	handleInputKeyDown(event) {
		if (event.which == 13) {
			this.addTask();
		}
		else {
		}
	}


	formFakeSubmit(event) {
		event.stopPropagation();
		event.preventDefault();
	}


	addTask() {
		const name = document.forms['new-task'].name.value;
		if (name.length > 0) {
			// Task ID
			const tasks = dataContainerService.getTasks();
			let id = 0;
			for (let i in tasks) {
				if (tasks[i].id && tasks[i].id > id) {
					id = tasks[i].id;
				}
			}
			id++;

			// Project ID
			let projectId = parseInt(document.forms['new-task'].projectId.value);
			if (isNaN(projectId)) {
				projectId = 0;
			}

			let task = {
				id : id,
				name : name,
				projectId : projectId,
				status : 'active',
				timestampCreated : parseInt(Date.now()/1000),
				timestampModified : parseInt(Date.now()/1000),
			};
			this.setState({
				name: '',
			});
			dataContainerService.setTask(id, task);
			actionsService.saveData();
			browserService.render();
		}
	}


	onChangeName(event) {
		this.setState({
			name: event.target.value,
		});
	}


	constructor() {
		this.state = {
			name : '',
		};
	}

	render() {
		const self = this;
		return (
			<form name="new-task" onSubmit={self.formFakeSubmit} className="new-task-form">
				<SmallButton glyphicon="plus-sign" onClick={self.addTask.bind(self)} title={"Add task"} />
				<select name="projectId">
					{self.props.projectList.map(elt => (
						<option key={elt.id} value={elt.id}>{elt.name}</option>
					))}
				</select>
				<input type="text" name="name"value={self.state.name} onKeyDown={self.handleInputKeyDown.bind(self)} onChange={self.onChangeName.bind(self)} />
			</form>
		);
	}
}

module.exports = NewTaskForm;