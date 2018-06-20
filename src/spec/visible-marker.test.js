const React = require("react");

const ShallowRenderer = require('react-test-renderer/shallow')
const VisibleMarker = require('../js/components/visible-marker.jsx')
// import ShallowRenderer from 'react-test-renderer/shallow';

// in your test:
const renderer = new ShallowRenderer();
// renderer.render(<VisibleMarker />);
renderer.render(React.createElement(VisibleMarker, null));
const result = renderer.getRenderOutput();

expect(result.type).toBe('span');
// expect(result.props.children).toEqual([
//   <span className="heading">Title</span>,
//   <Subcomponent foo="bar" />
// ]);

