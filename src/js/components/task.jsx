const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

const SmallButton = require("./ui/small-button.jsx");

const browserService = require('../services/browser.js');
const dataService = require('../services/data.js');
const storageService = require('../services/storage.js');
const L = require('../services/i18n.js');

class Task extends React.Component {

	resolve(id) {
		const task = dataService.getTask(id);
		if (task) {
			task.status = 'done';
			task.timestampModified = parseInt(Date.now()/1000);
		}
		dataService.setTask(id, task);
		browserService.render();
	}


	delete(id) {
		dataService.deleteTask(id);
		browserService.render();
	}


	unresolve(id) {
		const task = dataService.getTask(id);
		if (task) {
			task.status = 'active';
			task.timestampModified = parseInt(Date.now()/1000);
		}
		dataService.setTask(id, task);
		browserService.render();
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
		const self = this;
		self.setState({
			isBeingEdited : false,
		});
		const id = self.props.task.id;
		const task = dataService.getTask(self.props.task.id);
		const name = document.getElementById("task-edit-name-"+id).value;
		const projectId = document.getElementById("task-edit-projectId-"+id).value;
		if (task.name != name || task.projectId != projectId) {
			task.name = name;
			task.projectId = projectId;
			task.timestampModified = parseInt(Date.now()/1000);
			dataService.setTask(id, task);
			storageService.save({
				tasks : dataService.getTasks(),
			});
			browserService.render();
		}
	}


	handleInputKeyDown(event) {
		if (event.which == 13) {
			this.save();
		}
	}


	viewTaskDetail() {
		browserService.redirect('task-view/'+this.props.task.id);
	}


	render() {
		const self = this;
		const elt = self.props.task;

		if (self.state && self.state.isBeingEdited) {
			const projectList = [
				{
					id : 0,
					name : '',
					color : '',
				}
			];
			const projects = dataService.getProjects();
			for (let i in projects) {
				let project = projects[i];
				projectList.push(project);
			}
			return (
				<tr className={"status-"+elt.status}>
					<td className="actions" data-column="actions">
						<SmallButton fa="remove" onClick={self.cancel.bind(self)} title={L("Cancel")} />
						<SmallButton fa="check" onClick={self.save.bind(self)} title={L("Save")} />
					</td>
					<td data-column="project">
						<select id={"task-edit-projectId-"+elt.id} className="project-label" name="projectId" defaultValue={elt.projectId} onKeyDown={self.handleInputKeyDown.bind(self)}>
							{projectList.map(opt => (
								<option key={opt.id} value={opt.id}>{opt.name}</option>
							))}
						</select>
					</td>
					<td data-column="name">
						<input id={"task-edit-name-"+elt.id} type="text" name="name" defaultValue={elt.name} onKeyDown={self.handleInputKeyDown.bind(self)} />
					</td>
				</tr>
			);
		}
		else {
			const style = {};
			if (elt.projectColor) {
				style.backgroundColor = '#'+elt.projectColor;
			}
			return (
				<tr className={"status-"+elt.status}>
					<td className="actions" data-column="actions">
						{elt.status == 'done' ? 
							[
								<SmallButton key={0} fa="trash" onClick={self.delete.bind(self, elt.id)} title={L("Delete")} />,
								<SmallButton key={1} fa="folder-open" onClick={self.unresolve.bind(self, elt.id)} title={L("Reopen")} />
							]
						:
							[
								<SmallButton key={0} fa="edit" onClick={self.edit.bind(self, elt.id)} title={L("Edit")} />,
								<SmallButton key={1} fa="check" onClick={self.resolve.bind(self, elt.id)} title={L("Resolve")} />
							]
						}
						<SmallButton fa="eye" to={"/task-view/"+elt.id} title={L("View detail")} />
					</td>
					<td className="project-label-container" data-column="project">
						<div className="project-label" style={style} title={elt.projectName} data-tip={elt.projectName}>{elt.projectName}</div>
					</td>
					<td data-column="name">{elt.name}</td>
				</tr>
			);
		}
	}
}

module.exports = Task;