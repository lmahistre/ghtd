
const React = require("react");

const AppPage = require("../app-page.jsx");
const SmallButton = require("../ui/small-button.jsx");

const actionsService = require('../../services/actions.js');
const dataService = require('../../services/data-container.js');

class ProjectImport extends React.Component {

	// import() {
	// 	app.services.importProjects(function (projects) {
	// 		// To check if project already exists
	// 		let alreadyExistingProjects = [];
	// 		for (var i in app.state.data.projects) {
	// 			alreadyExistingProjects.push(app.state.data.projects[i].repo);
	// 		}
	// 		console.log(alreadyExistingProjects);
	// 		let modified = false;
	// 		for (let i = 0; i < projects.length; i++) {
	// 			if (alreadyExistingProjects.indexOf(projects[i].name) == -1) {
	// 				let id = app.utils.getNextProjectId();
	// 				let project = {
	// 					id : id,
	// 					name : app.utils.renameProject(projects[i].name),
	// 					repo : projects[i].name,
	// 					visible : true,
	// 					color : app.utils.generateRandomColor(),
	// 				};
	// 				app.state.data.projects[id] = project;
	// 				modified = true;
	// 			}
	// 		}
	// 		if (modified) {
	// 			app.services.saveData();
	// 			app.render();
	// 		}
	// 	});
	// }


	refresh () {
		const self = this;
		actionsService.importProjects(function (importProjects) {
			dataService.setImportProjects(importProjects);
			dataService.setImportProjectsIsLoaded(true);
			actionsService.getData(function (data) {

			})
			for (let i=0; i<importProjects.length; i++) {

			}
		});
	}


	render () {
		const self = this;
		const importProjects = dataService.getImportProjects();
		if (!dataService.getImportProjectsIsLoaded()) {
			if (!dataService.getDataIsLoaded()) {
				actionsService.getData(function() {
					self.refresh();
				})
			}
			else {
				self.refresh();
			}
		}

		const projects = dataService.getProjects();
		const alreadyExistingProjects = [];
		for (var i in projects) {
			alreadyExistingProjects.push(projects[i].repo);
		}
		for (let i=0; i<importProjects; i++) {
			importProjects[i].imported = alreadyExistingProjects.indexOf(importProjects[i].name) > -1;
		}

		return (
			<AppPage selectedMenu="projects">
				<table className="list-table">
					<tbody>
						{importProjects.map(elt => (
							<tr key={elt.name}>
								<td>{elt.name}</td>
								<td>
									{elt.imported ? null : <SmallButton glyphicon="picture" />}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = ProjectImport;