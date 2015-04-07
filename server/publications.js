Meteor.publish('patients', function() {
  return Patients.find();
});