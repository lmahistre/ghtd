const React = require("react");
const ReactRedux = require('react-redux');
const ReactRouterDom = require('react-router-dom');

const Redirect = ReactRouterDom.Redirect;

const AppPage = require("../app-page.jsx");
const VisibleMarker = require("../visible-marker.jsx");
const CommonButton = require("../ui/common-button.jsx");
const DateViewer = require('../ui/date-viewer.jsx');

const store = require('../../services/store.js');
const reduxActions = require('../../services/redux-actions.js');
const L = require('../../services/i18n.js');

class ProjectView extends React.Component {

	render () {
		const self = this;
		const project = self.props.projects[self.props.match.params.id];
		if (project) {
			return (
				<AppPage selectedMenu="projects">
					<CommonButton to={"/project-edit/"+self.props.match.params.id}>{"Edit"}</CommonButton>
					<CommonButton to={"/project-delete/"+project.id}>{L("Delete")}</CommonButton>
					<div className="list-table">
						<div>
							<div>{"Id"}</div>
							<div>{project.id}</div>
						</div>
						<div>
							<div>{"Label"}</div>
							<div>{project.name}</div>
						</div>
						<div>
							<div>{"Color"}</div>
							<div style={{color : '#'+project.color}}>{project.color}</div>
						</div>
						<div>
							<div>{"Repository Provider"}</div>
							<div>{project.provider}</div>
						</div>
						<div>
							<div>{"Repository"}</div>
							<div>{project.repo}</div>
						</div>
						<div>
							<div>{"Status"}</div>
							<div>{project.status}</div>
						</div>
						<div>
							<div>{"Visible"}</div>
							<div>
								<VisibleMarker visible={project.visible} title={project.visible ? L('Visible') : L('Not visible')} />
							</div>
						</div>
						<div>
							<div>{"Creation time"}</div>
							<div>
								<DateViewer time={project.timestampCreated} />
							</div>
						</div>
						<div>
							<div>{"Modification time"}</div>
							<div>
								<DateViewer time={project.timestampModified}/>
							</div>
						</div>
					</div>
				</AppPage>
			);
		}
		else {
			store.dispatch(reduxActions.addAlert('error', L("This project does not exist.")));
			return (
				<Redirect to="/projects" />
			);
		}
	}
}

module.exports = store.connect(ProjectView);