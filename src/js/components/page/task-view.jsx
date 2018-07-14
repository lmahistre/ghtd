const React = require("react");
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("../app-page.jsx");

const dataService = require('../../services/data.js');
const L = require('../../services/i18n.js');
const DateViewer = require('../ui/date-viewer.jsx');

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
							<td>{L("Id")}</td>
							<td>{task.id}</td>
						</tr>
						<tr>
							<td>{L("Label")}</td>
							<td>{task.name}</td>
						</tr>
						<tr>
							<td>{L("Project")}</td>
							<td>
								{project ?
									<Link to={"/project-view/"+project.id} style={{color: '#'+project.color}}>{project.name}</Link>
								: null }
							</td>
						</tr>
						<tr>
							<td>{L("Creation time")}</td>
							<td>
								<DateViewer time={task.timestampCreated} />
							</td>
						</tr>
						<tr>
							<td>{L("Modification time")}</td>
							<td>
								<DateViewer time={task.timestampModified} />
							</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = TaskView;