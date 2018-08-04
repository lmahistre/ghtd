const React = require("react");
const ReactRedux = require('react-redux');
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const SmallButton = require("../ui/small-button.jsx");

const actionsService = require('../../services/actions.js');
const browserService = require('../../services/browser.js');
const dataService = require('../../services/data.js');
const L = require('../../services/i18n.js');
const reduxActions = require('../../services/redux-actions.js');
const store = require('../../services/store.js');

class ProjectList extends React.Component {

	changeVisibility (id) {
		store.dispatch(reduxActions.changeProjectVisibility(id));
	}


	import () {
		actionsService.importProjects(function (importProjects) {
			dataService.setImportProjects(importProjects);
			browserService.redirect('project-import');
		});
	}


	render () {
		const self = this;
		const projectList = [];
		const projects = self.props.projects;
		if (projects) {
			for (let i in projects) {
				projectList.push(projects[i]);
			}
		}
		return (
			<AppPage selectedMenu="projects">
				<CommonButton to="/project-edit">{L("New project")}</CommonButton>
				<CommonButton onClick={self.import}>{L("Import from GitHub")}</CommonButton>
				<table className="list-table" data-table="project-list">
					<tbody>
						{projectList.map(elt => (
							<tr key={elt.id}>
								<td data-column="actions">
									<SmallButton to={"/project-edit/"+elt.id} title={L("Edit")} fa="edit" color="blue" />
									<SmallButton to={"/project-view/"+elt.id} title={L("View detail")} fa="eye" color="blue" />
									{elt.visible ? 
										<SmallButton fa="eye" onClick={self.changeVisibility.bind(self, elt.id)} title={L("Hide")} color="green" />
									:
										<SmallButton fa="eye-slash" onClick={self.changeVisibility.bind(self, elt.id)} title={L("Show")} color="red" />
									}
								</td>
								<td data-column="name">{elt.name}</td>
								<td data-column="indicators">
									<SmallButton fa={elt.provider} title={elt.repo} style={{backgroundColor : '#'+elt.color}} />
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

module.exports = ReactRedux.connect(mapStateToProps)(ProjectList);