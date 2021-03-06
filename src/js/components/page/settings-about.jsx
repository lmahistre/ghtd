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
						<h2>{"Stockage des données"}</h2>
						<p>
							{"Les données manipulées par l'application sont stockées dans le "}
							<i>{"local storage"}</i>
							{". Aucun cookie n'est utilisé. Il est possible d'utiliser un compte GitHub pour stocker les données dans un Gist."}</p>
						<h2>{"Utilisation d'un compte GitHub"}</h2>
						<p>{"Vous devez posséder un compte GitHub. Ce compte doit comporter :"}</p>
						<ul>
							<li>{"Un Gist pour stocker ces données."}</li>
							<li>{"Un jeton qui permet à l'application d'accéder aux Gists."}</li>
						</ul>
						<h2>{"Paramètres"}</h2>
						<p>{"Paramètres disponibles :"}</p>
						<ul>
							<li>{"Langue : langue de l'interface (français ou anglais)"}</li>
							<li>{"Utilisateur : nom d'utilisateur du compte GitHub"}</li>
							<li>{"ID du Gist : identifiant du Gist utilisé pour stocker les données"}</li>
							<li>{"Jeton : jeton utilisé pour accéder aux Gists. Le jeton nécessite seulement l'accès aux Gists"}</li>
							<li>{"Nom de fichier : fichier du Gist pour stocker les données, 'ghtd.json' par défaut"}</li>
						</ul>
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
						<h2>{"Settings"}</h2>
						<p>{"Available settings:"}</p>
						<ul>
							<li>{"Language: interface language (English or French)"}</li>
							<li>{"User: user name of GitHub account"}</li>
							<li>{"Gist ID: identifier of the Gist used to store data"}</li>
							<li>{"Token: token used to access Gist data. This token only requires access to Gists"}</li>
							<li>{"File name: name of the file used to store data inside the Gist, 'ghtd.json' by default"}</li>
						</ul>
					</div>
				</Block>
			</AppPage>
		);
	}
});
