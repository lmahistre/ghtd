const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

const SmallButton = require("../ui/small-button.jsx");
const Row = require("../ui/row.jsx");

const L = require('../../services/i18n.js');
const reduxActions = require('../../services/redux-actions.js');
const store = require('../../services/store.js');

class Task extends React.Component {

	resolve(id) {
		store.dispatch(reduxActions.setTaskStatus(id, 'done'));
	}


	remove(id) {
		store.dispatch(reduxActions.setTaskStatus(id, 'removed'));
	}


	unresolve(id) {
		store.dispatch(reduxActions.setTaskStatus(id, 'active'));
	}


	edit() {
		const self = this;
		self.setState({
			isBeingEdited : true,
		});
	}


	cancel() {
		const self = this;
		self.setState({
			isBeingEdited : false,
		});
	}


	save() {
		const newState = {
			isBeingEdited : false,
		}
		const id = this.props.task.id;
		const task = this.props.task;
		const name = document.getElementById("task-edit-name-"+id).value;
		const projectId = document.getElementById("task-edit-projectId-"+id).value;
		if (task.name != name || task.projectId != projectId) {
			task.name = name;
			task.projectId = projectId;
			task.timestampModified = parseInt(Date.now()/1000);
			newState.task = task;
			store.dispatch(reduxActions.updateTask(task));
		}
		this.setState({
			isBeingEdited : false,
		});
	}


	handleInputKeyDown(event) {
		if (event.which == 13) {
			this.save();
		}
	}


	render() {
		const self = this;
		const elt = self.props.task;

		if (elt.status !== 'removed') {
			if (self.state && self.state.isBeingEdited) {
				const projectList = [
					{
						id : 0,
						name : '',
						color : '',
					}
				];
				const projects = self.props.projects;
				for (let i in projects) {
					let project = projects[i];
					if (project.status == 'active') {
						projectList.push(project);
					}
				}
				return (
					<Row className={"task status-"+elt.status}>
						<div className="td actions" data-column="actions">
							<SmallButton fa="remove" onClick={self.cancel.bind(self)} title={L("Cancel")} color="red" />
							<SmallButton fa="check" onClick={self.save.bind(self)} title={L("Save")} color="green" />
						</div>
						<div className="td" data-column="project">
							<select id={"task-edit-projectId-"+elt.id} className="project-label" name="projectId" defaultValue={elt.projectId} onKeyDown={self.handleInputKeyDown.bind(self)}>
								{projectList.map(opt => (
									<option key={opt.id} value={opt.id}>{opt.name}</option>
								))}
							</select>
						</div>
						<div className="td" data-column="name">
							<input id={"task-edit-name-"+elt.id} type="text" name="name" defaultValue={elt.name} onKeyDown={self.handleInputKeyDown.bind(self)} />
						</div>
					</Row>
				);
			}
			else {
				const style = {};
				if (elt.projectColor) {
					style.backgroundColor = '#'+elt.projectColor;
				}
				return (
					<Row className={"task status-"+elt.status}>
						<div className="td actions" data-column="actions">
							{elt.status == 'done' ? 
								[
									<SmallButton key={0} fa="trash" onClick={self.remove.bind(self, elt.id)} title={L("Delete")} color="red" />,
									<SmallButton key={1} fa="folder-open" onClick={self.unresolve.bind(self, elt.id)} title={L("Reopen")} color="orange" />
								]
							:
								[
									<SmallButton key={0} fa="edit" onClick={self.edit.bind(self, elt.id)} title={L("Edit")} color="blue" />,
									<SmallButton key={1} fa="check" onClick={self.resolve.bind(self, elt.id)} title={L("Resolve")} color="green" />
								]
							}
							<SmallButton fa="eye" to={"/task-view/"+elt.id} title={L("View detail")} color="blue" />
						</div>
						<div className="td project-label-container" data-column="project">
							<div className="project-label" style={style} title={elt.projectName} data-tip={elt.projectName}>{elt.projectName}</div>
						</div>
						<div className="td" data-column="name">
							<div className="label">{elt.name}</div>
						</div>
					</Row>
				);
			}
		}
		else {
			return null;
		}
	}
}

module.exports = Task;