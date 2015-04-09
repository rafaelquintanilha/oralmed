Meteor.publish('dentists', function() {
  return Dentists.find();
});

Meteor.publish('dentist', function(_id) {
  return Dentists.find({_id: _id});
});

Meteor.publish('patients', function() {
  return Patients.find();
});

Meteor.publish('patientsName', function() {
  return Patients.find({}, {fields: {name: 1}});
});

Meteor.publish('dentistsName', function() {
  return Dentists.find({}, {fields: {name: 1}});
});

Meteor.publish('patient', function(_id) {
  return Patients.find({_id: _id});
});

Meteor.publish('treatment', function(_id) {
  return Treatments.find({_id: _id});
});

Meteor.publish('patientTreatments', function(_id) {
  return Treatments.find({patient_id: _id});
});

Meteor.publish('dentistTreatments', function(_id) {
  return Treatments.find({dentist_id: _id});
});