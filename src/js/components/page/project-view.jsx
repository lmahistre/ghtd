const React = require("react");

const AppPage = require("../app-page.jsx");

class ProjectView extends React.Component {
	render () {
		return (
			<AppPage selectedMenu="projects">
				<table className="list-table">
					<tbody>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = ProjectView;