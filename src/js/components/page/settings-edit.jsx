
const React = require("react");
const ReactRedux = require('react-redux');

const AppPage = require("../app-page.jsx");
const SmallButton = require("../ui/small-button.jsx");
const CommonButton = require("../ui/common-button.jsx");
const RadioSelector = require("../ui/radio-selector.jsx");
const Block = require("../ui/block.jsx");

const browserService = require('../../services/browser.js');
const constsService = require('../../services/consts.js');
const L = require('../../services/i18n.js');
const store = require('../../services/store.js');
const reduxActions = require('../../services/redux-actions.js');

class SettingsEdit extends React.Component {

	save() {
		const settings = {};
		settings.theme = document.getElementById('settings-theme').value;
		settings.language = document.getElementById('language').value;
		settings.user = document.getElementById('settings-user').value;
		settings.token = document.getElementById('settings-token').value;
		settings.gistId = document.getElementById('settings-gistId').value;
		settings.fileName = document.getElementById('settings-fileName').value;
		store.dispatch(reduxActions.updateSettings(settings));
		browserService.redirect('settings');
	}


	handleInputKeyDown(event) {
		if (event.which == 13) {
			this.save();
		}
	}


	render() {
		const settings = this.props.settings;
		return (
			<AppPage selectedMenu="settings">
				<CommonButton onClick={this.save}>{L("Save")}</CommonButton>
				<CommonButton to="/settings">{L("Cancel")}</CommonButton>
				<Block>
					<div className="form-table" data-table="settings-list">
						<div className="view-row">
							<div data-column="label">{L("Theme")}</div>
							<div data-column="value">
								<RadioSelector id="settings-theme" value={settings.theme}>
									<option value="light">{L("Light")}</option>
									<option value="dark">{L("Dark")}</option>
								</RadioSelector>
							</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("Language")}</div>
							<div data-column="value">
								<RadioSelector id="language" name="language" value={settings.language}>
									{constsService.languages.map(elt => (
										<option key={elt.key} value={elt.key}>{L(elt.label)}</option>
									))}
								</RadioSelector>
							</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("User")}</div>
							<div data-column="value">
								<input name="user" id="settings-user" type="text" defaultValue={settings.user} onKeyDown={this.handleInputKeyDown.bind(this)} />
							</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("Gist ID")}</div>
							<div data-column="value">
								<input name="gistId" id="settings-gistId" type="text" defaultValue={settings.gistId} onKeyDown={this.handleInputKeyDown.bind(this)} />
							</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("Token")}</div>
							<div data-column="value">
								<input name="token" id="settings-token" type="text" defaultValue={settings.token} onKeyDown={this.handleInputKeyDown.bind(this)} />
							</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("File name")}</div>
							<div data-column="value">
								<input name="token" id="settings-fileName" type="text" defaultValue={settings.fileName} onKeyDown={this.handleInputKeyDown.bind(this)} />
							</div>
						</div>
					</div>
				</Block>
			</AppPage>
		);
	}
}

module.exports = store.connect(SettingsEdit);
