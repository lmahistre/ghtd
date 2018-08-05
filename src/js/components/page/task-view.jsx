const React = require("react");
const ReactRedux = require('react-redux');
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const DateViewer = require('../ui/date-viewer.jsx');

// const dataService = require('../../services/data.js');
const store = require('../../services/store.js');
const L = require('../../services/i18n.js');

class TaskView extends React.Component {

	render() {
		const self = this;
		// let task = dataService.getTask(self.props.match.params.id);
		const task = self.props.tasks 
			&& self.props.tasks[self.props.match.params.id] ? self.props.tasks[self.props.match.params.id] : {};
		const project = task.projectId ? self.props.projects[task.projectId] : null;
		return (
			<AppPage selectedMenu="tasks">
				<CommonButton to={"/task-edit/"+self.props.match.params.id}>{"Edit"}</CommonButton>
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
									<Link to={"/project-view/"+project.id} 
										style={{color: '#'+project.color}}>
										{project.name}
									</Link>
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

// function mapStateToProps(state, ownProps) {
// 	return {
// 		tasks : state && state.tasks ? state.tasks : {},
// 		projects : state && state.projects ? state.projects : {},
// 		settings : state && state.settings ? state.settings : {},
// 	}
// }

module.exports = store.connect(TaskView);