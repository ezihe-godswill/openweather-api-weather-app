self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('static').then(cache => {
            return cache.addAll(['./tempo-weather-web-app',
             './tempo-weather-web-app/css/main.css',
            './tempo-weather-web-app/css/img/tempo_192.png'])
        }).catch(error =>{
            console.log(error);
        })
    );
});


self.addEventListener('fetch', e => {
    // console.log(`Intercepting fetch request for ${e.request.url}`);
    e.respondWith(
        caches.match(e.request).then( response => {
            return response || fetch(e.request);
        })
        // to get the response from the cache if it's cached or the response from the network
    )
})


self.addEventListener('activate', e => {
    self.clients.claim();
});

