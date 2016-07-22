angular.module('Up+', [
  'ngRoute',
  'mobile-angular-ui',
  'Up+.controllers.Main',
  'Up+.controllers.Products',
  'Up+.controllers.Upload',
  'Up+.controllers.Detail',
  'ng-file-model'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'products.html',  reloadOnSearch: false});
  $routeProvider.when('/products',{templateUrl:'products.html', reloadOnSearch: false});
  $routeProvider.when('/upload',{templateUrl:'upload.html', reloadOnSearch: false});
  $routeProvider.when('/detail/:productId',{templateUrl:'detail.html', reloadOnSearch: false});
});
var root = function() {
  var isLocalhost = window.location.href.indexOf('localhost') > -1 || window.location.href.indexOf('local');
  if(isLocalhost) {
    return 'https://hackathon.tokopedia.com/'
  } else {
    return '/';
  }  
}
