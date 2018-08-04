
const React = require("react");
const ReactRedux = require('react-redux');

const AppPage = require("../app-page.jsx");
const SmallButton = require("../ui/small-button.jsx");

const actionsService = require('../../services/actions.js');
const dataService = require('../../services/data.js');
const utilsService = require('../../services/utils.js');
const browserService = require('../../services/browser.js');
const reduxActions = require('../../services/redux-actions.js');
const store = require('../../services/store.js');

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
		store.dispatch(reduxActions.addProject(project));
		// dataService.setProject(id, project);
		// browserService.render();
	}


	refresh () {
		const self = this;
		actionsService.importProjects(function (importProjects) {
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

function mapStateToProps(state, ownProps) {
	return {
		tasks : state && state.tasks ? state.tasks : {},
		projects : state && state.projects ? state.projects : {},
		settings : state && state.settings ? state.settings : {},
	}
}

module.exports = ReactRedux.connect(mapStateToProps)(ProjectImport);