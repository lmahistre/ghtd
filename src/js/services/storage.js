
exports.save = function (data) {
	for (let k in data) {
		localStorage[k] = JSON.stringify(data[k]);
	}
}


exports.retrieve = function (callback) {
	const data = {}
	let keys = ['tasks', 'projects', 'settings'];
	for (let i in keys) {
		// data[keys[i]] = {}
		try {
			if (localStorage[keys[i]]) {
				data[keys[i]] = JSON.parse(localStorage[keys[i]]);
			}
		}
		catch (error) {}
	}
	if (callback && typeof callback === 'function') {
		callback(data);
	}
}


exports.getImportProjects = function (callback) {
	var importProjects;
	try {
		if (localStorage.importProjects) {
			importProjects = JSON.parse(localStorage.importProjects);
		}
	}
	catch (error) {}
	if (callback && typeof callback === 'function') {
		callback(importProjects);
	}
}