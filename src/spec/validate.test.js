
describe ('validate', function() {
	const validateService = require('../js/services/validate.js');
	it ('task', function() {
		expect(validateService.task({
			id : 'testid',
			name : 'Test Name',
			projectId : 'testpid',
			status : 'active',
			timestampCreated : 135435,
			timestampModified : 135899,
			somethingElse : 'value',
		})).toEqual({
			id : 'testid',
			name : 'Test Name',
			projectId : 'testpid',
			status : 'active',
			timestampCreated : 135435,
			timestampModified : 135899,
		});
	});
});