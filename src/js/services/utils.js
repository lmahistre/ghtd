
let constsService = require('./consts.js');
const store = require('./store.js');
const clone = require('clone');

exports.setDependencies = function (deps) {
	if (deps.constsService) {
		constsService = deps.constsService;
	}
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
	const newData = {
		tasks : {},
		projects : {},
		timestampSynchronized,
	};

	// tasks
	if (extData && extData.tasks) {
		for (let k in extData.tasks) {
			if ((typeof localData.tasks[k] === 'undefined'
					&& (extData.tasks[k].status === 'active' || extData.tasks[k].status === 'done')) 
				|| (localData.tasks[k] 
					&& localData.tasks[k].timestampModified < extData.tasks[k].timestampModified)
			) {
				newData.tasks[k] = extData.tasks[k];
			}
			else {
				if (typeof localData.tasks[k] !== 'undefined') {
					newData.tasks[k] = localData.tasks[k];
				}
			}
		}
	}

	// Tasks existing locally but not externally
	for (let k in localData.tasks) {
		if ('undefined' === typeof extData.tasks[k]) {
			if (localData.tasks[k].status === 'active' || localData.tasks[k].status === 'done') {
				newData.tasks[k] = localData.tasks[k];
			}
		}
	}

	// Projects
	if (extData && extData.projects) {
		for (let k in extData.projects) {
			if ((typeof localData.projects[k] === 'undefined'
					&& (extData.projects[k].status === 'active' 
						|| exports.projectIsUsed(extData.projects[k].id, newData.tasks))
					) 
				|| (localData.projects[k] 
					&& localData.projects[k].timestampModified < extData.projects[k].timestampModified)
			) {
				newData.projects[k] = extData.projects[k];
			}
			else {
				if (typeof localData.projects[k] !== 'undefined') {
					newData.projects[k] = localData.projects[k];
				}
			}
		}
	}

	// Projects existing locally but not externally
	for (let k in localData.projects) {
		if ('undefined' === typeof extData.projects[k]) {
			if (localData.projects[k].status === 'active'
				|| exports.projectIsUsed(localData.projects[k].id, newData.tasks)
			) {
				newData.projects[k] = localData.projects[k];
			}
		}
	}

	return newData;
}


exports.projectIsUsedByVisibleTasks = function(projectId, tasks) {
	let projectIsUsed = false;
	for (let taskId in tasks) {
		if (tasks[taskId].projectId == projectId
			&& (tasks[taskId].status == 'active' || tasks[taskId].status == 'done')
		) {
			projectIsUsed = true;
		}
	}
	return projectIsUsed;
}


exports.projectIsUsed = function(projectId, tasks) {
	let projectIsUsed = false;
	for (let taskId in tasks) {
		if (tasks[taskId] && tasks[taskId].projectId == projectId) {
			projectIsUsed = true;
		}
	}
	return projectIsUsed;
}


exports.settingsDecode = function(str) {
	const crypto = require('crypto');
  const ciph = crypto.createDecipher(constsService.settingsCipher, constsService.settingsKey);
  const p = ciph.update(str, 'base64', 'utf8') + ciph.final('utf8').toString('utf8');
	const obj = JSON.parse(p);
	const ret = {};
	if (obj.user) {
		ret.user = obj.user;
	}
	if (obj.gistId) {
		ret.gistId = obj.gistId;
	}
	if (obj.token) {
		ret.token = obj.token;
	}
	if (obj.fileName) {
		ret.fileName = obj.fileName;
	}
	if (typeof obj.warnIfDirty === 'boolean') {
		ret.warnIfDirty = obj.warnIfDirty;
	}
	return ret;
}


exports.settingsEncode = function(settings) {
	const crypto = require('crypto');
	const ciph = crypto.createCipher(constsService.settingsCipher, constsService.settingsKey);
	const p = ciph.update(JSON.stringify({
		user : settings.user,
		gistId : settings.gistId,
		token : settings.token,
		fileName : settings.fileName,
	}), 'utf8', 'base64') + ciph.final('base64').toString('utf8');
	return p;
}