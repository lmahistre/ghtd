
const React = require("react");

const AppPage = require("../app-page.jsx");
const SmallButton = require("../ui/small-button.jsx");

class Settings extends React.Component {

	toggleTheme() {
		const theme = app.state.data.settings.theme === 'dark' ? 'dark' : 'light';
		app.state.data.settings.theme = theme === 'dark' ? 'light' : 'dark';
		app.services.saveData();
		app.render();
	}


	render() {
		return (
			<AppPage selectedMenu="settings">
				<table className="list-table">
					<tbody>
						<tr>
							<td>
								<SmallButton title="" glyphicon="adjust" onClick={this.toggleTheme} />
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
