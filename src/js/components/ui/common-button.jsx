
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

const colors = [
	'blue', 'green', 'yellow', 'orange', 'red', 'purple',
];

module.exports = function (props) {
	let linkClassName = 'common-button';
	if (props.color && colors.indexOf(props.color) > -1) {
		linkClassName += ' small-button-'+props.color;
	}
	if (props.to) {
		return (
			<Link className={linkClassName} to={props.to}>
				{props.children}
			</Link>
		);
	}
	else if (props.onClick) {
		return (
			<a className={linkClassName} onClick={props.onClick} href="javascript:void(0);">
				{props.children}
			</a>
		);
	}
	else {
		return (
			<a className={linkClassName} href={props.href} download={props.download}>
				{props.children}
			</a>
		);
	}
}
