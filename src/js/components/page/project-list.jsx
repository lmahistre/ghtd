const React = require("react");
const ReactRedux = require('react-redux');
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const SmallButton = require("../ui/small-button.jsx");
const Row = require("../ui/row.jsx");

const browserService = require('../../services/browser.js');
const L = require('../../services/i18n.js');
const reduxActions = require('../../services/redux-actions.js');
const store = require('../../services/store.js');
const githubSync = require('../../services/github-sync.js');

class ProjectList extends React.Component {

	changeVisibility (id) {
		store.dispatch(reduxActions.changeProjectVisibility(id));
	}


	import () {
		store.dispatch(reduxActions.setBusy());
		githubSync.importProjects(function (importProjects) {
			store.dispatch(reduxActions.setImportProjects(importProjects));
			browserService.redirect('project-import');
		});
	}


	render () {
		const self = this;
		const projectList = [];
		const projects = self.props.projects;
		if (projects) {
			for (let i in projects) {
				if (projects[i].status === 'active') {
					projectList.push(projects[i]);
				}
			}
		}

		const settings = this.props.settings;
		const isConnected = settings.user && settings.gistId && settings.token;

		return (
			<AppPage selectedMenu="projects">
				<CommonButton to="/project-edit">{L("New project")}</CommonButton>
				{ isConnected ?
					<CommonButton onClick={self.import}>{L("Import from GitHub")}</CommonButton>
				: null }
				<div className="table list-table" data-table="project-list">
					{projectList.map(elt => (
						<Row key={elt.id}>
							<div className="td" data-column="actions">
								<SmallButton to={"/project-edit/"+elt.id} title={L("Edit")} fa="edit" color="blue" />
								<SmallButton to={"/project-view/"+elt.id} title={L("View detail")} fa="eye" color="blue" />
								{elt.visible ? 
									<SmallButton fa="eye" onClick={self.changeVisibility.bind(self, elt.id)} title={L("Hide")} color="green" />
								:
									<SmallButton fa="eye-slash" onClick={self.changeVisibility.bind(self, elt.id)} title={L("Show")} color="red" />
								}
							</div>
							<div className="td" data-column="name">
								<div className="label">{elt.name}</div>
							</div>
							<div className="td" data-column="indicators">
								<SmallButton fa={elt.provider} title={elt.repo} style={{backgroundColor : '#'+elt.color}} />
							</div>
						</Row>
					))}
				</div>
			</AppPage>
		);
	}
}

module.exports = store.connect(ProjectList);