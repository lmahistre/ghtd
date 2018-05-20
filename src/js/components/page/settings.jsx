
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
		const settings = dataContainerService.getSettings();
		const theme = settings.theme === 'dark' ? 'dark' : 'light';
		settings.theme = theme === 'dark' ? 'light' : 'dark';
		storageService.save({settings});
		browserService.render();
	}


	configure() {
		
	}


	render() {
		return (
			<AppPage selectedMenu="settings">
				<CommonButton onClick={self.configure}>{"Configure"}</CommonButton>
				<table className="list-table" data-table="settings-list">
					<tbody>
						<tr>
							<td data-column="actions">
								<SmallButton title={"Toggle theme"} fa="adjust" onClick={this.toggleTheme} />
							</td>
							<td>{"Toggle theme"}</td>
						</tr>
						<tr>
							<td data-column="actions">
								<SmallButton title={"Recompile CSS"} fa="css3" onClick={actionsService.recompileCss} />
							</td>
							<td>{"Recompile CSS"}</td>
						</tr>
						<tr>
							<td data-column="actions">
								<SmallButton title={"Recompile Javascript"} fa="jsfiddle" onClick={actionsService.recompileJs} />
							</td>
							<td>{"Recompile Javascript"}</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = Settings;
