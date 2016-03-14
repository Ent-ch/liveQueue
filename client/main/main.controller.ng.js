angular.module('liveQueApp')
.controller('MainCtrl', function($scope, $mdDialog, $mdMedia) {

  $scope.maxDays = 7;

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
      return Tasks.find({});
    },
    dates: function () {
      var dates = [];
      for (var index = 0; index < $scope.maxDays; index++) {
        dates.push(new Date().setDate(new Date().getDate() + index));
      }

      return dates;
    },
    taskDuration: function () {
      // console.log(Meteor.settings);
      return GetMeteorSettingsValue('public.taskDuration');
    },
    hours: function () {
      return [
        {
          time: "9:00 - 10:00",
          status: 1,
        },
        {
          time: "11:00 - 12:00",
          status: 0,
        },
        {
          time: "13:00 - 14:00",
          status: 0,
        },
        {
          time: "15:00 - 16:00",
          status: 1,
        },
        {
          time: "17:00 - 18:00",
          status: 0,
        }
    ];
    }
  });

  $scope.subscribe('things', function() {
    return [{}, $scope.getReactively('search')];
  });

  $scope.remove = function(thing) {
    Tasks.remove({_id: thing._id});
  };
})
  .directive('toggleClass', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          element.next().toggleClass();
        });
      }
    };
});

function DialogController($scope, $mdDialog) {
  $scope.save = function() {
    if ($scope.form.$valid) {
      Tasks.insert($scope.newThing);
      $scope.newThing = undefined;
    }
    $mdDialog.hide();
  };
}
