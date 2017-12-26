
const React = require("react");

const Menu = require('./menu.jsx');

module.exports = React.createClass({

	displayName : "AppPage",


	render : function() {
		const self = this;
		return (
			<div className="container">
				<Menu currentPage={app.state.currentPage} />
				{self.props.children}
			</div>
		);
	},
});
