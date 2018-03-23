
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
	for (let i = 0; i < app.consts.colors.length; i++) {
		colors[app.consts.colors[i].color] = 0;
	}
	for (let i in app.state.data.projects) {
		if (colors[app.state.data.projects[i].color] !== undefined) {
			colors[app.state.data.projects[i].color]++;
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


exports.getNextProjectId = function() {
	let id = 0;
	// Determine new id
	if (app.state.data.projects) {
		for (let i in app.state.data.projects) {
			if (app.state.data.projects[i].id && app.state.data.projects[i].id > id) {
				id = app.state.data.projects[i].id;
			}
		}
	}
	id++;
	return id;
}