PatientsSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Nome",
  },
  birthday: {
    type: Date,
    label: "Data de Nascimento",
    optional: true
  },
  gender: {
    type: String,
    label: "Gênero",
    allowedValues: ['Masculino', 'Feminino'],
    autoform: {
      afFieldInput: {
        firstOption: "(Selecione)"
      }
    }
  },
  cpf: {
    type: String,
    label: "CPF",
    unique: true,
    regEx: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ // Não faz conta de dígito verificador, apenas olha a máscara
  },
  phone: {
    type: String,
    label: "Telefone",
    regEx: /^\(\d{2}\)(\d?)\d{8}$/ 
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
PatientsSchema.messages({
  required: "[label] é obrigatório",
  minNumber: "[label] deve ser ao menos [min]",
  notUnique: "[label] já cadastrado no sistema",
  regEx: [
    {exp: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, msg: "[label] deve ser no formato XXX.XXX.XXX-XX, onde X é um número"},
    {exp: /^\(\d{2}\)(\d?)\d{8}$/, msg: "[label] deve ser no formato (XX)XXXXXXXXX, onde X é um número"},
  ]
});

Patients = new Mongo.Collection("Patients");
Patients.attachSchema(PatientsSchema);

Meteor.methods({
  deletePatient: function (id) {
    var loggedInUser = Meteor.user();

    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['Administrador'])) {
      throw new Meteor.Error(403, "Você não tem permissão para deletar um paciente!")
    } 

    check(id, String)
    return Patients.remove(id);
  }
})