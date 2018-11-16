const React = require("react");
const ReactRedux = require('react-redux');

const AppPage = require("../app-page.jsx");
const Block = require("../ui/block.jsx");

const consts = require('../../services/consts.js');
const store = require('../../services/store.js');

module.exports = store.connect(function(props) {
	if (props.settings.language == 'fr') {
		return (
			<AppPage selectedMenu="settings">
				<Block>
					<div className="text-page">
						<p>{consts.appName+" version "+consts.version}</p>
						<h2>{"Stockage desdonnées"}</h2>
						<p>
							{"Les données manipulées par l'application sont stockées dans le "}
							<i>{"local storage"}</i>
							{". Aucun cookie n'est utilisé. Il est possible d'utilisé un compte GitHub pour stocker les données dans un Gist."}</p>
						<h2>{"Utilisation d'un compte GitHub"}</h2>
						<p>{"Vous devez posséder un compte GitHub. Ce compte doit comporter :"}</p>
						<ul>
							<li>{"Un Gist pour stocker ces données."}</li>
							<li>{"Un jeton qui permet à l'application d'accéder aux Gists."}</li>
						</ul>
						<p></p>
					</div>
				</Block>
			</AppPage>
		);
	}
	else {
		return (
			<AppPage selectedMenu="settings">
				<Block>
					<div className="text-page">
						<p>{consts.appName+" version "+consts.version}</p>
						<h2>{"Data storage"}</h2>
						<p>{"Data managed by the application is stored in local storage. It does not use cookies to store data. It is possible to use a GitHub account to store and synchronize data."}</p>
						<h2>{"Setup a GitHub account"}</h2>
						<p>{"To do this operation, you must have a GitHub account. This account must also have:"}</p>
						<ul>
							<li>{"A Gist to store data."}</li>
							<li>{"A token to access Gist data."}</li>
						</ul>
						<p></p>
					</div>
				</Block>
			</AppPage>
		);
	}
});
