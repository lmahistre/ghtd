
const React = require("react");
const ReactRedux = require('react-redux');
const crypto = require('crypto');

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const Upload = require("../ui/upload.jsx");

const constsService = require('../../services/consts.js');
const browserService = require('../../services/browser.js');
const L = require('../../services/i18n.js');
const reduxActions = require('../../services/redux-actions.js');
const store = require('../../services/store.js');

class SettingsView extends React.Component {

	import(error, content) {
		if (error) {
			store.dispatch(reduxActions.addAlert('error', L(error.message)));
		}
		else {
			try {
				const newSettings = this.settingsDecode(content);
				if ('string' === typeof newSettings.user
					&& 'string' === typeof newSettings.gistId
					&& 'string' === typeof newSettings.token
				) {
					store.dispatch(reduxActions.importSettings(newSettings));
				}
				else {
					store.dispatch(reduxActions.addAlert('error', L("The file is invalid")));
				}
			}
			catch (error) {
				store.dispatch(reduxActions.addAlert('error', error.message));
			}
		}
	}


	settingsDecode(str) {
    const ciph = crypto.createDecipher('aes-128-cfb', constsService.settingsKey);
    const p = ciph.update(str, 'base64', 'utf8') + ciph.final('utf8').toString('utf8');
		const obj = JSON.parse(p);
		const ret = {};
		if (obj.user) {
			ret.user = obj.user;
		}
		if (obj.gistId) {
			ret.gistId = obj.gistId;
		}
		if (obj.token) {
			ret.token = obj.token;
		}
		if (obj.fileName) {
			ret.fileName = obj.fileName;
		}
		return ret;
	}


	settingsEncode(settings) {
		var ciph = crypto.createCipher('aes-128-cfb', constsService.settingsKey);
		var p = ciph.update(JSON.stringify({
				user : settings.user,
				gistId : settings.gistId,
				token : settings.token,
				fileName : settings.fileName,
			}), 'utf8', 'base64') + ciph.final('base64').toString('utf8');
		return p;
	}


	render() {
		const settings = this.props.settings;
		const toExports = (settings.user && settings.gistId && settings.token) ? this.settingsEncode(settings) : false;

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
					<CommonButton href={"data:application/octet-stream,"+toExports} download={constsService.settingsFileName} title={L("Export settings")}>{L("Export")}</CommonButton>
				:
					<Upload onSelect={this.import.bind(this)} title={L("Import settings")}>{L("Import")}</Upload>
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
						<tr>
							<td data-column="label">{L("File name")}</td>
							<td data-column="value">{settings.fileName}</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		tasks : state && state.tasks ? state.tasks : {},
		projects : state && state.projects ? state.projects : {},
		settings : state && state.settings ? state.settings : {},
	}
}

module.exports = ReactRedux.connect(mapStateToProps)(SettingsView);
