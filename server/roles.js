Meteor.startup(function () {
	if ( Meteor.users.find().count() < 1 ) {
		var users = [
			{username: "rafael", roles: ['Administrador', 'Gerente']},
			{username: "rozely", roles: ['Gerente']},
		];
		_.each(users, function(userData) {
			var userId = Accounts.createUser({
				username: userData.username,
				password: "1234"
			});
			Roles.addUsersToRoles(userId, userData.roles);
		});
	}
});