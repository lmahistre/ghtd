
module.exports = {

	getData : function (callback) {
		// app.get('?action=getData', function(response) {
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
		}
		// app.post('?action=setData', data, function(response) {
		app.post('/setData', data, function(response) {
			if (callback && typeof callback == 'function') {
				callback(response.data);
			}
		});
	}
};
