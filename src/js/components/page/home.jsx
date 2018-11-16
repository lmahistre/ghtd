const React = require("react");
const { Link, Redirect } = require('react-router-dom');

const AppPage = require("../app-page.jsx");
const Block = require("../ui/block.jsx");

const consts = require('../../services/consts.js');
const store = require('../../services/store.js');

class Home extends React.Component {
	render() {
		if ((!this.props.tasks || JSON.stringify(this.props.tasks) == '{}')
			&& (!this.props.projects || JSON.stringify(this.props.projects) == '{}')
		) {
			console.log(this.props.tasks)
			console.log(this.props.settings)
			if (this.props.settings.language == 'fr') {
				return (
					<AppPage>
						<Block>
						<div className="text-page">
								<h2>{"GHTD"}</h2>
								<p>{"Version "+consts.version}</p>
								<p>{"Cette application sert à gérer facilement des tâches par projet."}</p>
								<p>{"Elle peut être utilisée seule ou avec un compte GitHub. Les données sont toujours stockées dans le "}
									<i>{"local storage"}</i>
									{", elles peuvent aussi être stockées dans un Gist sur GitHub pour synchroniser les données entre plusieurs appareils."}
								</p>
								<p>
									{"Pour connecter un compte GitHub, aller dans la section "}
									<Link to="/settings">{"Paramètres"}</Link>
									{"."}
								</p>
								<p>
									{"Les informations de cette page peuvent être retrouvées dans la section "}
									<Link to="/settings-about">{"Paramètres > Aide"}</Link>
									{"."}
								</p>
							</div>
						</Block>
					</AppPage>
				);
			}
			else {
				return (
					<AppPage>
						<Block>
							<div className="text-page">
								<h2>{"GHTD"}</h2>
								<p>{"Version "+consts.version}</p>
								<p>{"This application allows to manage easily tasks and projects."}</p>
								<p>{"The application can be used alone or with a GitHub account. The data is always stored in local storage, it can also be stored in a GitHub Gist to allow synchronization between devices."}</p>
								<p>
									{"To connect a GitHub account, go to "}
									<Link to="/settings">{"Settings"}</Link>
									{" page."}
								</p>
								<p>
									{"You can find this information later on "}
									<Link to="/settings-about">{"Settings > About"}</Link>
									{" page."}
								</p>
							</div>
						</Block>
					</AppPage>
				);
			}
		}
		else {
			return <Redirect to="/tasks" />
		}
	}
}

module.exports = store.connect(Home);