
const React = require("react");

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const Upload = require("../ui/upload.jsx");

const dataService = require('../../services/data.js');
const constsService = require('../../services/consts.js');
const alertService = require('../../services/alert.js');
const browserService = require('../../services/browser.js');
const L = require('../../services/i18n.js');

class SettingsView extends React.Component {

	import(error, content) {
		if (error) {
			alertService.error(L(error.message));
		}
		else {
			try {
				let newSettings = JSON.parse(content);
				if ('string' === typeof newSettings.user
					&& 'string' === typeof newSettings.gistId
					&& 'string' === typeof newSettings.token
				) {
					const settings = dataService.getSettings();
					settings.user = newSettings.user;
					settings.gistId = newSettings.gistId;
					settings.token = newSettings.token;
					dataService.setSettings(settings);
				}
				else {
					alertService.error(L("The file is invalid"));
				}
			}
			catch (error) {
				alertService.error(error.message);
			}
		}
		browserService.render();
	}


	render() {
		const settings = dataService.getSettings() ? dataService.getSettings() : {};
		const toExports = (settings.user && settings.gistId && settings.token) ? JSON.stringify({
			user : settings.user,
			gistId : settings.gistId,
			token : settings.token,
		}) : false;

		let languageLabel = '';
		for (var i = 0; i < constsService.languages.length; i++) {
			if (constsService.languages[i].key === settings.language) {
				languageLabel = constsService.languages[i].label;
			}
		}
		let themeLabel = '';
		if (settings.theme && constsService.themes[settings.theme]) {
			themeLabel = constsService.themes[settings.theme];
		}
		return (
			<AppPage selectedMenu="settings">
				<CommonButton to="settings-edit">{L("Edit")}</CommonButton>
				<CommonButton to="settings-about">{L("About")}</CommonButton>
				{toExports ?
					<CommonButton href={"data:application/octet-stream,"+toExports} download="ght-settings.json" title={L("Export settings")}>{L("Export")}</CommonButton>
				:
					<Upload onSelect={this.import} title={L("Import settings")}>{L("Import")}</Upload>
				}
				<table className="list-table" data-table="settings-list">
					<tbody>
						<tr>
							<td data-column="label">{L("Theme")}</td>
							<td data-column="value">{L(themeLabel)}</td>
						</tr>
						<tr>
							<td data-column="label">{L("Language")}</td>
							<td data-column="value">{L(languageLabel)}</td>
						</tr>
						<tr>
							<td data-column="label">{L("User")}</td>
							<td data-column="value">{settings.user}</td>
						</tr>
						<tr>
							<td data-column="label">{L("Gist ID")}</td>
							<td data-column="value">{settings.gistId}</td>
						</tr>
						<tr>
							<td data-column="label">{L("Token")}</td>
							<td data-column="value">{settings.token}</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = SettingsView;
