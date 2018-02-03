
const React = require("react");

const AppPage = require("../app-page.jsx");
const SmallButton = require("../ui/small-button.jsx");

class Settings extends React.Component {

	toggleTheme() {
		const theme = localStorage.theme === 'dark' ? 'dark' : 'light';
		localStorage.theme = theme === 'dark' ? 'light' : 'dark';
		app.render();
	}


	render() {
		return (
			<AppPage selectedMenu="settings">
				<table>
					<tbody>
						<tr>
							<td className="label">Theme</td>
							<td className="value">
								<SmallButton title="" glyphicon="adjust" onClick={this.toggleTheme} />
							</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = Settings;
