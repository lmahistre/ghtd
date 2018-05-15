
exports.validateData = function (data) {
	const validatedData = {
		tasks : {},
		projects : {},
		// settings : {},
	};
	if (data.tasks) {
		for (let k in data.tasks) {
			validatedData.tasks[k] = {
				id : data.tasks[k].id,
				name : data.tasks[k].name,
				projectId : data.tasks[k].projectId,
				status : data.tasks[k].status,
				timestampCreated : isNaN(data.tasks[k].timestampCreated) ? 0 : data.tasks[k].timestampCreated,
				timestampModified : isNaN(data.tasks[k].timestampModified) ? 0 : data.tasks[k].timestampModified,
			}
		}
	}
	if (data.projects) {
		for (let k in data.projects) {
			validatedData.projects[k] = {
				id : data.projects[k].id,
				name : data.projects[k].name,
				visible : data.projects[k].visible,
				color : data.projects[k].color,
				repo : data.projects[k].repo,
			}
		}
	}
	// if (data.settings) {
	// 	for (let k in data.settings) {
	// 		validatedData.settings[k] = data.settings[k];
	// 	}
	// }
	return validatedData;
}