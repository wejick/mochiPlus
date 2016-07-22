importScripts('./lib/workerlib.min.js');
importScripts('./lib/sww.js');
// Cache storage name
var CACHE_NAME = 'mochi_cache_v1';
var QUEUE_NAME = 'mochi_queue_v1';
// url to be Cached
var urlsToCache = [
  '/',
  '/css/app.min.css',
  '/js/app.min.js',
  '/images/sprite-new-mobile-3.png',
  '/images/sprite-unify.png'
];

var lifeCycleWare = {
  onInstall: function() {
    console.log('sw Installed');
    return Promise.resolve();
  },
  onActivate: function(evt) {
    console.log('sw Activated');
  },
  onMessage: function(evt) {
    console.log('Got messgae '+evt);
  }
};

var root = (function() {
  var tokens = (self.location + '').split('/');
  tokens[tokens.length - 1] = '';
  return tokens.join('/');
})();

var worker = new ServiceWorkerWare();

var offlineResponse = JSON.stringify([{
  text: 'Offline.',
  type: 'warning'
}]);

//use lifeCycleWare to handle sw lifeCycle
worker.use(lifeCycleWare);
worker.use(pushMiddleWare);

//use StaticCacher to caches initial resource
//the resource would be gathered at oninstall 
//worker.use(new self.StaticCacher(urlsToCache));

// Handles offline resources saved by the StaticCacher middleware
//worker.use(new self.SimpleOfflineCache());

worker.post(root,tryOrFallback(new Response(offlineResponse,{headers:{ 'Content-Type': 'application/json' } })));

function tryOrFallback(fallbackResponse) {
  return function(req,res){
    if(navigator.onLine){
      console.log('lanjut');
      return replayQueue().then(function(){
         return fetch(req)
      });
    }
    console.log('offline');
    return enqueue(req).then(function(){
      return fallbackResponse.clone();
    });
  };
}

function enqueue(request) {
    return serialize(request).then(function(serialized){
      localforage.getItem(QUEUE_NAME).then(function(queue) {
        queue = queue || [];
        queue.push(serialized);
        return localforage.setItem(QUEUE_NAME,queue).then(function(){
          console.log(serialized.method, serialized.url, 'enqueued!');
        });
      });
    });
}

function replayQueue() {
  return localforage.getItem(QUEUE_NAME).then(function(queue){
    queue = queue || [];

    // nothing in queue
    if(!queue.length) {
      return Promise.resolve();
    }

    console.log('sending ',queue.length, 'requests');
    return sendInOrder(queue).then(function(){
      //flushing cache
      return localforage.setItem(QUEUE_NAME,[]);
    })
  });
}

function sendInOrder(requests) {
  var sending = requests.reduce(function(prevPromise, serialized) {
    console.log('Sending', serialized.method, serialized.url);
    return prevPromise.then(function() {
      return deserialize(serialized).then(function(request) {
        return fetch(request);
      });
    });
  }, Promise.resolve());
  return sending;
}

function serialize(request) {
  var headers = {};

  for (var entry of request.headers.entries()) {
    headers[entry[0]] = entry[1];
  }
  var serialized = {
    url: request.url,
    headers: headers,
    method: request.method,
    mode: request.mode,
    credentials: request.credentials,
    cache: request.cache,
    redirect: request.redirect,
    referrer: request.referrer
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return request.clone().text().then(function(body) {
      serialized.body = body;
      return Promise.resolve(serialized);
    });
  }
  return Promise.resolve(serialized);
}

function deserialize(data) {
  return Promise.resolve(new Request(data.url, data));
}

self.addEventListener('online',replayQueue());

worker.init();
