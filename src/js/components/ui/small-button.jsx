
const React = require("react");

class SmallButton extends React.Component {
	render() {
		return (
			<a href="javascript:void(0);" className="small-button" onClick={this.props.onClick} title={this.props.title}>
				<span className={"glyphicon glyphicon-"+this.props.glyphicon} aria-hidden="true"></span>
			</a>
		);
	}
}

module.exports = SmallButton;