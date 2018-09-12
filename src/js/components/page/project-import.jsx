
const React = require("react");
const ReactRedux = require('react-redux');

const AppPage = require("../app-page.jsx");
const SmallButton = require("../ui/small-button.jsx");

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
	}


	render () {
		const self = this;
		const importProjects = self.props.importProjects;
		const projects = self.props.projects;
		const alreadyExistingProjects = [];
		for (var i in projects) {
			alreadyExistingProjects.push(projects[i].repo);
		}
		for (let i=0; i<importProjects.length; i++) {
			importProjects[i].imported = alreadyExistingProjects.indexOf(importProjects[i].name) > -1;
		}

		return (
			<AppPage selectedMenu="projects">
				<div className="list-table">
					{importProjects.map(elt => (
						<div key={elt.name}>
							<div>{elt.name}</div>
							<div>
								{elt.imported ? null : <SmallButton fa="download" onClick={self.import.bind(self, elt.name)} />}
							</div>
						</div>
					))}
				</div>
			</AppPage>
		);
	}
}

module.exports = store.connect(ProjectImport);