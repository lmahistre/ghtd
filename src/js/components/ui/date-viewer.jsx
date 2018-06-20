
const React = require("react");

class DateViewer extends React.Component {
	render() {
		let time = this.props.time;
		if (isNaN(time)) {
			time = 0;
		}
		const date = new Date(time*1000);
		return date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	}
}

module.exports = DateViewer;