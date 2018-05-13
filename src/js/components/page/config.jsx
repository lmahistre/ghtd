const React = require("react");

const AppPage = require("../app-page.jsx");

class Config extends React.Component {
	render () {
		return (
			<AppPage selectedMenu="projects">
				<table className="list-table" data-table="config">
					<tbody>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = Config;