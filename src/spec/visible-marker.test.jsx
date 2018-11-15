const React = require("react");

const ShallowRenderer = require('react-test-renderer/shallow'); 
const VisibleMarker = require('../js/components/ui/visible-marker.jsx');

describe ('visible-marker', function() {
	const renderer = new ShallowRenderer();
	it ('visible-marker', function() {
		renderer.render(<VisibleMarker />);
		const result = renderer.getRenderOutput();

		expect(result.type).toBe('span');
		expect(result.props.children).toEqual(undefined);
	});

	it ('visible-marker visible', function() {
		renderer.render(<VisibleMarker visible={true} />);
		const result = renderer.getRenderOutput();
		expect(result.props.className).toBe('fa fa-eye color-yes');
	});

	it ('visible-marker not visible', function() {
		renderer.render(<VisibleMarker visible={false} />);
		const result = renderer.getRenderOutput();
		expect(result.props.className).toBe('fa fa-eye-slash color-no');
	});
})