
const utils = require('../js/services/utils.js');
describe ('utils', function() {
	it ('renameProject', function() {
		expect(utils.renameProject('name-of-the-project')).toBe('Name Of The Project');
	});
});


describe ('merge', function() {
	it ('merge 1 task and another task', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			tasks : {
				't1' : {
					id : 't1',
					timestampModified : 1540001000,
					name : 'task 1',
					status : 'active',
					projectId : 'p1',
				},
			},
		}, {
			timestampSynchronized : 1540000500,
			tasks : {
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
		}, 1540002000)).toEqual({
			timestampSynchronized : 1540002000,
			tasks : {
				't1' : {
					id : 't1',
					timestampModified : 1540001000,
					name : 'task 1',
					status : 'active',
					projectId : 'p1',
				},
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
		});
	});

	it ('merge tasks', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			tasks : {
				't1' : {
					id : 't1',
					timestampModified : 1540001000,
					name : 'task 1',
					status : 'active',
					projectId : 'p1',
				},
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
		}, {
			timestampSynchronized : 1540000500,
			tasks : {
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
		}, 1540002000)).toEqual({
			timestampSynchronized : 1540002000,
			tasks : {
				't1' : {
					id : 't1',
					timestampModified : 1540001000,
					name : 'task 1',
					status : 'active',
					projectId : 'p1',
				},
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
		});
	});

	it ('merge tasks, t1 modified', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			tasks : {
				't1' : {
					id : 't1',
					timestampModified : 1540001000,
					name : 'task 1',
					status : 'active',
					projectId : 'p1',
				},
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
		}, {
			timestampSynchronized : 1540000500,
			tasks : {
				't1' : {
					id : 't1',
					timestampModified : 1540001500,
					name : 'task 1 modified',
					status : 'active',
					projectId : 'p1',
				},
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
		}, 1540002000)).toEqual({
			timestampSynchronized : 1540002000,
			tasks : {
				't1' : {
					id : 't1',
					timestampModified : 1540001500,
					name : 'task 1 modified',
					status : 'active',
					projectId : 'p1',
				},
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
		});
	});

	it ('merge tasks, t1 done then reopened', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			tasks : {
				't1' : {
					id : 't1',
					timestampModified : 1540001000,
					name : 'task 1',
					status : 'done',
					projectId : 'p1',
				},
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
		}, {
			timestampSynchronized : 1540000500,
			tasks : {
				't1' : {
					id : 't1',
					timestampModified : 1540001500,
					name : 'task 1 modified',
					status : 'active',
					projectId : 'p1',
				},
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
		}, 1540002000)).toEqual({
			timestampSynchronized : 1540002000,
			tasks : {
				't1' : {
					id : 't1',
					timestampModified : 1540001500,
					name : 'task 1 modified',
					status : 'active',
					projectId : 'p1',
				},
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
		});
	});
});