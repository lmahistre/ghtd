const React = require("react");
const ReactRedux = require('react-redux');
const ReactRouterDom = require('react-router-dom');

const Redirect = ReactRouterDom.Redirect;

const AppPage = require("../app-page.jsx");
const VisibleMarker = require("../ui/visible-marker.jsx");
const CommonButton = require("../ui/common-button.jsx");
const DateViewer = require('../ui/date-viewer.jsx');
const Block = require("../ui/block.jsx");

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
					<Block>
						<div className="view-table">
							<div className="view-row">
								<div data-column="label">{"Id"}</div>
								<div data-column="value">{project.id}</div>
							</div>
							<div className="view-row">
								<div data-column="label">{"Label"}</div>
								<div data-column="value">{project.name}</div>
							</div>
							<div className="view-row">
								<div data-column="label">{"Color"}</div>
								<div data-column="value" style={{color : '#'+project.color}}>{project.color}</div>
							</div>
							<div className="view-row">
								<div data-column="label">{"Repository Provider"}</div>
								<div data-column="value">{project.provider}</div>
							</div>
							<div className="view-row">
								<div data-column="label">{"Repository"}</div>
								<div data-column="value">{project.repo}</div>
							</div>
							<div className="view-row">
								<div data-column="label">{"Status"}</div>
								<div data-column="value">{project.status}</div>
							</div>
							<div className="view-row">
								<div data-column="label">{"Visible"}</div>
								<div data-column="value">
									<VisibleMarker visible={project.visible} title={project.visible ? L('Visible') : L('Not visible')} />
								</div>
							</div>
							<div className="view-row">
								<div data-column="label">{"Creation time"}</div>
								<div data-column="value">
									<DateViewer time={project.timestampCreated} />
								</div>
							</div>
							<div className="view-row">
								<div data-column="label">{"Modification time"}</div>
								<div data-column="value">
									<DateViewer time={project.timestampModified}/>
								</div>
							</div>
						</div>
					</Block>
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