exports.task = function (obj) {
	return {
		id : obj.id,
		name : obj.name,
		projectId : obj.projectId,
		status : obj.status && ['active', 'done', 'removed'].indexOf(obj.status) > -1 ? obj.status : 'removed',
		timestampCreated : isNaN(obj.timestampCreated) ? parseInt(Date.now()/1000) : obj.timestampCreated,
		timestampModified : isNaN(obj.timestampModified) ? parseInt(Date.now()/1000) : obj.timestampModified,
	}
}

exports.project = function (obj) {
	return {
		id : obj.id,
		name : obj.name,
		visible : obj.visible,
		color : obj.color,
		provider : obj.provider,
		repo : obj.repo,
		status : obj.status && ['active', 'removed'].indexOf(obj.status) > -1 ? obj.status : 'removed',
		timestampCreated : isNaN(obj.timestampCreated) ? parseInt(Date.now()/1000) : obj.timestampCreated,
		timestampModified : isNaN(obj.timestampModified) ? parseInt(Date.now()/1000) : obj.timestampModified,
	}
}
