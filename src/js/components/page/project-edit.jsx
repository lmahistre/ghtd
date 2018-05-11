const React = require("react");

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const ProjectEditForm = require("../forms/project-edit-form.jsx");

const actionsService = require('../../services/actions.js');
const browserService = require('../../services/browser.js');
const dataContainerService = require('../../services/data-container.js');
const utilsService = require('../../services/utils.js');

class ProjectEdit extends React.Component {

	create() {
		const id = utilsService.getNextProjectId();
		let project = {
			id : id,
			name : document.forms['project-edit'].name.value,
			visible : document.forms['project-edit'].visible.checked,
			color : document.forms['project-edit'].color.value,
			repo : document.forms['project-edit'].repo.value,
		};
		if (project.name.length > 0) {
			dataContainerService.setProject(id, project);
			actionsService.saveData();
			window.location.href = '#/projects';
		}
	}


	update() {
		let project = {
			id : document.forms['project-edit'].id.value,
			name : document.forms['project-edit'].name.value,
			visible : document.forms['project-edit'].visible.checked,
			color : document.forms['project-edit'].color.value,
			repo : document.forms['project-edit'].repo.value,
		};
		dataContainerService.setProject(id, project);
		actionsService.saveData();
		browserService.redirect('projects');
	}


	render() {
		const self = this;
		let save = self.create;
		let project = dataContainerService.getProject(self.props.match.params.id);
		// In case of edition
		if (project) {
			if (project.visible === undefined) {
				project.visible = true;
			}
			save = self.update;
		}
		// Case of creation
		else {
			project = {
				id : 0,
				name : '',
				visible : true,
				repo : '',
				color : utilsService.generateRandomColor(),
			}
		}
		return (
			<AppPage selectedMenu="projects">
				<CommonButton onClick={save}>{"Save"}</CommonButton>
				<CommonButton to="/projects">{"Cancel"}</CommonButton>
				<CommonButton to={"/project-delete/"+project.id}>{"Delete"}</CommonButton>
				<ProjectEditForm project={project} save={save} />
			</AppPage>
		);
	}
}

module.exports = ProjectEdit;