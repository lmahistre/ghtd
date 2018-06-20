
const React = require("react");

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");

const storageService = require('../../services/storage.js');
const constsService = require('../../services/consts.js');
const L = require('../../services/i18n.js');

class Settings extends React.Component {

	render() {
		const settings = storageService.getSettings() ? storageService.getSettings() : {};
		let languageLabel = '';
		for (var i = 0; i < constsService.languages.length; i++) {
			if (constsService.languages[i].key === settings.language) {
				languageLabel = constsService.languages[i].label;
			}
		}
		return (
			<AppPage selectedMenu="settings">
				<CommonButton to="settings-edit">{L("Edit")}</CommonButton>
				<table className="list-table" data-table="settings-list">
					<tbody>
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

module.exports = Settings;
