var isOnline = true;
angular.module('Up+.controllers.Main', [])

.controller('MainController', function($scope){

    var statusOnline = 'bg-offline';
    if(navigator.onLine) {
        statusOnline = 'bg-green-42';
        isOnline = true;
    }
    $scope.bgStatusOnline = statusOnline;

    $scope.$on('$routeChangeSuccess', function(next, current) { 
        var tokens = self.location.href.split('/');
        if(tokens[4] == "upload") {
            $scope.disableBtnAddProduct = 1;
        } else {
            $scope.disableBtnAddProduct = 0;
        }
    });
});
