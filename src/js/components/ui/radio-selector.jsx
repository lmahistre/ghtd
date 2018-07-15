
const React = require("react");
const PropTypes = require('prop-types');

const Option = function(elt) {
	return (
		<a key={elt.value} 
			href="javascript:void(0);" 
			className="radio-selector-elt" 
			onClick={elt.onClick} 
			data-tip={elt.title} 
			value={elt.value} 
			data-selected={elt.selected ? 'selected' : null}>
			{elt.label}
		</a>
	);
}

Option.propTypes = {
	value : PropTypes.string,
	onClick : PropTypes.func,
	label : PropTypes.string,
	selected : PropTypes.bool,
}


class RadioSelector extends React.Component {

	constructor(props) {
		super();

		this.options = [];
		if (props.children) {
			if (Array.isArray(props.children)) {
				for (let i=0; i<props.children.length; i++) {
					if ('option' === props.children[i].type) {
						this.options.push(this.childrenToOptions(props.children[i].props));
					}
					else {
						let eltName = '';
						if ('string' === typeof props.children[i].type) {
							eltName = props.children[i].type;
						}
						else if (props.children[i].type && props.children[i].type.name) {
							eltName = props.children[i].type.name;
						}
						console.warn("<"+eltName+"> is not a valid child for RadioSelector");
					}
				}
			}
			else if ('option' === props.children.type) {
				this.options.push(this.childrenToOptions(props.children.props));
			}
		}

		this.state = {
			value : props.value,
		}
	}


	childrenToOptions(props) {
		return {
			value : props.value,
			label : props.children,
			title : props.title,
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
				{self.options.map(elt => (
					<Option 
						key={elt.value} 
						value={elt.value} 
						onClick={self.click.bind(self)} 
						label={elt.label} 
						title={elt.title} 
						selected={elt.value === self.state.value} 
					/>
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