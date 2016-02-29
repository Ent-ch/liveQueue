angular.module('liveQueApp')
.controller('MainCtrl', function($scope, $mdDialog, $mdMedia) {

$scope.showAlert = function(ev) {
   $mdDialog.show(
     $mdDialog.alert()
       .parent(angular.element(document.querySelector('#popupContainer')))
       .clickOutsideToClose(true)
       .title('This is an alert title')
       .textContent('You can specify some description text in here.')
       .ariaLabel('Alert Dialog Demo')
       .ok('Got it!')
       .targetEvent(ev)
   );
 };

$scope.showAlert2 = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
     $mdDialog.show({
       controller: DialogController,
       templateUrl: 'client/main/main.add.html',
       parent: angular.element(document.body),
       targetEvent: ev,
       clickOutsideToClose:true,
    //    fullscreen: useFullScreen
     })
     .then(function(answer) {
       $scope.status = 'You said the information was "' + answer + '".';
     }, function() {
       $scope.status = 'You cancelled the dialog.';
     });
     $scope.$watch(function() {
       return $mdMedia('xs') || $mdMedia('sm');
     }, function(wantsFullScreen) {
       $scope.customFullscreen = (wantsFullScreen === true);
     });
  };

  $scope.helpers({
    things: function() {
      return Things.find({});
    }
  });

  $scope.subscribe('things', function() {
    return [{}, $scope.getReactively('search')];
  });

  $scope.remove = function(thing) {
    Things.remove({_id: thing._id});
  };
});

function DialogController($scope, $mdDialog) {
    $scope.save = function() {
      if ($scope.form.$valid) {
        Things.insert($scope.newThing);
        $scope.newThing = undefined;
      }
      $mdDialog.hide();
    };
}
