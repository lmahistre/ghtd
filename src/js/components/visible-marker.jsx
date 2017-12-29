
const React = require("react");

class VisibleMarker extends React.Component {
	render() {
		return this.props.visible ? (
			<span className={"glyphicon glyphicon-eye-open color-yes"} aria-hidden="true"></span>
		) : (
			<span className={"glyphicon glyphicon-eye-close color-no"} aria-hidden="true"></span>
		);
	}
}

module.exports = VisibleMarker;