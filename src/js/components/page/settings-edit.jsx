
const React = require("react");

const AppPage = require("../app-page.jsx");
const SmallButton = require("../ui/small-button.jsx");
const CommonButton = require("../ui/common-button.jsx");

const browserService = require('../../services/browser.js');
const dataService = require('../../services/data.js');
const storageService = require('../../services/storage.js');
const constsService = require('../../services/consts.js');
const L = require('../../services/i18n.js');

class SettingsEdit extends React.Component {

	toggleTheme() {
		const settings = storageService.getSettings();
		settings.theme = settings && settings.theme === 'dark' ? 'light' : 'dark';
		storageService.save({settings});
		browserService.render();
	}


	save() {
		const settings = storageService.getSettings();
		settings.language = document.getElementById('language').value;
		settings.user = document.getElementById('settings-user').value;
		settings.token = document.getElementById('settings-token').value;
		settings.gistId = document.getElementById('settings-gistId').value;
		storageService.save({settings});
		browserService.redirect('settings');
	}


	render() {
		const settings = storageService.getSettings() ? storageService.getSettings() : {};
		return (
			<AppPage selectedMenu="settings">
				<CommonButton onClick={this.save}>{L("Save")}</CommonButton>
				<CommonButton to="/settings">{L("Cancel")}</CommonButton>
				<table className="list-table" data-table="settings-list">
					<tbody>
						<tr>
							<td data-column="label">{L("Theme")}</td>
							<td>
								<SmallButton title={L("Toggle theme")} fa="adjust" onClick={this.toggleTheme} />
							</td>
						</tr>
						<tr>
							<td data-column="label">{L("Language")}</td>
							<td>
								<select name="language" id="language" defaultValue={settings.language}>
									{constsService.languages.map(elt => (
										<option value={elt.key} key={elt.key}>{L(elt.label)}</option>
									))}
								</select>
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

module.exports = SettingsEdit;
