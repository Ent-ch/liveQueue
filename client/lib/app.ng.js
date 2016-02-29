angular.module('liveQueApp', [
  'angular-meteor',
  'ui.router',
  'ngMaterial'
]);

onReady = function() {
  angular.bootstrap(document, ['liveQueApp']);
};
  
if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}