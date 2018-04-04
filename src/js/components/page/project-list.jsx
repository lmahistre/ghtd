const React = require("react");
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const VisibleMarker = require("../visible-marker.jsx");
const SmallButton = require("../ui/small-button.jsx");

const actionService = require('../../services/actions.js');
const browserService = require('../../services/browser.js');
const dataContainerService = require('../../services/data-container.js');

class ProjectList extends React.Component {

	changeVisibility (id) {
		const projects = dataContainerService.getProjects();
		if (projects[id]) {
			let project = new Object(projects[id]);
			project.visible = !projects[id].visible;
			dataContainerService.setProject(id, project);
			actionService.saveData();
			browserService.render();
		}
	}


	render () {
		const self = this;
		const projectList = [];
		const projects = dataContainerService.getProjects();
		if (projects) {
			for (let i in projects) {
				projectList.push(projects[i]);
			}
		}
		return (
			<AppPage selectedMenu="projects">
				<CommonButton to="/project-edit">{"New project"}</CommonButton>
				<CommonButton to="/project-import">{"Import from GitHub"}</CommonButton>
				<table className="list-table">
					<tbody>
						{projectList.map(elt => (
							<tr key={elt.id}>
								<td>
									<Link to={"/project-edit/"+elt.id} className="small-button">
										<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
									</Link>
									{elt.visible ? 
										<SmallButton glyphicon="eye-close" onClick={self.changeVisibility.bind(self, elt.id)} title={"Hide"} />
									:
										<SmallButton glyphicon="eye-open" onClick={self.changeVisibility.bind(self, elt.id)} title={"Show"} />
									}
								</td>
								<td>{elt.name}</td>
								<td>
									<SmallButton glyphicon="picture" style={{backgroundColor : '#'+elt.color}} />
								</td>
								<td>
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