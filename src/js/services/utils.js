
var constsService = require('./consts.js');
const store = require('./store.js');
const clone = require('clone');

exports.setDependencies = function (deps) {
	if (deps.constsService) {
		constsService = deps.constsService;
	}
	// if (deps.dataService) {
	// 	dataService = deps.dataService;
	// }
}


/**
 * Transform the technical name of the project into human readable name
 */
exports.renameProject = function(name) {
	name = name.replace(/-/g, ' ');
	name = name.replace(/_/g, ' ');
	name = name.replace(/  /g, ' ');
	const elts = name.split(' ');
	for (var i = 0; i < elts.length; i++) {
		elts[i] = elts[i][0].toUpperCase()+elts[i].slice(1);
	}
	return elts.join(' ');
}


/**
 * Returns a random color, among the least used colors
 */
exports.generateRandomColor = function() {
	// selection of a random color
	const colors = {};
	const projects = store.getState().projects;
	for (let i = 0; i < constsService.colors.length; i++) {
		colors[constsService.colors[i].color] = 0;
	}
	for (let i in projects) {
		if (colors[projects[i].color] !== undefined) {
			colors[projects[i].color]++;
		}
	}
	// search for minimum
	let minColor;
	for (let color in colors) {
		if (typeof minColor === 'undefined') {
			minColor = colors[color];
		}
		else {
			minColor = Math.min(minColor, colors[color]);
		}
	}
	const selectableColors = [];
	for (let color in colors) {
		if (colors[color] == minColor) {
			selectableColors.push(color);
		}
	}

	const randomIndex = parseInt(Math.random() * selectableColors.length);
	return selectableColors[randomIndex];
}


exports.generateRandomId = function () {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
	const idLength = 8;
	let id = '';
	for (var i = 0; i < idLength; i++) {
		id += alphabet[parseInt(Math.random()*alphabet.length)];
	}
	return id;
}


exports.getNextProjectId = function() {
	const projects = store.getState().projects;
	let id = exports.generateRandomId();
	let idIsUnique = false;
	while (!idIsUnique) {
		idIsUnique = true;
		if (projects) {
			for (let i in projects) {
				if (projects[i].id === id) {
					id = exports.generateRandomId();
					idIsUnique = false;
					break;
				}
			}
		}
	}
	return id;
}


exports.getNextTaskId = function() {
	// const tasks = dataService.getTasks();
	const tasks = store.getState().tasks;
	let id = exports.generateRandomId();
	let idIsUnique = false;
	while (!idIsUnique) {
		idIsUnique = true;
		if (tasks) {
			for (let i in tasks) {
				if (tasks[i].id === id) {
					id = exports.generateRandomId();
					idIsUnique = false;
					break;
				}
			}
		}
	}
	return id;
}


exports.mergeData = function(localData, extData, timestampSynchronized) {
	const newData = {};
	const oldExtData = clone(extData);

	// tasks
	if (extData && extData.tasks) {
		for (let k in extData.tasks) {
			if ((typeof localData.tasks[k] === 'undefined'
					&& (!localData.timestampSynchronized
						|| localData.timestampSynchronized < extData.timestampSynchronized)) 
				|| (localData.tasks[k] 
					&& localData.tasks[k].timestampModified < extData.tasks[k].timestampModified)
			) {
				localData.tasks[k] = extData.tasks[k];
			}
		}
	}

	// Remove deleted tasks
	if (localData.timestampSynchronized && localData.timestampSynchronized < extData.timestampSynchronized) {
		for (let k in localData.tasks) {
			if (typeof extData.tasks[k] === 'undefined') {
				delete localData.tasks[k];
			}
		}
	}

	if (extData && extData.projects) {
		for (let k in extData.projects) {
			if ((typeof localData.projects[k] === 'undefined'
					&& (!localData.timestampSynchronized
						|| localData.timestampSynchronized < extData.timestampSynchronized)) 
				|| (localData.projects[k] 
					&& localData.projects[k].timestampModified < extData.projects[k].timestampModified)
			) {
				localData.projects[k] = extData.projects[k];
			}
		}
	}

	localData.timestampSynchronized = timestampSynchronized;
	return localData;
}
