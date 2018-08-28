const React = require("react");

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");

const constsService = require('../../services/consts.js');
const L = require('../../services/i18n.js');

class ProjectEditForm extends React.Component {

	formFakeSubmit(event) {
		event.stopPropagation();
		event.preventDefault();
	}


	handleInputKeyDown(fnc, event) {
		if (event.which == 13) {
			fnc();
		}
	}


	render() {
		const self = this;
		return (
			<form name="task-edit" onSubmit={self.formFakeSubmit}>
				<input type="hidden" name="id" value={self.props.task.id} />
				<table className="form-table">
					<tbody>
						<tr>
							<td className="label">{"Name"}</td>
							<td className="value">
								<input type="text" name="name" defaultValue={self.props.task.name} onKeyDown={self.handleInputKeyDown.bind(self, self.props.save)} />
							</td>
						</tr>
						<tr>
							<td className="label">{"Project"}</td>
							<td className="value">
								<select className="project-label" name="projectId" id="new-task-projectId" defaultValue={self.props.task.projectId}>
									{self.props.projectList.map(elt => (
										<option key={elt.id} value={elt.id}>{elt.name}</option>
									))}
								</select>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		);
	}
}

module.exports = ProjectEditForm;