const React = require("react");
const ReactRedux = require('react-redux');
const ReactRouterDom = require('react-router-dom');

const Redirect = ReactRouterDom.Redirect;

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");

const browserService = require('../../services/browser.js');
const L = require('../../services/i18n.js');
const reduxActions = require('../../services/redux-actions.js');
const store = require('../../services/store.js');

class ProjectDelete extends React.Component {

	delete() {
		store.dispatch(reduxActions.deleteProject(this.props.match.params.id));
		// browserService.redirect('projects');
	}


	render() {
		const self = this;
		const projects = self.props.projects;
		const tasks = self.props.tasks;
		if (self.props.match 
				&& self.props.match.params 
				&& self.props.match.params.id
				&& projects[self.props.match.params.id]
		) {
			const project = projects[self.props.match.params.id];

			// Check if there are tasks using this project
			let projectIsUsed = false;
			for (let taskId in tasks) {
				if (tasks[taskId].projectId == project.id) {
					projectIsUsed = true;
				}
			}
			if (projectIsUsed) {
				return (
					<AppPage selectedMenu="projects">
						<div className="text-page">
							<p>{L("The project ")+project.name+L(" cannot be deleted because there are still tasks attached to it.")}</p>
						</div>
						<CommonButton to="/projects">{L("Cancel")}</CommonButton>
					</AppPage>
				);
			}
			else {
				return (
					<AppPage selectedMenu="projects">
						<div className="text-page">
							<p>{L("Are you sure you want to delete the project ")+project.name+L("?")}</p>
						</div>
						<CommonButton onClick={self.delete.bind(self)}>{L("Delete")}</CommonButton>
						<CommonButton to="/projects">{L("Cancel")}</CommonButton>
					</AppPage>
				);
			}
		}
		// If the project does not exist
		else {
			// store.dispatch(reduxActions.addAlert('error', L("This project does not exist.")));
			return (
				<Redirect to="/projects" />
			);
		}
	}
}

module.exports = store.connect(ProjectDelete);