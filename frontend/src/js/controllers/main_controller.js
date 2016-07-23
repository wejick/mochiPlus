var isOnline = true;
angular.module('Up+.controllers.Main', [])

.controller('MainController', function($scope){

    var statusOnline = 'bg-offline';
    if(navigator.onLine) {
        statusOnline = 'bg-green-42';
    }
    console.log(statusOnline);
    $scope.bgStatusOnline = statusOnline;
});
