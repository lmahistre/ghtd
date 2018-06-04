const React = require("react");

const AppPage = require("../app-page.jsx");

const dataService = require('../../services/data.js');

class TaskView extends React.Component {

	render() {
		const self = this;
		let task = dataService.getTask(self.props.match.params.id);
		let project = task.projectId ? dataService.getProject(task.projectId) : null;
		return (
			<AppPage selectedMenu="tasks">
				<table className="list-table">
					<tbody>
						<tr>
							<td>{"Id"}</td>
							<td>{task.id}</td>
						</tr>
						<tr>
							<td>{"Label"}</td>
							<td>{task.name}</td>
						</tr>
						<tr>
							<td>{"Project"}</td>
							<td style={{color: '#'+project.color}}>{project.name}</td>
						</tr>
						<tr>
							<td>{"Creation time"}</td>
							<td>{task.timestampCreated}</td>
						</tr>
						<tr>
							<td>{"Modification time"}</td>
							<td>{task.timestampModified}</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = TaskView;