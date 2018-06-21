const React = require("react");

const ShallowRenderer = require('react-test-renderer/shallow'); 
const VisibleMarker = require('../js/components/visible-marker.jsx');

describe ('visible-marker', function() {
	it ('visible-marker', function() {
		const renderer = new ShallowRenderer();
		renderer.render(<VisibleMarker />);
		const result = renderer.getRenderOutput();

		expect(result.type).toBe('span');
		expect(result.props.children).toEqual(undefined);
	})
})