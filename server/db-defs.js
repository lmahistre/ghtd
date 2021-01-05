const Sequelize = require('sequelize');

// exports.user = {
// 	deleted : {
// 		type : Sequelize.BOOLEAN,
// 		defaultValue : 0,
// 	},
// 	name : Sequelize.STRING,
// }

exports.task = {
	deleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : 0,
	},
	name : Sequelize.STRING,
	projectId : Sequelize.INTEGER,
	status : Sequelize.STRING,
}

exports.project = {
	deleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : 0,
	},
	name : Sequelize.STRING,
	visible : Sequelize.BOOLEAN,
	color : Sequelize.STRING,
	repo : Sequelize.STRING,
	status : Sequelize.STRING,
}
