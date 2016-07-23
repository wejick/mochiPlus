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

self.addEventListener('notificationclick', function(event) {  
  console.log('On notification click: ');  
  event.notification.close();

  // This looks to see if the current is already open and  
  // focuses if it is  
  event.waitUntil(
    clients.matchAll({  
      type: "window"  
    })
    .then(function(clientList) {  
      for (var i = 0; i < clientList.length; i++) {  
        var client = clientList[i];  
        if (client.url == '/' && 'focus' in client)  
          return client.focus();  
      }  
      if (clients.openWindow) {
        return clients.openWindow('/');  
      }
    })
  );
});
