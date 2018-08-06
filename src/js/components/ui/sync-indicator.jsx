
const React = require("react");

const L = require('../../services/i18n.js');

module.exports = class SyncIndicator extends React.Component {

	syncWithGitHub() {
		
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
				return (
					<span className="sync-indicator connected" 
							data-tip={L("Sync with GitHub")} 
							onClick={this.syncWithGitHub}>
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