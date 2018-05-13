
const React = require("react");

class VisibleMarker extends React.Component {
	render() {
		return this.props.visible ? (
			<span className={"fa fa-eye color-yes"} aria-hidden="true"></span>
		) : (
			<span className={"fa fa-eye-slash color-no"} aria-hidden="true"></span>
		);
	}
}

module.exports = VisibleMarker;