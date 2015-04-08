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
    this.render('login');
  } else {
    this.next();
  }
});

Router.map(function() {
  this.route('home', {path: '/'}),
  this.route('patients'),
  this.route('patient', {path: '/patient/:_id'});
  this.route('addPatient', {path: 'add_patient'}),
  this.route('treatments', {path: '/treatments/:_id'}),
  this.route('treatment', {path: '/treatment/:_id'});
  this.route('tab')
});
