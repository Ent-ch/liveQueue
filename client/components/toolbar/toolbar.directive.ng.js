angular.module('liveQueApp')
.directive('toolbar', function() {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/toolbar/toolbar.view.html',
    replace: true
  };
});
