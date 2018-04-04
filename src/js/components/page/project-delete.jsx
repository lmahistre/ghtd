const React = require("react");

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");

const actionsService = require('../../services/actions.js');

class ProjectDelete extends React.Component {

	delete() {
		delete app.state.data.projects[this.props.match.params.id];
		actionsService.saveData();
		window.location.href = '#/projects';
	}


	render() {
		const self = this;
		// In case of edition
		if (self.props.match 
				&& self.props.match.params 
				&& self.props.match.params.id
				&& app.state.data.projects[self.props.match.params.id]
		) {
			const project = app.state.data.projects[self.props.match.params.id];

			// Check if there are tasks using this project
			let projectIsUsed = false;
			for (let taskId in app.state.data.tasks) {
				if (app.state.data.tasks[taskId].projectId == project.id) {
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
			app.error("This project does not exist.");
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