const React = require("react");

module.exports = React.createClass({

	displayName : "TaskList",
	render() {
		const self = this;
		return (
			<tr key={elt.id} className={"status-"+elt.status}>
				<td>
					{elt.status == 'done' ? 
						[
							<a href="javascript:void(0);" key={0} className="small-button" onClick={self.delete.bind(self, elt.id)}>
								<span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
							</a>,
							<a href="javascript:void(0);" key={1} className="small-button" onClick={self.unresolve.bind(self, elt.id)}>
								<span className="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
							</a>
						]
					:
						[
							<a href="javascript:void(0);" key={0} className="small-button">
								<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
							</a>,
							<a href="javascript:void(0);" key={1} className="small-button" onClick={self.resolve.bind(self, elt.id)}>
								<span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
							</a>
						]
					}
				</td>
				<td>{elt.projectId}</td>
				<td>{elt.projectName}</td>
				<td>{elt.name}</td>
			</tr>
		);
	},
});