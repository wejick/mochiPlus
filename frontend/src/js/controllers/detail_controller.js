angular.module('Up+.controllers.Detail', [])

.controller('DetailController', function($scope,$http) {

  $scope.init = function () {
      var sliderdemo = new Slider('#product-slide', '.z-slide-item', {
        // options here
        autoplay: false
    });
  };

});
