
module.exports = {

	getData : function (callback) {
		app.get('/getData', function(response) {
			if (callback && typeof callback == 'function') {
				callback(response.data);
			}
		});
	},


	saveData : function (callback) {
		const data = {
			tasks : app.state.data.tasks,
			projects : app.state.data.projects,
			settings : app.state.data.settings,
		}
		app.post('/setData', data, function(response) {
			if (callback && typeof callback == 'function') {
				callback(response.data);
			}
		});
	}
};
