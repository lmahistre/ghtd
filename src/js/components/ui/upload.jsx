
const React = require("react");

const CommonButton = require("./common-button.jsx");

class Upload extends React.Component {

	onChange(event) {
		const self = this;
		if (self.props.onSelect) {
			if (event.target.files[0] && event.target.files[0].size) {
				if (event.target.files[0].size < 1000) {
					let reader = new FileReader();
					reader.onload = (function(file) {
						return function (e) {
							if (e.target.result) {
								self.props.onSelect(null, e.target.result);
							}
							else {
								self.props.onSelect(new Error('Empty file error'));
							}
						}
					})(event.target.files[0]);
					reader.readAsText(event.target.files[0]);
				}
				else {
					self.props.onSelect(new Error("File too big"));
				}
			}
			else {
				self.props.onSelect(new Error("No file selected"));
			}
		}
	}


	buttonClick() {
		document.getElementById('file-select').click();
	}


	render() {
		return (
			<CommonButton onClick={this.buttonClick}>
				<input type="file" id="file-select" onChange={this.onChange.bind(this)} style={{display:'none'}} />
				{this.props.children}
			</CommonButton>
		);
	}
}

module.exports = Upload;
