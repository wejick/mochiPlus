angular.module('Up+.controllers.Products', [])

.controller('ProductsController', function($scope,$http) {

  //get data product list from server
    $http({
      method  : 'GET',
      url     : "https://hackathon.tokopedia.com/api/product/list",
      data    : "",
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(res) {
      $scope.data = res.data;
    });
    
  //get pending data
  $scope.pendingUpload = "-";
  if($scope.pendingUpload != "-") {
    
  } else {
    
  }
});
