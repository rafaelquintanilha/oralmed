Meteor.startup(function () {
	accountsUIBootstrap3.setLanguage('pt-BR'); // for Portuguese (Brazil)

	Accounts.ui.config({
  		passwordSignupFields: "USERNAME_ONLY"
	});
});