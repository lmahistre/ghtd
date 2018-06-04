const React = require("react");
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const VisibleMarker = require("../visible-marker.jsx");
const SmallButton = require("../ui/small-button.jsx");

const actionService = require('../../services/actions.js');
const browserService = require('../../services/browser.js');
const dataService = require('../../services/data.js');

class ProjectList extends React.Component {

	changeVisibility (id) {
		const projects = dataService.getProjects();
		if (projects[id]) {
			let project = new Object(projects[id]);
			project.visible = !projects[id].visible;
			dataService.setProject(id, project);
			actionService.saveData();
			browserService.render();
		}
	}


	render () {
		const self = this;
		const projectList = [];
		const projects = dataService.getProjects();
		if (projects) {
			for (let i in projects) {
				projectList.push(projects[i]);
			}
		}
		return (
			<AppPage selectedMenu="projects">
				<CommonButton to="/project-edit">{"New project"}</CommonButton>
				<CommonButton to="/project-import">{"Import from GitHub"}</CommonButton>
				<table className="list-table" data-table="project-list">
					<tbody>
						{projectList.map(elt => (
							<tr key={elt.id}>
								<td data-column="actions">
									<Link to={"/project-edit/"+elt.id} className="small-button">
										<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
									</Link>
									<Link to={"/project-view/"+elt.id} className="small-button">
										<span className="glyphicon glyphicon-eye" aria-hidden="true"></span>
									</Link>
									{elt.visible ? 
										<SmallButton fa="eye" onClick={self.changeVisibility.bind(self, elt.id)} title={"Hide"} />
									:
										<SmallButton fa="eye-slash" onClick={self.changeVisibility.bind(self, elt.id)} title={"Show"} />
									}
								</td>
								<td data-column="name">{elt.name}</td>
								<td data-column="indicators">
									<SmallButton fa={elt.repo ? "github" : "square-o"} title={elt.repo} style={{backgroundColor : '#'+elt.color}} />
									<VisibleMarker visible={elt.visible} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</AppPage>
		);
	}
}
module.exports = ProjectList;