
const React = require("react");

const Menu = require('./menu.jsx');

class AppPage extends React.Component {
	render() {
		const self = this;
		return (
			<div className="container">
				<Menu selectedMenu={self.props.selectedMenu} />
				{self.props.children}
			</div>
		);
	}
}

module.exports = AppPage;