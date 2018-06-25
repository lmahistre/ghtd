const React = require("react");

const AppPage = require("../app-page.jsx");

class About extends React.Component {
	render () {
		return (
			<AppPage selectedMenu="about">
				<p>{"GHT version 0.1.1"}</p>
			</AppPage>
		);
	}
}

module.exports = About;