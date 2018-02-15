const React = require("react");
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const VisibleMarker = require("../visible-marker.jsx");
const SmallButton = require("../ui/small-button.jsx");

class ProjectList extends React.Component {

	changeVisibility(id) {
		if (app.state.data.projects[id]) {
			app.state.data.projects[id].visible = !app.state.data.projects[id].visible;
			app.services.saveData();
			app.render();
		}
	}


	import() {
		app.services.importProjects(function (projects) {
			// To check if project already exists
			let alreadyExistingProjects = [];
			for (var i in app.state.data.projects) {
				alreadyExistingProjects.push(app.state.data.projects[i].repo);
			}
			console.log(alreadyExistingProjects);
			let modified = false;
			for (let i = 0; i < projects.length; i++) {
				if (alreadyExistingProjects.indexOf(projects[i].name) == -1) {
					let id = app.utils.getNextProjectId();
					let project = {
						id : id,
						name : app.utils.renameProject(projects[i].name),
						repo : projects[i].name,
						visible : true,
						color : app.utils.generateRandomColor(),
					};
					app.state.data.projects[id] = project;
					modified = true;
				}
			}
			if (modified) {
				app.services.saveData();
				app.render();
			}
		});
	}


	render() {
		const self = this;
		const projectList = [];
		if (app.state.data.projects) {
			for (let i in app.state.data.projects) {
				projectList.push(app.state.data.projects[i]);
			}
		}
		return (
			<AppPage selectedMenu="projects">
				<CommonButton to="/project-edit">{"New project"}</CommonButton>
				<CommonButton onClick={self.import}>{"Import from GitHub"}</CommonButton>
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