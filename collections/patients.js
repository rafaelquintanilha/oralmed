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
    optional: true,
    regEx: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ // Não faz conta de dígito verificador, apenas olha a máscara
  },
  dentalcare: {
    type: String,
    label: "Plano Odontológico",
    allowedValues: ['Amil', 'Bradesco', 'Metlife'],
    autoform: {
      afFieldInput: {
        firstOption: "(Selecione)"
      }
    }
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
  address: {
    type: Object,
    label: "Endereço"
  },
  'address.street': {
    type: String,
    label: "Logradouro",
  },
  'address.number': {
    type: Number,
    label: "Número",
    optional: true
  },
  'address.complement': {
    type: String,
    label: "Complemento",
    optional: true
  },
  'address.neighbourhood': {
    type: String,
    label: "Bairro",
  },
  'address.city': {
    type: String,
    label: "Cidade",
  },
  'address.zipcode': {
    type: String,
    label: "CEP",
    regEx: /^\d{5}-\d{3}$/,
    optional: true
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
    {exp: /^\d{5}-\d{3}$/, msg: "[label] deve ser no formato XXXXX-XXX, onde X é um número"},
    {exp: SimpleSchema.RegEx.Email, msg: "[label] não é um endereço de e-mail válido"},
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