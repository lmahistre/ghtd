
exports.task = function (obj) {
	return {
		id : obj.id,
		name : obj.name,
		projectId : obj.projectId,
		status : obj.status,
		timestampCreated : isNaN(obj.timestampCreated) ? 0 : obj.timestampCreated,
		timestampModified : isNaN(obj.timestampModified) ? 0 : obj.timestampModified,
	}
}


exports.project = function (obj) {
	return {
		id : obj.id,
		name : obj.name,
		visible : obj.visible,
		color : obj.color,
		repo : obj.repo,
		timestampCreated : isNaN(obj.timestampCreated) ? 0 : obj.timestampCreated,
		timestampModified : isNaN(obj.timestampModified) ? 0 : obj.timestampModified,
	}
}