const React = require("react");

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");

const alertService = require('../../services/alert.js');
const browserService = require('../../services/browser.js');
const dataService = require('../../services/data.js');

class ProjectDelete extends React.Component {

	delete() {
		dataService.deleteProject(this.props.match.params.id);
		browserService.redirect('projects');
	}


	render() {
		const self = this;
		const projects = dataService.getProjects();
		const tasks = dataService.getTasks();
		// In case of edition
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
						<div>
							<p>{"The project "+project.name+" cannot be deleted because there are still tasks attached to it."}</p>
						</div>
						<CommonButton to="/projects">{"Cancel"}</CommonButton>
					</AppPage>
				);
			}
			else {
				return (
					<AppPage selectedMenu="projects">
						<div>
							<p>{"Are you sure you want to delete the project "+project.name+"?"}</p>
						</div>
						<CommonButton onClick={self.delete.bind(self)}>{"Delete"}</CommonButton>
						<CommonButton to="/projects">{"Cancel"}</CommonButton>
					</AppPage>
				);
			}
		}
		// If the project does not exist
		else {
			alertService.error("This project does not exist.");
			window.location.href = '#/projects';
			return (
				<AppPage selectedMenu="projects">
					<div>
						<p>{"This project does not exist."}</p>
					</div>
					<CommonButton to="/projects">{"Cancel"}</CommonButton>
				</AppPage>
			);
		}
	}
}

module.exports = ProjectDelete;