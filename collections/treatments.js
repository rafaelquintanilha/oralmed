TreatmentsSchema = new SimpleSchema({
  patient_id: {
    type: String,
  },
  startdate: {
    type: Date,
    label: "Data de Início",
  },
  enddate: {
    type: Date,
    label: "Data de Término",
    optional: true,
    custom: function () {
      if (this.value !== "" && this.value < this.field('startdate').value) {
        return "badDate";
      }
    }
  },
  details: {
    type: String,
    label: "Detalhes do Tratamento",
    autoform: {
      rows: 5
    },
    optional: true,
  },
  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
});

// Refer to: https://github.com/aldeed/meteor-simple-schema#customizing-validation-messages
TreatmentsSchema.messages({
  required: "[label] é obrigatório",
  "badDate": "Data de término deve ser posterior à de início"
});

Treatments = new Mongo.Collection("Treatments");
Treatments.attachSchema(TreatmentsSchema);

Meteor.methods({
  deleteTreatment: function (id) {
    var loggedInUser = Meteor.user();

    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['Gerente'])) {
      throw new Meteor.Error(403, "Você não tem permissão para deletar um tratamento!")
    } 

    check(id, String)
    return Treatments.remove(id);
  },

  getPatient: function (id) {
    check(id, String);
    return Treatments.findOne(id);
  },
})