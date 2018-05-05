const React = require("react");

class TaskView extends React.Component {

	render() {
		const self = this;
		let task = dataContainerService.getTask(self.props.match.params.id);
		return (
			<AppPage selectedMenu="tasks">
			</AppPage>
		);
	}
}

module.exports = TaskView;