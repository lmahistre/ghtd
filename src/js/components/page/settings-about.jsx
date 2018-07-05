const React = require("react");

const AppPage = require("../app-page.jsx");

module.exports = class SettingsAbout extends React.Component {
	render () {
		return (
			<AppPage selectedMenu="settings">
				<p>{"GHT version 0.1.1"}</p>
			</AppPage>
		);
	}
}
