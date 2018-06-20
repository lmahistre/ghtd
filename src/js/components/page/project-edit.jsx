const React = require("react");

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const ProjectEditForm = require("../forms/project-edit-form.jsx");

const browserService = require('../../services/browser.js');
const dataService = require('../../services/data.js');
const utilsService = require('../../services/utils.js');

const L = require('../../services/i18n.js');

class ProjectEdit extends React.Component {

	create() {
		const id = utilsService.getNextProjectId();
		let project = {
			id : id,
			name : document.forms['project-edit'].name.value,
			visible : document.forms['project-edit'].visible.checked,
			color : document.forms['project-edit'].color.value,
			provider : document.forms['project-edit'].provider.value,
			repo : document.forms['project-edit'].repo.value,
		};
		if (project.name.length > 0) {
			dataService.setProject(id, project);
			// window.location.href = '#/projects';
			browserService.redirect('projects');
		}
	}


	update() {
		let project = {
			id : document.forms['project-edit'].id.value,
			name : document.forms['project-edit'].name.value,
			visible : document.forms['project-edit'].visible.checked,
			color : document.forms['project-edit'].color.value,
			provider : document.forms['project-edit'].provider.value,
			repo : document.forms['project-edit'].repo.value,
		};
		dataService.setProject(project.id, project);
		browserService.redirect('projects');
	}


	render() {
		const self = this;
		let save = self.create;
		let project = dataService.getProject(self.props.match.params.id);
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
				<CommonButton onClick={save}>{L("Save")}</CommonButton>
				<CommonButton to="/projects">{L("Cancel")}</CommonButton>
				<CommonButton to={"/project-delete/"+project.id}>{L("Delete")}</CommonButton>
				<ProjectEditForm project={project} save={save} />
			</AppPage>
		);
	}
}

module.exports = ProjectEdit;