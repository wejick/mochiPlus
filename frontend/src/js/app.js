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

function registerCallback(registrationId) {
  if (chrome.runtime.lastError) {
    // When the registration fails, handle the error and retry the
    // registration later.
    return;
  }

  // Send the registration token to your application server.
  sendRegistrationId(function(succeed) {
    // Once the registration token is received by your server,
    // set the flag such that register will not be invoked
    // next time when the app starts up.
    if (succeed)
      chrome.storage.local.set({registered: true});
  });
}

function sendRegistrationId(callback) {
  // Send the registration token to your application server
  // in a secure way.
}

chrome.runtime.onStartup.addListener(function() {
  chrome.storage.local.get("registered", function(result) {
    // If already registered, bail out.
    if (result["registered"]){
      console.log("registered!");
      return;
    }

    // Up to 100 senders are allowed.
    var senderIds = 106924429812;
    chrome.gcm.register(senderIds, registerCallback);
  });
});


chrome.gcm.onMessage.addListener(function(message) {
  console.log("success add listener");
});

chrome.gcm.onMessage.addListener(function(message) {
  // A message is an object with a data property that
  // consists of key-value pairs.
  console.log(message);
});