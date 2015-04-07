// Inicializa máscaras
Template.addPatient.rendered = function() {
	$('[name="cpf"]').mask("999.999.999-99");
	$('[name="phone"]').mask("(99)99999999?9");
}

AutoForm.hooks({
	insertPatientForm: {
		onSuccess: function() {
			// Paciente criado com sucesso
			Router.go("patients");
		}
	}
})