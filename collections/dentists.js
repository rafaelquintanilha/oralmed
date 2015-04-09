DentistsSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Nome",
  },
  contact: {
    type: Object,
    label: "Contato"
  },
  'contact.phone': {
    type: String,
    label: "Telefone 1",
    regEx: /^\(\d{2}\)(\d?)\d{8}$/ 
  },
  'contact.phone2': {
    type: String,
    label: "Telefone 2",
    optional: true,
    regEx: /^\(\d{2}\)(\d?)\d{8}$/ 
  },
  'contact.email': {
    type: String,
    label: "E-mail",
    optional: true,
    regEx: SimpleSchema.RegEx.Email
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
DentistsSchema.messages({
  required: "[label] é obrigatório",
  minNumber: "[label] deve ser ao menos [min]",
  notUnique: "[label] já cadastrado no sistema",
  regEx: [
    {exp: /^\(\d{2}\)(\d?)\d{8}$/, msg: "[label] deve ser no formato (XX)XXXXXXXXX, onde X é um número"},
    {exp: SimpleSchema.RegEx.Email, msg: "[label] não é um endereço de e-mail válido"},
  ]
});

Dentists = new Mongo.Collection("Dentists");
Dentists.attachSchema(DentistsSchema);

Meteor.methods({
  deleteDentist: function (id) {
    var loggedInUser = Meteor.user();

    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['Administrador'])) {
      throw new Meteor.Error(403, "Você não tem permissão para deletar um dentista!")
    } 

    check(id, String)
    return Dentists.remove(id);
  }
});