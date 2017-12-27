const React = require("react");
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("./app-page.jsx");

class ProjectList extends React.Component {

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
				<Link to="/project-edit">New project</Link>
				<table className="list-table">
					<tbody>
						{projectList.map(elt => (
							<tr key={elt.id}>
								<td>
									<Link to={"/project-edit/"+elt.id} className="small-button">
										<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
									</Link>
								</td>
								<td>{elt.id}</td>
								<td>{elt.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</AppPage>
		);
	}
}
module.exports = ProjectList;