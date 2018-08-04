const React = require("react");
const ReactRedux = require('react-redux');

const AppPage = require("../app-page.jsx");

module.exports = function(props) {
	return (
		<AppPage selectedMenu="settings">
			<div className="text-page">
				<p>{"GHT version 0.1.3"}</p>
				<h2>{"Data storage"}</h2>
				<p>{"Data managed by the application is stored in local storage. It does not use cookies to store data. It is possible to use a GitHub account to store and synchronize data."}</p>
				<h2>{"Setup a GitHub account"}</h2>
				<p>{"To do this operation, you must have a GitHub account. This account must also have :"}</p>
				<ul>
					<li>A Gist to store data.</li>
					<li>A token to access Gist data.</li>
				</ul>
				<p></p>
			</div>
		</AppPage>
	);
}
