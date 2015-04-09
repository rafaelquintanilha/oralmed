// Inicializa máscaras
var setUpMasks = function() {
	$('[name="address.zipcode"]').mask("99999-999");
	$('[name="contact.phone"]').mask("(99)99999999?9");
	$('[name="contact.phone2"]').mask("(99)99999999?9");
}

Template.addDentist.onRendered(setUpMasks);
Template.editDentist.onRendered(setUpMasks);

Template.dentist.onCreated(function() {
  var self = this;
  self.autorun(function () {
    self.subscribe("dentist", Router.current().params._id);
  });
});

Template.editDentist.helpers({
  selectedDoc: function () {
    return Dentists.findOne(Router.current().params._id);
  },
});

AutoForm.hooks({
	insertDentistForm: {
		onSuccess: function() {
			// Paciente criado com sucesso
			Router.go("dentists");
		}
	},
	editDentistForm: {
		onSuccess: function() {
			// Paciente editado com sucesso
			Router.go("dentists");
		}
	},
});