angular.module('Up+.controllers.Upload', [])
.config(function ($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.controller('UploadController', function($scope, $http){
  $scope.uploadData = {};
  $scope.upload = function(){
    console.log($scope.uploadData);
    $http({
      method  : 'POST',
      url     : '/api/product/upload',
      data    : $scope.uploadData,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin' : '*' }
    }).success(function(data) {
      console.log("success with response "+data);
    });
  };
  
});
