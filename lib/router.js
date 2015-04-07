Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function () {
  // Block access if user is not logged in neither has the proper permissions
  if ( !Meteor.userId() || !Roles.userIsInRole(Meteor.user(), ['Gerente']) ) {
    this.render('login');
  } else {
    this.next();
  }
});

Router.map(function() {
  this.route('home', {path: '/'}),
  this.route('patients'),
  this.route('addPatient', {path: 'add_patient'}),
  this.route('tab')
});