
const React = require("react");
const ReactRedux = require('react-redux');

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const Upload = require("../ui/upload.jsx");

// const dataService = require('../../services/data.js');
const constsService = require('../../services/consts.js');
// const alertService = require('../../services/alert.js');
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
				let newSettings = JSON.parse(content);
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


	render() {
		const settings = this.props.settings;
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
					<CommonButton href={"data:application/octet-stream,"+toExports} download={constsService.settingsFileName} title={L("Export settings")}>{L("Export")}</CommonButton>
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

function mapStateToProps(state, ownProps) {
	return {
		tasks : state && state.tasks ? state.tasks : {},
		projects : state && state.projects ? state.projects : {},
		settings : state && state.settings ? state.settings : {},
	}
}

module.exports = ReactRedux.connect(mapStateToProps)(SettingsView);
