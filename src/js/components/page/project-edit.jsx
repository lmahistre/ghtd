const React = require("react");

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const ProjectEditForm = require("../forms/project-edit-form.jsx");

class ProjectEdit extends React.Component {

	create() {
		const id = app.utils.getNextProjectId();
		let project = {
			id : id,
			name : document.forms['project-edit'].name.value,
			visible : document.forms['project-edit'].visible.checked,
			color : document.forms['project-edit'].color.value,
			repo : document.forms['project-edit'].repo.value,
		};
		if (project.name.length > 0) {
			app.state.data.projects[id] = project;
			app.services.saveData();
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
		if (app.state.data.projects[project.id]) {
			app.state.data.projects[project.id] = project;
			app.services.saveData();
			window.location.href = '#/projects';
		}
		else {
			app.error("Unexisting project");
		}
	}


	render() {
		const self = this;
		let project = {
			id : 0,
			name : '',
			visible : true,
			repo : '',
		};
		let save = self.create;
		// In case of edition
		if (self.props.match 
				&& self.props.match.params 
				&& self.props.match.params.id
				&& app.state.data.projects[self.props.match.params.id]
		) {
			project = app.state.data.projects[self.props.match.params.id];
			if (project.visible === undefined) {
				project.visible = true;
			}
			save = self.update;
		}
		// Case of creation
		else {
			// selection of a random color
			project.color = app.utils.generateRandomColor();
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