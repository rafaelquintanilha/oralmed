Template.treatment.onCreated(function() {
  var self = this;
  self.autorun(function () {
    self.subscribe("treatment", Router.current().params._id);
    self.subscribe("dentists");
  });
});

Template.addTreatment.onCreated(function() {
  var self = this;
  self.autorun(function () {
    self.subscribe("dentists");
  });
});

Template.viewTreatments.onCreated(function() {
  var self = this;
  self.autorun(function () {
    self.subscribe("patientTreatments", Router.current().params._id);
    self.subscribe("patient", Router.current().params._id);
    self.subscribe("dentistsName");
  });
});

Template.treatmentForm.onCreated(function() {
  var self = this;
  self.autorun(function () {
    self.subscribe("dentistsName");
  });
});

Template.editTreatment.helpers({
  selectedDoc: function () {
    return Treatments.findOne(Router.current().params._id);
  },
});

Template.viewTreatments.onRendered(function() {
  $('.fa').tooltip();
});

var mapDentists = function() {
  return Dentists.find().map(function(d) {
    return {label: d.name, value: d._id};
  });
}

Template.treatmentForm.helpers({
  'getDentistName': function(id) {
    return Dentists.findOne(id).name;
  },
  optionsHelper: mapDentists
});

Template.viewTreatments.helpers({
  'treatments': function() {
    return Treatments.find({}, {sort: {startdate: 1}});
  },

  'existTreatment': function() {
    return Treatments.find().count() > 0 ? true : false;
  },

  'getPatientName': function() {
    return Patients.findOne(Router.current().params._id).name;
  },

  'getDentistName': function(id) {
    return Dentists.findOne(id).name;
  },

  // Refer to: http://momentjs.com/docs/#/parsing/string-format/
  'formatDate': function(date) {
    // Método UTC para ignorar time zone
    if ( date === undefined ) return "Em andamento";
    return moment.utc(date).format("DD/MM/YYYY");
  },
});

Template.viewTreatments.events({
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

Template.addTreatment.onRendered(function() {
  $("#insertTreatmentForm").hide();
  $('.fa').tooltip();
});

Template.addTreatment.events({
  'click .fa-angle-double-down': function(e) {
    $("#insertTreatmentForm").show();
    $(e.target).removeClass("fa-angle-double-down").addClass("fa-angle-double-up").attr("data-original-title", "Ocultar formulário");
  },
  'click .fa-angle-double-up': function(e) {
    $("#insertTreatmentForm").hide();
    $(e.target).removeClass("fa-angle-double-up").addClass("fa-angle-double-down").attr("data-original-title", "Mostrar formulário");
  },
});

AutoForm.hooks({
  insertTreatmentForm: {
  	before: {
  		// Antes de inserir, atualiza o documento com o id do safrista
	    insert: function(doc) {
	      var _id = Router.current().params._id;
	      doc.patient_id = _id;
	      this.result(doc);
	    }
  	},
  	onSuccess: function(formType, result) {
  		//alert("Adicionado com sucesso!")
  	},
  },
  editTreatmentForm: {
    onSuccess: function(formType, result) {
      Meteor.call('getPatient', Router.current().params._id, function(error, result) {
        if (error) return alert(error.reason);
        //Router.go('patientTreatments', {_id: result.patient_id});
        history.back();
      });
    },
  },
});