const React = require("react");

const ShallowRenderer = require('react-test-renderer/shallow');
const Renderer = require('react-test-renderer');
const RadioSelector = require('../js/components/ui/radio-selector.jsx');

describe ('radio-selector', function() {
	const renderer = new ShallowRenderer();

	it ('renders', function() {
		renderer.render(<RadioSelector />);
		const result = renderer.getRenderOutput();

		expect(result.type).toBe('div');
		expect(result.props.className).toBe('radio-selector');
	});

	it ('renders with children', function() {
		const result = Renderer.create(
			<RadioSelector id="settings-theme" value="dark">
				<option value="light">Light</option>
				<option value="dark">Dark</option>
			</RadioSelector>
		).toJSON();

		expect(result.type).toBe('div');
		expect(result.children[0].type).toBe('input');
		expect(result.children[0].props.id).toBe('settings-theme');
		expect(result.children[0].props.value).toBe('dark');
		expect(result.children[1].type).toBe('a');
		expect(result.children[1].props.className).toBe('radio-selector-elt');
		expect(result.children[1].props.value).toBe('light');
		expect(result.children[1].props['data-selected']).toBe(null);
		expect(result.children[1].children).toEqual(['Light']);
		expect(result.children[2].type).toBe('a');
		expect(result.children[2].props.className).toBe('radio-selector-elt');
		expect(result.children[2].props.value).toBe('dark');
		expect(result.children[2].props['data-selected']).toBe('selected');
		expect(result.children[2].children).toEqual(['Dark']);
	});
});