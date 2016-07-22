// it's not real sww middleware because sww doesn't handle support push event
var pushMiddleWare = {
  onInstall:function() {
    console.log('Installed from pushMiddleWare');
  },
}

// the real push handler here
self.addEventListener('push', function(event) {
  console.log('Push message received', event);
  // TODO
});
