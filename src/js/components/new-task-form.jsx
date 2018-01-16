
const React = require("react");

const SmallButton = require("./ui/small-button.jsx");

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
		this.setState({
			name: '',
		});
		app.state.data.tasks[id] = task;
		app.services.saveData();
		app.render();
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
				<select name="projectId">
					{self.props.projectList.map(elt => (
						<option key={elt.id} value={elt.id}>{elt.name}</option>
					))}
				</select>
				<input type="text" name="name"value={self.state.name} onKeyDown={self.handleInputKeyDown.bind(self)} onChange={self.onChangeName.bind(self)} />
				<SmallButton glyphicon="plus-sign" onClick={self.addTask} title={"Add task"} />
			</form>
		);
	}
}

module.exports = NewTaskForm;