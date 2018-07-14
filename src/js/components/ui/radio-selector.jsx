
const React = require("react");
const PropTypes = require('prop-types');

class RadioSelector extends React.Component {

	constructor(props) {
		super();
		this.state = {
			value : props.value,
		}
	}

	click(event) {
		this.setState({
			value : event.target.attributes.value.value,
		})
	}


	render() {
		const self = this;
		const containerClassName = 'radio-selector' + (self.props.className ? ' '+self.props.className : '');
		return (
			<div className={containerClassName}>
				<input type="hidden" name={self.props.name} value={self.state.value} id={self.props.id} />
				{self.props.options.map(elt => (
					<a key={elt.value} href="javascript:void(0);" className="radio-selector-elt" onClick={self.click.bind(self)} data-tip={elt.label} value={elt.value} data-selected={elt.value === self.state.value ? 'selected' : ''}>{elt.label}</a>
				))}
			</div>
		);
	}
}

RadioSelector.propTypes = {
	id : PropTypes.string,
	name : PropTypes.string,
	className : PropTypes.string,
	options : PropTypes.array,
}

module.exports = RadioSelector;