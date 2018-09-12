const React = require("react");
const ReactRedux = require('react-redux');
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const DateViewer = require('../ui/date-viewer.jsx');

const store = require('../../services/store.js');
const L = require('../../services/i18n.js');

class TaskView extends React.Component {

	render() {
		const self = this;
		const task = self.props.tasks 
			&& self.props.tasks[self.props.match.params.id] ? self.props.tasks[self.props.match.params.id] : {};
		const project = task.projectId ? self.props.projects[task.projectId] : null;
		return (
			<AppPage selectedMenu="tasks">
				<CommonButton to={"/task-edit/"+self.props.match.params.id}>{"Edit"}</CommonButton>
				<div className="list-table">
						<div>
							<div>{L("Id")}</div>
							<div>{task.id}</div>
						</div>
						<div>
							<div>{L("Label")}</div>
							<div>{task.name}</div>
						</div>
						<div>
							<div>{L("Project")}</div>
							<div>
								{project ?
									<Link to={"/project-view/"+project.id} 
										style={{color: '#'+project.color}}>
										{project.name}
									</Link>
								: null }
							</div>
						</div>
						<div>
							<div>{L("Creation time")}</div>
							<div>
								<DateViewer time={task.timestampCreated} />
							</div>
						</div>
						<div>
							<div>{L("Modification time")}</div>
							<div>
								<DateViewer time={task.timestampModified} />
							</div>
						</div>
				</div>
			</AppPage>
		);
	}
}

module.exports = store.connect(TaskView);