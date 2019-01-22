
const React = require("react");

module.exports = props => (
	<div className={"ui-tr content "+props.className}>
		{props.children}
	</div>
);