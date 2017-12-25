const React = require("react");

const AppPage = require("./app-page.jsx");

module.exports = React.createClass({

	displayName : "TaskList",

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
				taskList.push(app.state.data.tasks[i]);
			}
		}
		return (
			<AppPage>
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
								<td>{elt.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</AppPage>
		);
	}
});