angular.module('Up+.controllers.Upload', [])

.controller('UploadController', function($scope, $http){
  $scope.uploadData = {};
  $scope.upload = function(){
    $http({
      method  : 'POST',
      url     : '/',
      data    : "",
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(data) {
      console.log("success with response "+data);
    });
  };
  
});
