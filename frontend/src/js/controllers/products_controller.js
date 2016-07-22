angular.module('Up+.controllers.Products', [])

.controller('ProductsController', function($scope,$http) {
  // $scope.IntroOptions = {
  //   steps:[
  //   {
  //       element: '#product-list',
  //       intro: "Product List"
  //   }]
  // };

  // $scope.CallMe();

  //get data product list from server
    $http({
      method  : 'GET',
      url     : root()+"api/product/list",
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
