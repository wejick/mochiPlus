var isOnline = true;
angular.module('Up+.controllers.Main', ['mgcrea.pullToRefresh'])

.controller('MainController', function($scope, $q){

    var statusOnline = 'bg-offline';
    if(navigator.onLine) {
        statusOnline = 'bg-green-42';
        isOnline = true;
    }
    $scope.bgStatusOnline = statusOnline;

    $scope.onReload = function() {
      console.warn('reload');
      var deferred = $q.defer();
      setTimeout(function() {
        deferred.resolve(true);
      }, 1000);
      return deferred.promise;
    };

    $scope.$on('$routeChangeSuccess', function(next, current) { 
        var tokens = self.location.href.split('/');
        if(tokens[4] == "upload") {
            $scope.disableBtnAddProduct = 1;
        } else {
            $scope.disableBtnAddProduct = 0;
        }
    });
});
