angular.module('Up+.controllers.Upload', [])
.config(function ($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.controller('UploadController', function($scope, $http, $location){
  var pushEndpoint = document.getElementsByName('pushEndpoint')[0].value;
  $scope.uploadData = {};
  //$location.path('/');
  $scope.upload = function(){
    console.log($scope.uploadData);

    $scope.uploadData.pushEndpoint = pushEndpoint;
    $http({
      method  : 'POST',
      url     : root()+'api/product/upload',
      data    : $scope.uploadData,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin' : '*' }
    }).success(function(data) {
      console.log("success with response "+data);
    });    
    showToast();
    $location.path('/');
  };
});
function showToast(){
  if(isOnline) {
    var toast = new iqwerty.toast.Toast();
    toast.setText('Uploading your product').setDuration(1500).show();
  } else {
    var toast = new iqwerty.toast.Toast();
    toast.setText('You have pending upload').setDuration(1500).show();
  }
}
