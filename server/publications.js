Meteor.publish('patients', function() {
  return Patients.find();
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