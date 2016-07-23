angular.module('Up+.controllers.Detail', [])

.controller('DetailController', function($scope,$http) {
  var tokens = self.location.href.split('/');
  var productId = tokens[5];
  $http({
    method  : 'GET',
    url     : root()+"api/product/detail/"+productId,
    data    : "",
    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).success(function(res) {
    $scope.data = res.data;
  });
  $scope.init = function () {
      var sliderdemo = new Slider('#product-slide', '.z-slide-item', {
        // options here
        autoplay: false
    });
  };
});
