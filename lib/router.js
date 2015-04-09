Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'spinner'
});

Router.onBeforeAction(function () {
  // Block access if user is not logged in neither has the proper permissions
  if ( !Meteor.userId() ) {
    if ( Meteor.loggingIn() ) {
      this.render(this.loadingTemplate);
    } else {
      this.render('login');
    }
  } else if ( !Roles.userIsInRole(Meteor.user(), ['Gerente']) ) {
    if ( Meteor.loggingIn() ) {
      this.render(this.loadingTemplate);
    } else {
      this.render('permissionDenied');
    }
  } else {
    this.next();
  }
});

Router.map(function() {
  this.route('home', {path: '/'}),
  this.route('permissionDenied', {path: 'permission_denied'}),
  this.route('patients'),
  this.route('patient', {path: '/patient/:_id'}),
  this.route('addPatient', {path: 'add_patient'}),
  this.route('dentists'),
  this.route('addDentist', {path: 'add_dentist'}),
  this.route('dentist', {path: '/dentist/:_id'}),
  this.route('patientTreatments', {path: '/patient_treatments/:_id'}),
  this.route('dentistTreatments', {path: '/dentist_treatments/:_id'}),
  this.route('treatment', {path: '/treatment/:_id'});
});
