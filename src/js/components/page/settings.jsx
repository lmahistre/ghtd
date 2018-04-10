
const React = require("react");

const AppPage = require("../app-page.jsx");
const SmallButton = require("../ui/small-button.jsx");

const actionsService = require('../../services/actions.js');
const browserService = require('../../services/browser.js');
const dataContainerService = require('../../services/data-container.js');

class Settings extends React.Component {

	toggleTheme() {
		const settings = dataContainerService.getSettings();
		const theme = settings.theme === 'dark' ? 'dark' : 'light';
		settings.theme = theme === 'dark' ? 'light' : 'dark';
		actionsService.saveData();
		browserService.render();
	}


	render() {
		return (
			<AppPage selectedMenu="settings">
				<table className="list-table">
					<tbody>
						<tr>
							<td>
								<SmallButton title="" fa="adjust" onClick={this.toggleTheme} />
							</td>
							<td>{"Theme"}</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = Settings;
