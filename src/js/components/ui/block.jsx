
const React = require("react");

class Block extends React.Component {
	render() {
		return (
			<div className="ui-block content">
				{this.props.children}
			</div>
		);
	}
}

module.exports = Block;