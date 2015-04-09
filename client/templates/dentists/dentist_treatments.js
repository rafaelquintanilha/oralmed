Template.dentistTreatments.onCreated(function() {
  var self = this;
  self.autorun(function () {
    self.subscribe("dentistTreatments", Router.current().params._id);
    self.subscribe("dentistsName");
    self.subscribe("patientsName");
  });
});

Template.dentistTreatments.helpers({
  'treatments': function() {
    return Treatments.find({}, {sort: {startdate: -1}});
  },

  'existTreatment': function() {
    return Treatments.find().count() > 0 ? true : false;
  },

  'getDentistName': function() {
    return Dentists.findOne(Router.current().params._id).name;
  },

  'getPatientName': function(id) {
    return Patients.findOne(id).name;
  },

  // Refer to: http://momentjs.com/docs/#/parsing/string-format/
  'formatDate': function(date) {
    // Método UTC para ignorar time zone
    if ( date === undefined ) return "Em andamento";
    return moment.utc(date).format("DD/MM/YYYY");
  },
});

Template.dentistTreatments.events({
  'click .fa-eye': function() {
    Router.go('treatment', {_id: this._id});
  },
  "click .fa-close": function() {
    var id = this._id; 
    if ( confirm("Deseja deletar este tratamento? Esse procedimento não pode ser desfeito") ) {
      Meteor.call('deleteTreatment', id, function(error, result) {
        if (error) return alert(error.reason);
      });
    }
  },
});