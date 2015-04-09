Template.dentists.onCreated(function() {
  var self = this;
  self.autorun(function () {
    self.subscribe("dentists");
  });
});

Template.dentists.onRendered(function() {
	$('.fa').tooltip();
});

Template.dentists.events({
	'click .fa-plus-circle': function() {
		Router.go('addDentist');
	},
	'click .fa-eye': function() {
		Router.go('dentist', {_id: this._id});
	},
	'click .fa-medkit': function() {
		Router.go('dentistTreatments', {_id: this._id});
	},
	"click .fa-close": function() {
		var id = this._id; 
		if ( confirm("Deseja deletar este dentista? Esse procedimento não pode ser desfeito") ) {
			Meteor.call('deleteDentist', id, function(error, result) {
				if (error) return alert(error.reason);
			});
		}
  	},
});

Template.dentists.helpers({
	'dentists': function() {
		return Dentists.find({}, {sort: {name: 1}});
	}
});