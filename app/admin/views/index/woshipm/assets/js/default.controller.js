var app = angular.module('myApp', []);

app.controller('headerCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
  $scope.show = false;
  $scope.hold = false;
  $scope.showMenu = function () {
    $scope.show = true;
  };
  $scope.hideMenu = function () {
    $timeout(function () {
      $scope.show = false;
    }, 50);
  };

  $scope.show2 = false;
  $scope.hold2 = false;
  $scope.showMenu2 = function () {
    $scope.show2 = true;
  };
  $scope.hideMenu2 = function () {
    $timeout(function () {
      $scope.show2 = false;
    }, 50);
  };


}]);
app.controller('contentCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
  $scope.collection = function () {

  };
  /*
   * 弹出登录框
   * */
  $scope.loginOut=function () {

      $('body').prepend('<div class="overlay overlay--dark" id="login_iframe"><button class="overlayclose-btn button--close" id="collection_close">×</button><iframe id="top_login_frame" src="/user/login" width="600" height="400" scrolling="no" class="top_fc_box"></iframe></div>');


      $('#collection_close').on('click', function () {
        $('#login_iframe').remove();

      });


  };




}]);