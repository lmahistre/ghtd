
describe ('reducers', function() {
	const reducersService = require('../js/services/reducers.js');

	it ('removeResolvedTasks', function() {
		expect(reducersService.removeResolvedTasks({
			'1' : {
				id : '1',
				status : 'active',
				timestampModified : 1531075147,
			},
			'2' : {
				id : '2',
				status : 'done',
				timestampModified : 1531075147,
			},
		})).toEqual({
			'1' : {
				id : '1',
				status : 'active',
				timestampModified : 1531075147,
			},
			'2' : {
				id : '2',
				status : 'removed',
				timestampModified : 1531075147,
			},
		});
	});

	it ('deleteRemovedTasks', function() {
		expect(reducersService.deleteRemovedTasks({
			'1' : {
				id : '1',
				status : 'removed',
				timestampModified : 1531075147,
			},
			'2' : {
				id : '2',
				status : 'done',
				timestampModified : 1531075147,
			},
		}, 1531076147)).toEqual({
			'1' : {
				id : '1',
				status : 'removed',
				timestampModified : 1531075147,
			},
			'2' : {
				id : '2',
				status : 'done',
				timestampModified : 1531075147,
			},
		});
		expect(reducersService.deleteRemovedTasks({
			'1' : {
				id : '1',
				status : 'removed',
				timestampModified : 1531075147,
			},
			'2' : {
				id : '2',
				status : 'done',
				timestampModified : 1531075147,
			},
		}, 1562611250)).toEqual({
			'2' : {
				id : '2',
				status : 'done',
				timestampModified : 1531075147,
			},
		});
	});
});
