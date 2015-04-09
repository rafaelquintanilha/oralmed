Template.patients.onCreated(function() {
  var self = this;
  self.autorun(function () {
    self.subscribe("patients");
  });
});

Template.patients.onRendered(function() {
	$('.fa').tooltip();
});

Template.patients.events({
	'click .fa-plus-circle': function() {
		Router.go('addPatient');
	},
	'click .fa-eye': function() {
		Router.go('patient', {_id: this._id});
	},
	'click .fa-medkit': function() {
		Router.go('patientTreatments', {_id: this._id});
	},
	"click .fa-close": function() {
		var id = this._id; 
		if ( confirm("Deseja deletar este paciente? Esse procedimento não pode ser desfeito") ) {
			Meteor.call('deletePatient', id, function(error, result) {
				if (error) return alert(error.reason);
			});
		}
  	},
});

Template.patients.helpers({
	'patients': function() {
		return Patients.find({}, {sort: {name: 1}});
	},

	// Refer to: http://momentjs.com/docs/#/parsing/string-format/
	'formatDate': function(date) {
		// Método UTC para ignorar time zone
		return moment.utc(date).format("DD/MM/YYYY");
	},

	'getAge': function(date) {
		return moment().diff(date, 'years');
	},
});