var isOnline = true;
angular.module('Up+.controllers.Main', [])

.controller('MainController', function($scope){


}).directive('mainDirective', function() {
  return function(scope, element, attrs) {
    // function startIntro(){

    //   var intro = introJs();
    //   intro.setOptions({
    //     steps: [
    //       {
    //         element: document.querySelector('#product-list'),
    //         intro: "This is a tooltip."
    //       },
    //       {
    //         element: document.querySelector('#add-product'),
    //         intro: "Add product."
    //       }
    //     ]
    //   });
    //   intro.start();
    // }
    // startIntro();
  };
});
