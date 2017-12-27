const React = require("react");

// module.exports = React.createClass({

// 	displayName : "Task",
class Task extends React.Component {

	resolve(id) {
		if (app.state.data.tasks[id]) {
			app.state.data.tasks[id].status = 'done';
		}
		app.services.saveData();
		app.render();
	}


	delete(id) {
		if (app.state.data.tasks[id]) {
			delete app.state.data.tasks[id];
		}
		app.services.saveData();
		app.render();
	}


	unresolve(id) {
		if (app.state.data.tasks[id]) {
			app.state.data.tasks[id].status = 'active';
		}
		app.services.saveData();
		app.render();
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
		const name = document.getElementById("task-edit-name-"+id).value;
		let projectId = parseInt(document.getElementById("task-edit-projectId-"+id).value);
		if (isNaN(projectId)) {
			projectId = 0;
		}
		const task = {
			id : id,
			name : name,
			projectId : projectId,
		};
		// console.log(task);
		if (app.state.data.tasks[id].name != task.name || app.state.data.tasks[id].projectId != task.projectId) {
			app.state.data.tasks[id] = task;
			app.services.saveData();
			app.render();
		}
	}


	render() {
		const self = this;
		const elt = self.props.task;

		if (self.state && self.state.isBeingEdited) {
			const projectList = [
				{
					id : 0,
					name : '',
				}
			];
			if (app.state.data.projects) {
				for (let i in app.state.data.projects) {
					let project = app.state.data.projects[i];
					projectList.push(project);
				}
			}
			return (
				<tr className={"status-"+elt.status}>
					<td>
						<a href="javascript:void(0);" className="small-button" onClick={self.cancel.bind(self)}>
							<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
						</a>
						<a href="javascript:void(0);" className="small-button" onClick={self.save.bind(self)}>
							<span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
						</a>
					</td>
					<td></td>
					<td>
						<select id={"task-edit-projectId-"+elt.id} name="projectId" defaultValue={elt.projectId}>
							{projectList.map(opt => (
								<option key={opt.id} value={opt.id}>{opt.name}</option>
							))}
						</select>
					</td>
					<td>
						<input id={"task-edit-name-"+elt.id} type="text" name="name" defaultValue={elt.name} />
					</td>
				</tr>
			);
		}
		else {
			return (
				<tr className={"status-"+elt.status}>
					<td>
						{elt.status == 'done' ? 
							[
								<a href="javascript:void(0);" key={0} className="small-button" onClick={self.delete.bind(self, elt.id)}>
									<span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
								</a>,
								<a href="javascript:void(0);" key={1} className="small-button" onClick={self.unresolve.bind(self, elt.id)}>
									<span className="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
								</a>
							]
						:
							[
								<a href="javascript:void(0);" key={0} className="small-button" onClick={self.edit.bind(self)}>
									<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
								</a>,
								<a href="javascript:void(0);" key={1} className="small-button" onClick={self.resolve.bind(self, elt.id)}>
									<span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
								</a>
							]
						}
					</td>
					<td>{elt.projectId}</td>
					<td>
						<div className="project-label">{elt.projectName}</div>
					</td>
					<td>{elt.name}</td>
				</tr>
			);
		}
	}
}

module.exports = Task;