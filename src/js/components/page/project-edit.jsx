const React = require("react");
const ReactRedux = require('react-redux');

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const ProjectEditForm = require("../forms/project-edit.jsx");

const browserService = require('../../services/browser.js');
const utilsService = require('../../services/utils.js');
const reduxActions = require('../../services/redux-actions.js');
const store = require('../../services/store.js');

const L = require('../../services/i18n.js');

class ProjectEdit extends React.Component {

	create() {
		const project = {
			name : document.forms['project-edit'].name.value,
			visible : document.forms['project-edit'].visible.checked,
			color : document.forms['project-edit'].color.value,
			provider : document.forms['project-edit'].provider.value,
			repo : document.forms['project-edit'].repo.value,
			status : 'active',
		};
		if (project.name.length > 0) {
			store.dispatch(reduxActions.addProject(project));
			browserService.redirect('projects');
		}
	}


	update(project) {
		if (project.name != document.forms['project-edit'].name.value
			|| project.visible != document.forms['project-edit'].visible.checked
			|| project.color != document.forms['project-edit'].color.value
			|| project.provider != document.forms['project-edit'].provider.value
			|| project.repo != document.forms['project-edit'].repo.value
		) {
			project.name = document.forms['project-edit'].name.value;
			project.visible = document.forms['project-edit'].visible.checked;
			project.color = document.forms['project-edit'].color.value;
			project.provider = document.forms['project-edit'].provider.value;
			project.repo = document.forms['project-edit'].repo.value;
			if (!project.status) {
				project.status = 'active';
			}
			project.timestampModified = parseInt(Date.now()/1000);
			store.dispatch(reduxActions.updateProject(project));
		}
		browserService.redirect('projects');
	}


	render() {
		const self = this;
		let save = self.create;
		let project = self.props.projects[self.props.match.params.id];
		// In case of edition
		if (project) {
			if (project.visible === undefined) {
				project.visible = true;
			}
			save = self.update.bind(self, project);
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
				<ProjectEditForm project={project} save={save} />
			</AppPage>
		);
	}
}

module.exports = store.connect(ProjectEdit);