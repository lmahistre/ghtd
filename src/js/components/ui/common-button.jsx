
const React = require("react");

const ReactRouterDom = require('react-router-dom');
const Link = ReactRouterDom.Link;

module.exports = function (props) {
	if (props.to) {
		return (
			<Link className="common-button" to={props.to}>
				{props.children}
			</Link>
		);
	}
	else {
		return (
			<a className="common-button" onClick={props.onClick} href="javascript:void(0);">
				{props.children}
			</a>
		);
	}
}
