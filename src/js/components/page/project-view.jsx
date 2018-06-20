const React = require("react");

const AppPage = require("../app-page.jsx");
const VisibleMarker = require("../visible-marker.jsx");
const CommonButton = require("../ui/common-button.jsx");
const DateViewer = require('../ui/date-viewer.jsx');

const dataService = require('../../services/data.js');
const L = require('../../services/i18n.js');

class ProjectView extends React.Component {

	render () {
		const self = this;
		let project = dataService.getProject(self.props.match.params.id);
		return (
			<AppPage selectedMenu="projects">
				<CommonButton to={"/project-edit/"+self.props.match.params.id}>{"Edit"}</CommonButton>
				<table className="list-table">
					<tbody>
						<tr>
							<td>{"Id"}</td>
							<td>{project.id}</td>
						</tr>
						<tr>
							<td>{"Label"}</td>
							<td>{project.name}</td>
						</tr>
						<tr>
							<td>{"Color"}</td>
							<td style={{color : '#'+project.color}}>{project.color}</td>
						</tr>
						<tr>
							<td>{"Repository Provider"}</td>
							<td>{project.provider}</td>
						</tr>
						<tr>
							<td>{"Repository"}</td>
							<td>{project.repo}</td>
						</tr>
						<tr>
							<td>{"Visible"}</td>
							<td>
								<VisibleMarker visible={project.visible} title={project.visible ? 'Visible' : 'Not visible'} />
							</td>
						</tr>
						<tr>
							<td>{"Creation time"}</td>
							<td>
								<DateViewer time={project.timestampCreated} />
							</td>
						</tr>
						<tr>
							<td>{"Modification time"}</td>
							<td>
								<DateViewer time={project.timestampModified}/>
							</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = ProjectView;