// it's not real sww middleware because sww doesn't handle support push event
var pushMiddleWare = {
  onInstall:function() {
    console.log('Installed from pushMiddleWare');
  },
}

// the real push handler here
self.addEventListener('push', function(event) {
  console.log('Received a push message', event);
  event.waitUntil(  
    self.registration.showNotification("Up+", {  
      body: "Your product has been uploaded",
      icon: 'images/launcher-icon-2x.png'
    })  
  );
});
