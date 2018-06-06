
const React = require("react");

class VisibleMarker extends React.Component {
	render() {
		return this.props.visible ? (
			<span className={"fa fa-eye color-yes"} aria-hidden="true" data-tip={this.props.title} />
		) : (
			<span className={"fa fa-eye-slash color-no"} aria-hidden="true" data-tip={this.props.title} />
		);
	}
}

module.exports = VisibleMarker;