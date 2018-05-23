
const React = require("react");

const AppPage = require("../app-page.jsx");
const SmallButton = require("../ui/small-button.jsx");
const CommonButton = require("../ui/common-button.jsx");

const actionsService = require('../../services/actions.js');
const browserService = require('../../services/browser.js');
const dataContainerService = require('../../services/data-container.js');
const storageService = require('../../services/storage.js');

class Settings extends React.Component {

	toggleTheme() {
		const settings = storageService.getSettings();
		const theme = settings.theme === 'dark' ? 'dark' : 'light';
		settings.theme = theme === 'dark' ? 'light' : 'dark';
		storageService.save({settings});
		browserService.render();
	}


	save() {
		const settings = storageService.getSettings();
		settings.user = document.getElementById('settings-user').value;
		settings.token = document.getElementById('settings-token').value;
		settings.gistId = document.getElementById('settings-gistId').value;
		storageService.save({settings});
		browserService.render();
	}


	render() {
		const settings = storageService.getSettings();
		return (
			<AppPage selectedMenu="settings">
				<CommonButton onClick={self.save}>{"Save"}</CommonButton>
				<table className="list-table" data-table="settings-list">
					<tbody>
						<tr>
							<td>{"Toggle theme"}</td>
							<td>
								<SmallButton title={"Toggle theme"} fa="adjust" onClick={this.toggleTheme} />
							</td>
						</tr>
						<tr>
							<td>{"User"}</td>
							<td>
								<input name="user" id="settings-user" defaultValue={settings.user} />
							</td>
						</tr>
						<tr>
							<td>{"Token"}</td>
							<td>
								<input name="token" id="settings-token" defaultValue={settings.token} />
							</td>
						</tr>
						<tr>
							<td>{"Gist ID"}</td>
							<td>
								<input name="gistId" id="settings-gistId" defaultValue={settings.gistId} />
							</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = Settings;
