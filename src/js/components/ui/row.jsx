
const React = require("react");

class Row extends React.Component {
	render() {
		// <div className="clearfix" />
		return (
			<div className={"ui-tr content "+this.props.className}>
				{this.props.children}
			</div>
		);
	}
}

module.exports = Row;