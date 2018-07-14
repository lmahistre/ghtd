
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

class SmallButton extends React.Component {

	constructor() {
		super();
		this.colors = [
			'blue', 'green', 'yellow', 'orange', 'red', 'purple',
		];
	}


	render() {
		let iconClassName = 'fa';
		let linkClassName = 'small-button';
		if (this.props.fa) {
			iconClassName = "fa fa-"+this.props.fa;
		}
		if (this.props.color && this.colors.indexOf(this.props.color) > -1) {
			linkClassName += ' small-button-'+this.props.color;
		}
		if (this.props.to) {
			return (
				<Link className={linkClassName} to={this.props.to} style={this.props.style} data-tip={this.props.title}>
					<span className={iconClassName} aria-hidden="true" />
				</Link>
			);
		}
		else {
			return (
				<a href="javascript:void(0);" className={linkClassName} onClick={this.props.onClick} style={this.props.style} data-tip={this.props.title}>
					<span className={iconClassName} aria-hidden="true" />
				</a>
			);
		}
	}
}

module.exports = SmallButton;