const React = require("react");

const AppPage = require("../app-page.jsx");

class ProjectView extends React.Component {

	render () {
		const self = this;
		let task = dataService.getTask(self.props.match.params.id);
		let project = task.projectId ? dataService.getProject(task.projectId) : null;
		return (
			<AppPage selectedMenu="projects">
				<table className="list-table">
					<tbody>
						<tr>
							<td>{"Id"}</td>
							<td>{project.id}</td>
						</tr>
						<tr>
							<td>{"Label"}</td>
							<td>{project.name}</td>
						</tr>
						<tr>
							<td>{"Project"}</td>
							<td>{project.color}</td>
						</tr>
						<tr>
							<td>{"Repository"}</td>
							<td>{project.repo}</td>
						</tr>
						<tr>
							<td>{"Visible"}</td>
							<td>{project.visible}</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = ProjectView;