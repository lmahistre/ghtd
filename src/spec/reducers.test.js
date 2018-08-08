
describe ('reducers', function() {
	const reducersService = require('../js/services/reducers.js');

	it ('removeResolvedTasks', function() {
		expect(reducersService.REMOVE_RESOLVED_TASKS({
			tasks : {
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
			},
		}, {
			currentTimestamp : 1531075149,
		})).toEqual({
			tasks : {
				'1' : {
					id : '1',
					status : 'active',
					timestampModified : 1531075147,
				},
				'2' : {
					id : '2',
					status : 'removed',
					timestampModified : 1531075149,
				},
			},
		});
	});

	it ('deleteRemovedTasks', function() {
		expect(reducersService.DELETE_REMOVED_TASKS({
			tasks : {
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
			},
		}, {
			currentTimestamp : 1531075149,
		})).toEqual({
			tasks : {
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
			},
		});

		expect(reducersService.DELETE_REMOVED_TASKS({
			tasks : {
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
			},
		}, {
			currentTimestamp : 1572475149,
		})).toEqual({
			tasks : {
				'2' : {
					id : '2',
					status : 'done',
					timestampModified : 1531075147,
				},
			},
		});
	});
});
