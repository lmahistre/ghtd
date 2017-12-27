const React = require("react");

const AppPage = require("./app-page.jsx");

// module.exports = React.createClass({
// 	displayName : "ProjectEdit",
class ProjectEdit extends React.Component {

	create() {
		let id = 0;
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
	}


	update() {
		let project = {
			id : document.forms[0].id.value,
			name : document.forms[0].name.value,
		};
		if (app.state.data.projects[project.id]) {
			app.state.data.projects[project.id] = project;
			app.services.saveData();
			app.render();
		}
		else {
			app.error("Unexisting project");
		}
	}


	render() {
		const self = this;
		let project = {
			id : 0,
			name : '',
		};
		let save = self.create;
		if (self.props.match 
				&& self.props.match.params 
				&& self.props.match.params.id
				&& app.state.data.projects[self.props.match.params.id]
		) {
			project = app.state.data.projects[self.props.match.params.id];
			save = self.update;
		}
		return (
			<AppPage>
				<button onClick={save}>Save</button>
				<form name="project-edit">
					<input type="hidden" name="id" value={project.id} />
					<table className="list-table">
						<tbody>
							<tr>
								<td>Name</td>
								<td>
									<input type="text" name="name" defaultValue={project.name} />
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</AppPage>
		);
	}
}

module.exports = ProjectEdit;