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
  $routeProvider.when('/detail',{templateUrl:'detail.html', reloadOnSearch: false});
});
var root = function() {
  var isLocalhost = window.location.href.indexOf('localhost') > -1;
  if(isLocalhost) {
    return 'https://hackathon.tokopedia.com/'
  } else {
    return '/';
  }  
}
