const React = require("react");

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const ProjectEditForm = require("../project-edit-form.jsx");

class ProjectEdit extends React.Component {

	create() {
		let id = 0;
		// Determine new id
		if (app.state.data.projects) {
			for (let i in app.state.data.projects) {
				if (app.state.data.projects[i].id && app.state.data.projects[i].id > id) {
					id = app.state.data.projects[i].id;
				}
			}
		}
		id++;

		let project = {
			id : id,
			name : document.forms['project-edit'].name.value,
			visible : document.forms['project-edit'].visible.checked,
			color : document.forms['project-edit'].color.value,
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
		};
		let save = self.create;
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
		return (
			<AppPage>
				<CommonButton onClick={save}>Save</CommonButton>
				<CommonButton to="/projects">Cancel</CommonButton>
				<ProjectEditForm project={project} save={save} />
			</AppPage>
		);
	}
}

module.exports = ProjectEdit;