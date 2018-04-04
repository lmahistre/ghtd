
describe ('utils', function() {
	const utilsService = require('../js/services/utils.js');
	it ('renameProject', function() {
		expect(utilsService.renameProject('name-of-the-project')).toBe('Name Of The Project');
	});
});