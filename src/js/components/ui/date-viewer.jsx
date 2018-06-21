
const React = require("react");

// class DateViewer extends React.Component {

// 	format(n) {
// 		return (''+n).padStart(2,0);
// 	}

// 	render() {
// 		let time = this.props.time;
// 		if (isNaN(time)) {
// 			time = 0;
// 		}
// 		const date = new Date(time*1000);
// 		return this.format(date.getDate())+'/'+this.format(date.getMonth())+'/'+date.getFullYear()+' '+this.format(date.getHours())+':'+this.format(date.getMinutes())+':'+this.format(date.getSeconds());
// 	}
// }

// module.exports = DateViewer;

const format = function (n) {
	return (''+n).padStart(2,0);
}


module.exports = function (props) {
	let time = props.time;
	if (isNaN(time)) {
		time = 0;
	}
	const date = new Date(time*1000);
	return format(date.getDate())+'/'+format(date.getMonth())+'/'+date.getFullYear()+' '+format(date.getHours())+':'+format(date.getMinutes())+':'+format(date.getSeconds());
}