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
			// selection of a randon color
			const colors = {};
			for (let i = 0; i < app.consts.colors.length; i++) {
				colors[app.consts.colors[i].color] = 0;
			}
			for (let i in app.state.data.projects) {
				console.log(colors[app.state.data.projects[i].color]);
				if (colors[app.state.data.projects[i].color] !== undefined) {
					colors[app.state.data.projects[i].color]++;
				}
			}
			// search for minimum
			let minColor;
			for (let color in colors) {
				if (typeof minColor === 'undefined') {
					minColor = colors[color];
				}
				else {
					minColor = Math.min(minColor, colors[color]);
				}
			}
			const selectableColors = [];
			for (let color in colors) {
				if (colors[color] == minColor) {
					selectableColors.push(color);
				}
			}

			const randomIndex = parseInt(Math.random() * selectableColors.length);
			project.color = selectableColors[randomIndex];
			console.log(selectableColors);
			console.log(project.color);
		}
		return (
			<AppPage>
				<CommonButton onClick={save}>{"Save"}</CommonButton>
				<CommonButton to="/projects">{"Cancel"}</CommonButton>
				<ProjectEditForm project={project} save={save} />
			</AppPage>
		);
	}
}

module.exports = ProjectEdit;