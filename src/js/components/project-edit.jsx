const React = require("react");

const AppPage = require("./app-page.jsx");

module.exports = React.createClass({
	displayName : "ProjectEdit",

	save() {let id = 0;
		// Determine new id
		if (app.state.data.projects) {
			for (let i in app.state.data.projects) {
				if (app.state.data.projects[i].id && app.state.data.projects[i].id > id) {
					id = app.state.data.projects[i].id;
				}
			}
		}
		id++;

		let project = {
			id : id,
			name : document.forms[0].name.value,
		};
		if (project.name.length > 0) {
			app.state.data.projects[id] = project;
			app.services.saveData();
			app.render();
		}
	},


	render() {
		const self = this;
		return (
			<AppPage>
				<button onClick={self.save}>Save</button>
				<form name="project-edit">
					<table className="list-table">
						<tbody>
							<tr>
								<td>Name</td>
								<td>
									<input type="text" name="name" />
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</AppPage>
		);
	},
});