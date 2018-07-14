
const React = require("react");

const AppPage = require("../app-page.jsx");
const SmallButton = require("../ui/small-button.jsx");

const actionsService = require('../../services/actions.js');
const dataService = require('../../services/data.js');
const utilsService = require('../../services/utils.js');
const storageService = require('../../services/storage.js');
const browserService = require('../../services/browser.js');
// const L = require('../../services/i18n.js');

class ProjectImport extends React.Component {

	import (name) {
		let id = utilsService.getNextProjectId();
		let project = {
			id : id,
			name : utilsService.renameProject(name),
			repo : name,
			visible : true,
			color : utilsService.generateRandomColor(),
			provider : 'github',
		};
		dataService.setProject(id, project);
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
									{elt.imported ? null : <SmallButton fa="download" onClick={self.import.bind(self, elt.name)} />}
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