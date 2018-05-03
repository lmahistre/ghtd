
const React = require("react");

const SmallButton = require("../ui/small-button.jsx");

const actionsService = require('../../services/actions.js');
const dataContainerService = require('../../services/data-container.js');
const browserService = require('../../services/browser.js');
const utilsService = require('../../services/utils.js');

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
		const name = document.getElementById('new-task-name').value;
		if (name.length > 0) {
			// Project ID
			alert(document.getElementById('new-task-projectId').value);
			let projectId = document.getElementById('new-task-projectId').value;
			let task = {
				id : utilsService.getNextTaskId(),
				name : name,
				projectId : projectId,
				status : 'active',
				timestampCreated : parseInt(Date.now()/1000),
				timestampModified : parseInt(Date.now()/1000),
			};
			this.setState({
				name: '',
			});
			dataContainerService.setTask(task.id, task);
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
			<tr name="new-task" onSubmit={self.formFakeSubmit} className="list-elt new-task-form">
				<td className="actions">
					<SmallButton fa="plus-circle" onClick={self.addTask.bind(self)} title={"Add task"} />
				</td>
				<td className="project-label-container">
					<select name="projectId" id="new-task-projectId">
						{self.props.projectList.map(elt => (
							<option key={elt.id} value={elt.id}>{elt.name}</option>
						))}
					</select>
				</td>
				<td>
					<input id="new-task-name" type="text" name="name"value={self.state.name} onKeyDown={self.handleInputKeyDown.bind(self)} onChange={self.onChangeName.bind(self)} />
				</td>
			</tr>
		);
	}
}

module.exports = NewTaskForm;