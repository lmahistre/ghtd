const React = require("react");

const AppPage = require("./app-page.jsx");

module.exports = React.createClass({

	displayName : "TaskList",

	addTask : function() {
		const taskName = document.getElementById('new-task').value;
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
		let projectId = parseInt(document.forms[0].projectId.value);
		if (isNaN(projectId)) {
			projectId = 0;
		}

		app.state.data.tasks[id] = {
			id : id,
			name : taskName,
			projectId : projectId,
			status : 'active',
		};
		console.log({
			id : id,
			name : taskName,
			projectId : projectId,
			status : 'active',
		});
		app.services.saveData();
		app.render();
	},


	handleInputKeyDown(event) {
		if (event.which == 13) {
			this.addTask();
		}
	},


	resolve(id) {
		if (app.state.data.tasks[id]) {
			app.state.data.tasks[id].status = 'done';
		}
		app.services.saveData();
		app.render();
	},


	delete(id) {
		if (app.state.data.tasks[id]) {
			delete app.state.data.tasks[id];
		}
		app.services.saveData();
		app.render();
	},


	unresolve(id) {
		if (app.state.data.tasks[id]) {
			app.state.data.tasks[id].status = 'active';
		}
		app.services.saveData();
		app.render();
	},


	render() {
		const self = this;
		const taskList = [];
		if (app.state.data.tasks) {
			for (let i in app.state.data.tasks) {
				let task = app.state.data.tasks[i];
				if (app.state.data.projects && app.state.data.projects[task.projectId]) {
					task.projectName = app.state.data.projects[task.projectId].name;
				}
				taskList.push(task);
			}
		}
		const projectList = [
			{
				id : 0,
				name : '',
			}
		];
		if (app.state.data.projects) {
			for (let i in app.state.data.projects) {
				projectList.push(app.state.data.projects[i]);
			}
		}
		return (
			<AppPage>
				<form>
					<select name="projectId">
						{projectList.map(elt => (
							<option value={elt.id}>{elt.name}</option>
						))}
					</select>
				</form>
				<input id="new-task" onKeyDown={this.handleInputKeyDown.bind(this)} />
				<button onClick={self.addTask}>GO</button>
				<table className="list-table">
					<tbody>
						{taskList.map(elt => (
							<tr key={elt.id} className={"status-"+elt.status}>
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
											<a href="javascript:void(0);" key={0} className="small-button">
												<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
											</a>,
											<a href="javascript:void(0);" key={1} className="small-button" onClick={self.resolve.bind(self, elt.id)}>
												<span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
											</a>
										]
									}
								</td>
								<td>{elt.projectId}</td>
								<td>{elt.projectName}</td>
								<td>{elt.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</AppPage>
		);
	}
});