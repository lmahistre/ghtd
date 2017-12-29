
const React = require("react");

const AppPage = require("./app-page.jsx");

class SettingsPage extends React.Component {
	render() {
		return (
			<AppPage selectedMenu="settings">
				<table>
					<tbody>
						<tr>
							<td>Theme</td>
							<td>
								
							</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = SettingsPage;
