
const React = require("react");

const AppPage = require("../app-page.jsx");
const SmallButton = require("../ui/small-button.jsx");

const actionsService = require('../../services/actions.js');
const dataService = require('../../services/data-container.js');
const utilsService = require('../../services/utils.js');
const storageService = require('../../services/storage.js');

class ProjectImport extends React.Component {

	import (repo) {
		let id = utilsService.getNextProjectId();
		let project = {
			id : id,
			name : utilsService.renameProject(repo),
			repo : repo,
			visible : true,
			color : utilsService.generateRandomColor(),
		};
		dataService.setProject(id, project);
		actionsService.saveData();
		browserService.render();
	}


	refresh () {
		const self = this;
		actionsService.importProjects(function (importProjects) {
			storageService.save({importProjects});
			dataService.setImportProjects(importProjects);
			dataService.setImportProjectsIsLoaded(true);
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
		for (let i=0; i<importProjects.length; i++) {
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
									{elt.imported ? null : <SmallButton fa="download" onClick={self.import.bind(self, elt.repo)} />}
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