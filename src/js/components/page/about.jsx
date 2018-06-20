const React = require("react");

const AppPage = require("../app-page.jsx");

class About extends React.Component {
	render () {
		return (
			<AppPage selectedMenu="about">
				{"v 0.1.1"}
			</AppPage>
		);
	}
}

module.exports = About;