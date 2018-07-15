
const React = require("react");

const SmallButton = require("../ui/small-button.jsx");

const dataService = require('../../services/data.js');
const browserService = require('../../services/browser.js');
const utilsService = require('../../services/utils.js');
const L = require('../../services/i18n.js');

class NewTaskForm extends React.Component {

	handleInputKeyDown(event) {
		if (event.which == 13) {
			this.addTask();
		}
		else {
		}
	}


	addTask() {
		const name = document.getElementById('new-task-name').value;
		if (name.length > 0) {
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
			dataService.setTask(task.id, task);
			browserService.render();
		}
	}


	onChangeName(event) {
		this.setState({
			name: event.target.value,
		});
	}

	onChangeProject (event) {
		const settings = dataService.getSettings();
		settings.projectId = event.target.value;
		dataService.setSettings(settings);
		this.setState({
			projectId: event.target.value,
		});
	}

	constructor() {
		super();
		const settings = dataService.getSettings();
		this.state = {
			name : '',
			projectId : settings && settings.projectId ? settings.projectId : '',
		};
	}

	render() {
		const self = this;
		return (
			<tr name="new-task" className="list-elt new-task-form">
				<td data-column="actions">
					<SmallButton fa="plus-circle" onClick={self.addTask.bind(self)} title={L("Add task")} color="blue" />
				</td>
				<td data-column="project">
					<select className="project-label" name="projectId" id="new-task-projectId" value={self.state.projectId} onChange={self.onChangeProject.bind(self)}>
						{self.props.projectList.map(elt => (
							<option key={elt.id} value={elt.id}>{elt.name}</option>
						))}
					</select>
				</td>
				<td>
					<input id="new-task-name" type="text" name="name" value={self.state.name} onKeyDown={self.handleInputKeyDown.bind(self)} onChange={self.onChangeName.bind(self)} />
				</td>
			</tr>
		);
	}
}

module.exports = NewTaskForm;