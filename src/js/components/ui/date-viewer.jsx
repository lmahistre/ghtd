
const React = require("react");

const format = function (n) {
	return (''+n).padStart(2,0);
}


module.exports = function (props) {
	let time = props.time;
	if (isNaN(time)) {
		time = 0;
	}
	const date = new Date(time*1000);
	return format(date.getDate())+'/'+format(date.getMonth()+1)+'/'+date.getFullYear()+' '+format(date.getHours())+':'+format(date.getMinutes())+':'+format(date.getSeconds());
}