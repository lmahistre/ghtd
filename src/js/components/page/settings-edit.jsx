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
		const form = document.forms['settings-edit'];
		settings.language = form.language.value;
		settings.user = form.user.value;
		settings.token = form.token.value;
		settings.gistId = form.gistId.value;
		settings.fileName = form.fileName.value;
		settings.warnIfDirty = form.warnIfDirty.value === '1';
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
				<CommonButton onClick={this.save.bind(this)}>{L("Save")}</CommonButton>
				<CommonButton to="/settings">{L("Cancel")}</CommonButton>
				<Block>
					<form className="form-table" data-table="settings-list" name="settings-edit">
						<div className="view-row">
							<div data-column="label">{L("Language")}</div>
							<div data-column="value">
								<RadioSelector name="language" value={settings.language} ref={this.languageRef}>
									{constsService.languages.map(elt => (
										<option key={elt.key} value={elt.key}>{L(elt.label)}</option>
									))}
								</RadioSelector>
							</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("User")}</div>
							<div data-column="value">
								<input name="user" type="text" defaultValue={settings.user} onKeyDown={this.handleInputKeyDown.bind(this)} />
							</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("Gist ID")}</div>
							<div data-column="value">
								<input name="gistId" type="text" defaultValue={settings.gistId} onKeyDown={this.handleInputKeyDown.bind(this)} />
							</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("Token")}</div>
							<div data-column="value">
								<input name="token" type="text" defaultValue={settings.token} onKeyDown={this.handleInputKeyDown.bind(this)} />
							</div>
						</div>
						<div className="view-row">
							<div data-column="label">{L("File name")}</div>
							<div data-column="value">
								<input name="fileName" type="text" defaultValue={settings.fileName} onKeyDown={this.handleInputKeyDown.bind(this)} />
							</div>
						</div>
						<div className="view-row">
							<div data-column="label" data-tip={L("Modification warning text")}>{L("Modification warning")}</div>
							<div data-column="value">
								<RadioSelector name="warnIfDirty" value={settings.warnIfDirty ? '1' : '0'}>
									<option value="0">{L("No")}</option>
									<option value="1">{L("Yes")}</option>
								</RadioSelector>
							</div>
						</div>
					</form>
				</Block>
			</AppPage>
		);
	}
}

module.exports = store.connect(SettingsEdit);
