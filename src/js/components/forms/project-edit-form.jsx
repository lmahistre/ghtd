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


	changeVisible(event) {
		this.props.project.visible = event.target.checked;
		this.setState({
			project : this.props.project,
		});
	}


	render() {
		const self = this;
		return (
			<form name="project-edit" onSubmit={self.formFakeSubmit}>
				<input type="hidden" name="id" value={self.props.project.id} />
				<div className="form-table">
						<div className="tr">
							<div className="label">{"Name"}</div>
							<div className="value">
								<input type="text" name="name" defaultValue={self.props.project.name} onKeyDown={self.handleInputKeyDown.bind(self, self.props.save)} />
							</div>
						</div>
						<div className="tr">
							<div className="label">{"Visible"}</div>
							<div className="value">
								<input type="checkbox" name="visible" checked={self.props.project.visible} onChange={self.changeVisible.bind(self)} />
							</div>
						</div>
						<div className="tr">
							<div className="label">{"Color"}</div>
							<div className="value">
								<select name="color" defaultValue={self.props.project.color}>
									<option value=""></option>
									{constsService.colors.map(elt => (
										<option key={elt.id} value={elt.color} style={{color : '#'+elt.color}}>{elt.name}</option>
									))}
								</select>
							</div>
						</div>
						<div className="tr">
							<div className="label">{L("Repository provider")}</div>
							<div>
								<select name="provider" defaultValue={self.props.project.provider}>
									<option value=""></option>
									<option value="github">{L("GitHub")}</option>
									<option value="bitbucket">{L("Bitbucket")}</option>
									<option value="gitlab">{L("GitLab")}</option>
								</select>
							</div>
						</div>
						<div className="tr">
							<div className="label">{L("Repository")}</div>
							<div>
								<input type="text" name="repo" defaultValue={self.props.project.repo} onKeyDown={self.handleInputKeyDown.bind(self, self.props.save)} />
							</div>
						</div>
				</div>
			</form>
		);
	}
}

module.exports = ProjectEditForm;
