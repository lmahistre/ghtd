
const utils = require('../js/services/utils.js');
describe ('utils', function() {
	it ('renameProject', function() {
		expect(utils.renameProject('name-of-the-project')).toBe('Name Of The Project');
	});
});


describe ('merge tasks', function() {
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
			projects : {},
		});
	});

	it ('tasks', function() {
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
			projects : {},
		});
	});

	it ('tasks, t1 modified on server', function() {
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
			projects : {},
		});
	});

	it ('tasks, t1 modified locally', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
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
		}, {
			timestampSynchronized : 1540000500,
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
			projects : {},
		});
	});

	it ('tasks, t1 done then reopened', function() {
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
			projects : {},
		});
	});

	it ('with removed local task', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			tasks : {
				't1' : {
					id : 't1',
					timestampModified : 1540001000,
					name : 'task 1',
					status : 'removed',
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
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
			projects : {},
		});
	});

	it ('with removed task from server', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			tasks : {
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
					timestampModified : 1540001000,
					name : 'task 1',
					status : 'removed',
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
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p1',
				},
			},
			projects : {},
		});
	});

	it ('with done local task', function() {
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
			projects : {},
		});
	});

	it ('with done task from server', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			tasks : {
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
		}, 1540002000)).toEqual({
			timestampSynchronized : 1540002000,
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
			projects : {},
		});
	});
});


describe ('merge projects', function() {
	it ('same project', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000500,
					name : 'project 1',
					status : 'active',
				},
			},
		}, {
			timestampSynchronized : 1540000500,
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000500,
					name : 'project 1',
					status : 'active',
				},
			},
		}, 1540002000)).toEqual({
			timestampSynchronized : 1540002000,
			tasks : {},
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000500,
					name : 'project 1',
					status : 'active',
				},
			},
		});
	});

	it ('same project modified locally before', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000400,
					name : 'project 1 modified',
					status : 'active',
				},
			},
		}, {
			timestampSynchronized : 1540000500,
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000500,
					name : 'project 1',
					status : 'active',
				},
			},
		}, 1540002000)).toEqual({
			timestampSynchronized : 1540002000,
			tasks : {},
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000500,
					name : 'project 1',
					status : 'active',
				},
			},
		});
	});

	it ('same project modified locally after', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000800,
					name : 'project 1 modified',
					status : 'active',
				},
			},
		}, {
			timestampSynchronized : 1540000500,
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000500,
					name : 'project 1',
					status : 'active',
				},
			},
		}, 1540002000)).toEqual({
			timestampSynchronized : 1540002000,
			tasks : {},
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000800,
					name : 'project 1 modified',
					status : 'active',
				},
			},
		});
	});

	it ('2 active projects without task', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000800,
					name : 'project 1 modified',
					status : 'active',
				},
			},
		}, {
			timestampSynchronized : 1540000500,
			projects : {
				'p2' : {
					id : 'p2',
					timestampModified : 1540000500,
					name : 'project 1',
					status : 'active',
				},
			},
		}, 1540002000)).toEqual({
			timestampSynchronized : 1540002000,
			tasks : {},
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000800,
					name : 'project 1 modified',
					status : 'active',
				},
				'p2' : {
					id : 'p2',
					timestampModified : 1540000500,
					name : 'project 1',
					status : 'active',
				},
			},
		});
	});

	it ('2 removed projects without task', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000800,
					name : 'project 1 modified',
					status : 'removed',
				},
			},
		}, {
			timestampSynchronized : 1540000500,
			projects : {
				'p2' : {
					id : 'p2',
					timestampModified : 1540000500,
					name : 'project 1',
					status : 'removed',
				},
			},
		}, 1540002000)).toEqual({
			timestampSynchronized : 1540002000,
			tasks : {},
			projects : {},
		});
	});

	it ('2 active projects with removed tasks', function() {
		expect(utils.mergeData({
			timestampSynchronized : 1540001000,
			tasks : {
				't1' : {
					id : 't1',
					timestampModified : 1540001000,
					name : 'task 1',
					status : 'removed',
					projectId : 'p1',
				},
				't2' : {
					id : 't2',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'removed',
					projectId : 'p1',
				},
			},
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000800,
					name : 'project 1 modified',
					status : 'removed',
				},
			},
		}, {
			timestampSynchronized : 1540000500,
			tasks : {
				't3' : {
					id : 't3',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'removed',
					projectId : 'p2',
				},
			},
			projects : {
				'p2' : {
					id : 'p2',
					timestampModified : 1540000500,
					name : 'project 1',
					status : 'removed',
				},
			},
		}, 1540002000)).toEqual({
			timestampSynchronized : 1540002000,
			tasks : {},
			projects : {},
		});
	});

	it ('2 active projects with tasks', function() {
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
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000800,
					name : 'project 1 modified',
					status : 'active',
				},
			},
		}, {
			timestampSynchronized : 1540000500,
			tasks : {
				't3' : {
					id : 't3',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p2',
				},
			},
			projects : {
				'p2' : {
					id : 'p2',
					timestampModified : 1540000500,
					name : 'project 1',
					status : 'active',
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
				't3' : {
					id : 't3',
					timestampModified : 1540000500,
					name : 'task 2',
					status : 'active',
					projectId : 'p2',
				},
			},
			projects : {
				'p1' : {
					id : 'p1',
					timestampModified : 1540000800,
					name : 'project 1 modified',
					status : 'active',
				},
				'p2' : {
					id : 'p2',
					timestampModified : 1540000500,
					name : 'project 1',
					status : 'active',
				},
			},
		});
	});
});


describe('projectIsUsed', function() {
	it ('is used', function() {
		expect(utils.projectIsUsed('p1', {
			't1' : {
				id : 't1',
				name : 'task 1',
				projectId : 'p1',
			},
			't2' : {
				id : 't2',
				name : 'task 2',
				projectId : 'p1',
			},
		})).toBe(true);
	});

	it ('is not used', function() {
		expect(utils.projectIsUsed('p2', {
			't1' : {
				id : 't1',
				name : 'task 1',
				projectId : 'p1',
			},
			't2' : {
				id : 't2',
				name : 'task 2',
				projectId : 'p1',
			},
		})).toBe(false);
	});
});


describe('projectIsUsedByVisibleTasks', function() {
	it ('is used', function() {
		expect(utils.projectIsUsedByVisibleTasks('p1', {
			't1' : {
				id : 't1',
				name : 'task 1',
				status : 'active',
				projectId : 'p1',
			},
			't2' : {
				id : 't2',
				name : 'task 2',
				status : 'active',
				projectId : 'p1',
			},
		})).toBe(true);
	});

	it ('is not used', function() {
		expect(utils.projectIsUsedByVisibleTasks('p1', {
			't1' : {
				id : 't1',
				name : 'task 1',
				status : 'removed',
				projectId : 'p1',
			},
			't2' : {
				id : 't2',
				name : 'task 2',
				status : 'removed',
				projectId : 'p1',
			},
		})).toBe(false);

		expect(utils.projectIsUsedByVisibleTasks('p2', {
			't1' : {
				id : 't1',
				name : 'task 1',
				status : 'active',
				projectId : 'p1',
			},
			't2' : {
				id : 't2',
				name : 'task 2',
				status : 'active',
				projectId : 'p1',
			},
		})).toBe(false);
	});
});


describe('settingsDecode', function() {
	it ('encodes then decodes', function() {
		let settings = {
			user : 'test',
			gistId : 'gist_id',
			token : 'settings_token',
			fileName : 'test.json',
		}
		expect(utils.settingsDecode(utils.settingsEncode(settings))).toEqual(settings);
		
	});
});