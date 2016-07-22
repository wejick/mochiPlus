angular.module('Up+', [
  'ngRoute',
  'mobile-angular-ui',
  'Up+.controllers.Main',
  'Up+.controllers.Products',
  'Up+.controllers.Upload'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
  $routeProvider.when('/products',{templateUrl:'products.html', reloadOnSearch: false});
  $routeProvider.when('/upload',{templateUrl:'upload.html', reloadOnSearch: false});
});
