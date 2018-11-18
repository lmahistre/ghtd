
describe ('reducers', function() {
	const reducers = require('../js/services/reducers.js');

	it ('REMOVE_RESOLVED_TASKS', function() {
		expect(reducers.REMOVE_RESOLVED_TASKS({
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


	it ('DELETE_REMOVED_TASKS', function() {
		expect(reducers.DELETE_REMOVED_TASKS({
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

		expect(reducers.DELETE_REMOVED_TASKS({
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


	it ('INIT', function() {
		expect(reducers.INIT(null, {
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
			projects : {},
			settings : {},
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
			projects : {},
			settings : {},
			alerts : [],
			busy : false,
		});
	})


	it ('SET_DATA', function() {
		expect(reducers.SET_DATA({
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
			projects : {},
			settings : {},
			alerts : [],
			busy : false,
		}, {
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
			projects : {
				'1' : {
					id : '1',
					visible : true,
					name : 'project',
					timestampModified : 1531075147,
				},
				'2' : {
					id : '2',
					visible : true,
					name : 'project 2',
					timestampModified : 1531075233,
				},
			},
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
			projects : {
				'1' : {
					id : '1',
					visible : true,
					name : 'project',
					timestampModified : 1531075147,
				},
				'2' : {
					id : '2',
					visible : true,
					name : 'project 2',
					timestampModified : 1531075233,
				},
			},
			settings : {},
			alerts : [],
			busy : false,
		});
	});


	it ('SET_TASK', function() {
		expect(reducers.SET_TASK({
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
			task : {
				id : '3',
				status : 'active',
				timestampModified : 1531075047,
			},
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
				'3' : {
					id : '3',
					status : 'active',
					timestampModified : 1531075047,
				},
			},
		});

		expect(reducers.SET_TASK({
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
				'3' : {
					id : '3',
					status : 'active',
					timestampModified : 1531075047,
				},
			},
		}, {
			task : {
				id : '3',
				status : 'done',
				name : 'test',
				timestampModified : 1531075347,
			},
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
				'3' : {
					id : '3',
					status : 'done',
					name : 'test',
					timestampModified : 1531075347,
				},
			},
		});
	});


	it ('SET_TASK_STATUS', function() {
		expect(reducers.SET_TASK_STATUS({
			tasks : {
				'1' : {
					id : '1',
					name : 'test1',
					status : 'removed',
					timestampModified : 1531075147,
				},
				'2' : {
					id : '2',
					name : 'task 2',
					status : 'active',
					timestampModified : 1531075147,
				},
				'3' : {
					id : '3',
					status : 'active',
					name : 'test',
					timestampModified : 1531075347,
				},
			},
		}, {
			status : 'done',
			currentTimestamp : 1531075233,
			id : '2',
		})).toEqual({
			tasks : {
				'1' : {
					id : '1',
					name : 'test1',
					status : 'removed',
					timestampModified : 1531075147,
				},
				'2' : {
					id : '2',
					name : 'task 2',
					status : 'done',
					timestampModified : 1531075233,
				},
				'3' : {
					id : '3',
					status : 'active',
					name : 'test',
					timestampModified : 1531075347,
				},
			},
		});
	});


	it ('SET_PROJECT', function() {
		expect(reducers.SET_PROJECT({
			projects : {
				'1' : {
					id : '1',
					name : 'project',
					timestampModified : 1531075147,
				},
				'2' : {
					id : '2',
					name : 'project 2',
					timestampModified : 1531075233,
				},
			}, 
		}, {
			project : {
				id : '3',
				name : 'project 3',
				timestampModified : 1531075347,
			}
		})).toEqual({
			projects : {
				'1' : {
					id : '1',
					name : 'project',
					timestampModified : 1531075147,
				},
				'2' : {
					id : '2',
					name : 'project 2',
					timestampModified : 1531075233,
				},
				'3' : {
					id : '3',
					name : 'project 3',
					timestampModified : 1531075347,
				},
			}, 
		})
	});


	it ('CHANGE_PROJECT_VISIBILITY', function() {
		expect(reducers.CHANGE_PROJECT_VISIBILITY({
			projects : {
				'1' : {
					id : '1',
					visible : false,
					name : 'project',
					timestampModified : 1531075147,
				},
				'2' : {
					id : '2',
					visible : true,
					name : 'project 2',
					timestampModified : 1531075233,
				},
			}, 
		}, {
			id : '1',
			visible : true,
			currentTimestamp : 1531075242,
		})).toEqual({
			projects : {
				'1' : {
					id : '1',
					visible : true,
					name : 'project',
					timestampModified : 1531075242,
				},
				'2' : {
					id : '2',
					visible : true,
					name : 'project 2',
					timestampModified : 1531075233,
				},
			}, 
		});
	});


	it ('SET_BUSY', function() {
		expect(reducers.SET_BUSY({
			busy : false,
		}, {
			busy : true,
		}).busy).toBe(true);

		expect(reducers.SET_BUSY({
			busy : true,
		}, {
			busy : false,
		}).busy).toBe(false);
	});


	it ('REMOVE_PROJECT', function() {
		expect(reducers.REMOVE_PROJECT({
			projects : {
				'1' : {
					id : '1',
					name : 'project',
					status : 'active',
					timestampModified : 1531075147,
				},
				'2' : {
					id : '2',
					name : 'project 2',
					status : 'active',
					timestampModified : 1531075233,
				},
				'3' : {
					id : '3',
					name : 'project 3',
					status : 'active',
					timestampModified : 1531075347,
				},
			}, 
		}, {
			id : '2',
			timestampModified : 1531075540, 
		})).toEqual({
			projects : {
				'1' : {
					id : '1',
					name : 'project',
					status : 'active',
					timestampModified : 1531075147,
				},
				'2' : {
					id : '2',
					name : 'project 2',
					status : 'removed',
					timestampModified : 1531075540,
				},
				'3' : {
					id : '3',
					name : 'project 3',
					status : 'active',
					timestampModified : 1531075347,
				},
			}, 
		});
	});


	it ('SET_SELECTED_PROJECT', function() {
		expect(reducers.SET_SELECTED_PROJECT({
			settings : {},
		}, {
			id : '3',
		}).settings.projectId).toBe('3');
	});


	it ('IMPORT_SETTINGS', function() {
		expect(reducers.IMPORT_SETTINGS({
			settings : {},
		}, {
			settings : {
				user : 'user',
				gistId : '222',
				token : '333',
			},
		})).toEqual({
			settings : {
				user : 'user',
				gistId : '222',
				token : '333',
				isSyncDirty : true,
			}
		});

		expect(reducers.IMPORT_SETTINGS({
			settings : {
				projectId : '2',
				user : 'dd',
			},
		}, {
			settings : {
				user : 'user',
				gistId : '222',
				token : '333',
			},
		})).toEqual({
			settings : {
				projectId : '2',
				user : 'user',
				gistId : '222',
				token : '333',
				isSyncDirty : true,
			}
		});
	});


	it ('SET_SETTINGS', function() {
		expect(reducers.SET_SETTINGS({
			settings : {},
		}, {
			settings : {
				user : 'user',
				gistId : '222',
				token : '333',
				language : 'english',
				theme : 'dark',
			},
		})).toEqual({
			settings : {
				user : 'user',
				gistId : '222',
				token : '333',
				language : 'english',
				theme : 'dark',
				isSyncDirty : true,
			}
		});

		expect(reducers.SET_SETTINGS({
			settings : {
				projectId : '2',
				user : 'dd',
				theme : 'light',
			},
		}, {
			settings : {
				user : 'user',
				gistId : '222',
				token : '333',
				language : 'english',
				theme : 'dark',
			},
		})).toEqual({
			settings : {
				projectId : '2',
				user : 'user',
				gistId : '222',
				token : '333',
				language : 'english',
				theme : 'dark',
				isSyncDirty : true,
			},
		});
	});


	it ('SET_IMPORT_PROJECTS', function() {
		expect(reducers.SET_IMPORT_PROJECTS({}, {
			importProjects : {
				'1' : {
					id : '1',
					name : 'project',
				},
				'2' : {
					id : '2',
					name : 'project 2',
				},
				'3' : {
					id : '3',
					name : 'project 3',
				},
			},
		})).toEqual({
			busy : false,
			importProjects : {
				'1' : {
					id : '1',
					name : 'project',
				},
				'2' : {
					id : '2',
					name : 'project 2',
				},
				'3' : {
					id : '3',
					name : 'project 3',
				},
			},
		});
	});


	it ('ADD_ALERT', function() {
		expect(reducers.ADD_ALERT({
			alerts : [],
		}, {
			alertType : 'success',
			message : 'content of alert',
		})).toEqual({
			alerts : [
				{
					type : 'success',
					message : 'content of alert',
				},
			],
		});
	});


	it ('CLEAR_ALERT', function() {
		expect(reducers.CLEAR_ALERT({
			alerts : [
				{
					type : 'success',
					message : 'content of alert',
				},
			],
		}, {
			index : 0,
		})).toEqual({
			alerts : [],
		});
	});


	it ('END_SYNC', function() {
		expect(reducers.END_SYNC({}).busy).toBe(false);
		expect(reducers.END_SYNC({
			settings : {},
		}).settings.isSyncDirty).toBe(false);
	});
});

