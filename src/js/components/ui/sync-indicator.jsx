
const React = require("react");
const ReactRouterDom = require('react-router-dom');

const Link = ReactRouterDom.Link;

const L = require('../../services/i18n.js');
const reduxActions = require('../../services/redux-actions.js');
const store = require('../../services/store.js');
const githubSync = require('../../services/github-sync.js');

module.exports = class SyncIndicator extends React.Component {

	syncWithGitHub() {
		store.dispatch(reduxActions.setBusy(true));
		githubSync.syncWithGitHub(function() {
			store.dispatch(reduxActions.endSync());
		});
	}

	render () {
		const settings = this.props.settings;
		const isConnected = settings.user && settings.gistId && settings.token;
		if (isConnected) {
			if (this.props.busy) {
				return (
					<span className="sync-indicator busy" data-tip={L("Synchronizing")}>
						<span className="fa fa-refresh fa-spin" aria-hidden="true" />
					</span>
				);
			}
			else {
				if (settings.isSyncDirty) {
					return (
						<span className="sync-indicator sync-dirty" 
								data-tip={L("Sync with GitHub")} 
								onClick={this.syncWithGitHub}>
							<span className="fa fa-refresh" aria-hidden="true" />
						</span>
					);
				}
				else {
					return (
						<span className="sync-indicator connected" 
								data-tip={L("Sync with GitHub")} 
								onClick={this.syncWithGitHub}>
							<span className="fa fa-refresh" aria-hidden="true" />
						</span>
					);
				}
			}
		}
		else {
			return (
				<Link className="sync-indicator" to="/settings" data-tip={L("Not connected")}>
					<span className="fa fa-user-times" aria-hidden="true" />
				</Link>
			);
		}
	}
}