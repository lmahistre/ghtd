const Sequelize = require('sequelize');

exports.user = {
	deleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : 0,
	},
	name : Sequelize.STRING,
	projectId : Sequelize.INT
}

exports.task = {
	deleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : 0,
	},

}

exports.project = {
	deleted : {
		type : Sequelize.BOOLEAN,
		defaultValue : 0,
	},

}
