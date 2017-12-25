const React = require("react");

const AppPage = require("./app-page.jsx");

module.exports = React.createClass({
	displayName : "ProjectList",

	render() {
		const projectList = [];
		return (
			<AppPage>
				<table className="list-table">
					<tbody>
						{projectList.map(elt => (
							<tr key={elt.id}>
								<td></td>
								<td>{elt.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</AppPage>
		);
	}
});