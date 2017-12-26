const React = require("react");
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const AppPage = require("./app-page.jsx");

module.exports = React.createClass({
	displayName : "ProjectList",

	render() {
		const projectList = [];
		if (app.state.data.projects) {
			for (let i in app.state.data.projects) {
				projectList.push(app.state.data.projects[i]);
			}
		}
		return (
			<AppPage>
				<Link to="/project-edit">New project</Link>
				<table className="list-table">
					<tbody>
						{projectList.map(elt => (
							<tr key={elt.id}>
								<td>{elt.id}</td>
								<td>{elt.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</AppPage>
		);
	}
});