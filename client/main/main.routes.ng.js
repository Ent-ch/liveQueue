angular.module('liveQueApp')
.config(function($stateProvider) {
  $stateProvider
  .state('main', {
    url: '/',
    templateUrl: 'client/main/main.view.html',
    controller: 'MainCtrl'
  });
});
