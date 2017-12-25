
const React = require("react");
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

module.exports = React.createClass({

	displayName : "Menu",


	render() {
		const self = this;
		return (
			<div className="menu">
				<Link className="menu-entry" to="/tasks">Tasks</Link>
				<Link className="menu-entry" to="/projects">Projects</Link>
			</div>
		);
	},
});