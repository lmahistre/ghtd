
const React = require("react");
const ReactRedux = require('react-redux');

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");
const Upload = require("../ui/upload.jsx");
const Block = require("../ui/block.jsx");

const constsService = require('../../services/consts.js');
const browserService = require('../../services/browser.js');
const L = require('../../services/i18n.js');
const reduxActions = require('../../services/redux-actions.js');
const store = require('../../services/store.js');
const utils = require('../../services/utils.js');

class SettingsView extends React.Component {

	import(error, content) {
		if (error) {
			store.dispatch(reduxActions.addAlert('error', L(error.message)));
		}
		else {
			try {
				const newSettings = utils.settingsDecode(content);
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
		const toExports = (settings.user && settings.gistId && settings.token) ? utils.settingsEncode(settings) : false;

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
				<Block>
					<div className="view-table" data-table="settings-list">
						<div className="view-row">
							<div className="td" data-column="label">{L("Language")}</div>
							<div className="td" data-column="value">{L(languageLabel)}</div>
						</div>
						<div className="view-row">
							<div className="td" data-column="label">{L("User")}</div>
							<div className="td" data-column="value">{settings.user}</div>
						</div>
						<div className="view-row">
							<div className="td" data-column="label">{L("Gist ID")}</div>
							<div className="td" data-column="value">{settings.gistId}</div>
						</div>
						<div className="view-row">
							<div className="td" data-column="label">{L("Token")}</div>
							<div className="td" data-column="value">{settings.token}</div>
						</div>
						<div className="view-row">
							<div className="td" data-column="label">{L("File name")}</div>
							<div className="td" data-column="value">{settings.fileName}</div>
						</div>
					</div>
				</Block>
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
