/**
 * @license
 * Copyright (c) 2018 Rick Hansen Institute. All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/
'use strict';

/**
 * Add assets list from postbuild process
 * DO NOT MODIFY FOLLOWING LINE (required by postbuild/editServiceWorker.js)
 */
const assets;

/**
 * Set cacheName from postbuild process
 * DO NOT MODIFY FOLLOWING LINE (required by postbuild/editServiceWorker.js)
 */
const cacheName;

function cacheAndFetch(request) {
    caches.open(cacheName)
    .then(cache => cache.add(request))
    return fetch(request);
}

// install all required assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll(assets))
    )
})

// listens for fetch
// if the request exists in the cache then return response from the cache
// otherwise fetch from the server
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || cacheAndFetch(event.request))
    )
})

// cleanup
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => {
                    // Return true if you want to remove this cache,
                    // but remember that caches are shared across
                    // the whole origin
                    return cache !== cacheName;
                }).map(cache => {
                    return caches.delete(cache);
                })
            );
        })
    );
});
