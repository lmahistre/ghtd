
const React = require("react");

class SmallButton extends React.Component {
	render() {
		let className;
		if (this.props.glyphicon) {
			className = "glyphicon glyphicon-"+this.props.glyphicon;
		}
		else if (this.props.fa) {
			className = "fa fa-"+this.props.fa;
		}
		else {
			className = "fa";
		}
		return (
			<a href="javascript:void(0);" className="small-button" onClick={this.props.onClick} style={this.props.style} data-tip={this.props.title}>
				<span className={className} aria-hidden="true"></span>
			</a>
		);
	}
}

module.exports = SmallButton;