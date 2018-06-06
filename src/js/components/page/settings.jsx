
const React = require("react");

const AppPage = require("../app-page.jsx");
const CommonButton = require("../ui/common-button.jsx");

const storageService = require('../../services/storage.js');

class Settings extends React.Component {

	render() {
		const settings = storageService.getSettings() ? storageService.getSettings() : {};
		return (
			<AppPage selectedMenu="settings">
				<CommonButton to="settings-edit">{"Edit"}</CommonButton>
				<table className="list-table" data-table="settings-list">
					<tbody>
						<tr>
							<td data-column="label">{"User"}</td>
							<td data-column="value">{settings.user}</td>
						</tr>
						<tr>
							<td data-column="label">{"Gist ID"}</td>
							<td data-column="value">{settings.gistId}</td>
						</tr>
						<tr>
							<td data-column="label">{"Token"}</td>
							<td data-column="value">{settings.token}</td>
						</tr>
					</tbody>
				</table>
			</AppPage>
		);
	}
}

module.exports = Settings;
