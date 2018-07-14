
const React = require("react");

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");

const storageService = require('../../services/storage.js');
const constsService = require('../../services/consts.js');
const L = require('../../services/i18n.js');

class SettingsView extends React.Component {

	render() {
		const settings = storageService.getSettings() ? storageService.getSettings() : {};
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