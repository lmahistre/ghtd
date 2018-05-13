
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

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
		if (this.props.to) {
			return (
				<Link className="small-button" to={this.props.to} style={this.props.style} data-tip={this.props.title}>
					<span className={className} aria-hidden="true" />
				</Link>
			);
		}
		else {
			return (
				<a href="javascript:void(0);" className="small-button" onClick={this.props.onClick} style={this.props.style} data-tip={this.props.title}>
					<span className={className} aria-hidden="true" />
				</a>
			);
		}
	}
}

module.exports = SmallButton;