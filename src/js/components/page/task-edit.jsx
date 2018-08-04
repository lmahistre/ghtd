const React = require("react");
const ReactRedux = require('react-redux');
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const DateViewer = require('../ui/date-viewer.jsx');

const dataService = require('../../services/data.js');
const L = require('../../services/i18n.js');

class TaskEdit extends React.Component {

	update(id) {
		console.log(id);
		let task = dataService.getTask(id);
		// 	id : document.forms['project-edit'].id.value,
		// task.name : document.forms['task-edit'].name.value,
		// 	visible : document.forms['project-edit'].visible.checked,
		// 	color : document.forms['project-edit'].color.value,
		// 	provider : document.forms['project-edit'].provider.value,
		// 	repo : document.forms['project-edit'].repo.value,
		dataService.setTask(task.id, task);
		browserService.redirect('tasks');
	}


	render() {
		const self = this;
		let task = dataService.getTask(self.props.match.params.id);
		let project = task.projectId ? dataService.getProject(task.projectId) : null;
		return (
			<AppPage selectedMenu="tasks">
				<CommonButton onClick={self.update.bind(self, task.id)}>{L("Save")}</CommonButton>
				<CommonButton to={"/task-view/"+self.props.match.params.id}>{L("Cancel")}</CommonButton>
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

function mapStateToProps(state, ownProps) {
	return {
		tasks : state && state.tasks ? state.tasks : {},
		projects : state && state.projects ? state.projects : {},
		settings : state && state.settings ? state.settings : {},
	}
}

module.exports = ReactRedux.connect(mapStateToProps)(TaskEdit);