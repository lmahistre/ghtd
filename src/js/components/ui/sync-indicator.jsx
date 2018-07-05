
const React = require("react");

const actionsService = require('../../services/actions.js');
const storageService = require('../../services/storage.js');
const L = require('../../services/i18n.js');

module.exports = class SyncIndicator extends React.Component {
	render () {
		const settings = storageService.getSettings();
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
				return (
					<span className="sync-indicator connected" data-tip={L("Sync with GitHub")} onClick={actionsService.syncWithGitHub}>
						<span className="fa fa-refresh" aria-hidden="true" />
					</span>
				);
			}
		}
		else {
			return (
				<span className="sync-indicator" data-tip={L("Not connected")}>
					<span className="fa fa-user-times" aria-hidden="true" />
				</span>
			);
		}
	}
}