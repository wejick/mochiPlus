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
    //get pending data
  
  $scope.getPendingUpload = function()
  {
    $scope.pendingUpload = [];
    return $http({
      method  : 'GET',
      url     : '/getPendingUpload'
    }).success(function(data) {
      data.forEach(function(item){
        $scope.pendingUpload.push(JSON.parse(item.body));
      });
      $scope.apply();
    });
  }
    
  var APIDetailurl = 'https://hackathon.tokopedia.com/api/product/detail/';
  //get data product list from server
  $http({
    method  : 'GET',
    url     : root()+"api/product/list",
    data    : "",
    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).success(function(res) {
    $scope.getPendingUpload();
    $scope.data = res.data;
    caches.open('offline').then(function(cache){
      $scope.data.forEach(function(data){
        cache.match(APIDetailurl+data.id).then(function(res){
          if(res) {
            data.status = 'available';
          } else {
            data.status = 'unavailable';
          }          
          $scope.$apply();
        });
      });
    });      
  });

});
