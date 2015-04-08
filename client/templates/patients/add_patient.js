// Inicializa máscaras
var setUpMasks = function() {
	$('[name="cpf"]').mask("999.999.999-99");
	$('[name="address.zipcode"]').mask("99999-999");
	$('[name="contact.phone"]').mask("(99)99999999?9");
	$('[name="contact.phone2"]').mask("(99)99999999?9");
}

Template.addPatient.onRendered(setUpMasks);
Template.editPatient.onRendered(setUpMasks);

Template.patient.onCreated(function() {
  var self = this;
  self.autorun(function () {
    self.subscribe("patient", Router.current().params._id);
  });
});

Template.editPatient.helpers({
  selectedDoc: function () {
    return Patients.findOne(Router.current().params._id);
  },
});

AutoForm.hooks({
	insertPatientForm: {
		onSuccess: function() {
			// Paciente criado com sucesso
			Router.go("patients");
		}
	},
	editPatientForm: {
		onSuccess: function() {
			// Paciente editado com sucesso
			Router.go("patients");
		}
	},
})