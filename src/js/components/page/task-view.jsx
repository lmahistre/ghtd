const React = require("react");
const ReactRedux = require('react-redux');
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const DateViewer = require('../ui/date-viewer.jsx');
const Block = require("../ui/block.jsx");

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
				<CommonButton to={"/task-edit/"+self.props.match.params.id}>{L("Edit")}</CommonButton>
				<Block>
					<div className="view-table">
						<div className="view-row">
							<div data-column="label">{L("Id")}</div>
							<div data-column="value">{task.id}</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("Label")}</div>
							<div data-column="value">{task.name}</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("Project")}</div>
							<div data-column="value">
								{project ?
									<Link to={"/project-view/"+project.id} 
										style={{color: '#'+project.color}}>
										{project.name}
									</Link>
								: null }
							</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("Creation time")}</div>
							<div data-column="value">
								<DateViewer time={task.timestampCreated} />
							</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("Modification time")}</div>
							<div data-column="value">
								<DateViewer time={task.timestampModified} />
							</div>
						</div>
					</div>
				</Block>
			</AppPage>
		);
	}
}

module.exports = store.connect(TaskView);