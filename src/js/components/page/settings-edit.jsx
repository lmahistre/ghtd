
const React = require("react");
const ReactRedux = require('react-redux');

const AppPage = require("../app-page.jsx");
const SmallButton = require("../ui/small-button.jsx");
const CommonButton = require("../ui/common-button.jsx");
const RadioSelector = require("../ui/radio-selector.jsx");

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
		store.dispatch(reduxActions.updateSettings(settings));
		browserService.setBackgroundColor(settings.theme);
		browserService.redirect('settings');
	}


	render() {
		const settings = this.props.settings;
		return (
			<AppPage selectedMenu="settings">
				<CommonButton onClick={this.save}>{L("Save")}</CommonButton>
				<CommonButton to="/settings">{L("Cancel")}</CommonButton>
				<table className="list-table" data-table="settings-list">
					<tbody>
						<tr>
							<td data-column="label">{L("Theme")}</td>
							<td>
								<RadioSelector id="settings-theme" value={settings.theme}>
									<option value="light">{L("Light")}</option>
									<option value="dark">{L("Dark")}</option>
								</RadioSelector>
							</td>
						</tr>
						<tr>
							<td data-column="label">{L("Language")}</td>
							<td>
								<RadioSelector id="language" name="language" value={settings.language}>
									{constsService.languages.map(elt => (
										<option key={elt.key} value={elt.key}>{L(elt.label)}</option>
									))}
								</RadioSelector>
							</td>
						</tr>
						<tr>
							<td data-column="label">{L("User")}</td>
							<td>
								<input name="user" id="settings-user" type="text" defaultValue={settings.user} />
							</td>
						</tr>
						<tr>
							<td data-column="label">{L("Gist ID")}</td>
							<td>
								<input name="gistId" id="settings-gistId" type="text" defaultValue={settings.gistId} />
							</td>
						</tr>
						<tr>
							<td data-column="label">{L("Token")}</td>
							<td>
								<input name="token" id="settings-token" type="text" defaultValue={settings.token} />
							</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = store.connect(SettingsEdit);
