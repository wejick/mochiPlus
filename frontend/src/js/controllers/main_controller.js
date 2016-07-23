var isOnline = true;
angular.module('Up+.controllers.Main', [])

.controller('MainController', function($scope){

    if (window.matchMedia('(display-mode: standalone)').matches) {
        alert('homescreen');
    }
});
