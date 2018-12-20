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

/**
 * This file should run after have been `service-worker.js` copied over to the `dist/` folder.
 * This script will replace the constants `assets` and `cacheName` in the `service-worker.js` with
 * assets in `dist/` to cache and a `cacheName` with appropriate version defined in `package.json`
 */

// Get current version from package.json
const fs = require('fs');
const path = require('path');
const version = require('../package.json').version;
const appRoot = 'dist/';

const PATH_TO_SERVICE_WORKER = 'dist/service-worker.js';

// walkSync code modified from https://gist.github.com/kethinov/6658166
// ignores **/webcomponentjs/**/* as modern browsers should support customElements API
// **/webcomponentjs/**/* will be cached as defined in `service-worker.js` as the if client make a request to use the polyfill
const walkSync = (dir, filePaths) => {
  const files = fs.readdirSync(dir);
  filePaths = filePaths || [];
  files.forEach(function(file) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if(!filePath.includes('webcomponentsjs')){
        filePaths = walkSync(filePath, filePaths);
      }
    }
    else {
      filePaths.push(filePath.replace(/\\/g,"/").replace(appRoot,''));
    }
  });
  return filePaths;
};

const openFile = (path) => {
  return new Promise((resolve,reject)=>{
    fs.open(path,'r+', (err,fd)=>{
      if (err) throw err;
      resolve(fd);
    });
  })
}

const readFile = (fd) => {
  return new Promise((resolve,reject)=>{
    fs.readFile(fd, 'utf8', function(err, contents) {
      if (err) throw err;
      resolve({fd,contents});
    });
  })
}

const replaceConstants = (data,assetsCode,cacheNameCode) => {
  return new Promise((resolve,reject)=>{
    const fd = data.fd;
    const modifiedScript = data.contents.replace("const assets;",assetsCode).replace('const cacheName;',cacheNameCode);
    fs.writeFile(fd, modifiedScript, 'utf8', (err) => {
      if (err) throw err;
      resolve(fd);
    });
  })
}

const closeFile = (fd) => {
  return new Promise((resolve,reject)=>{
    fs.close(fd, (err) => {
      if (err) throw err;
      resolve();
    });
  })
}

// open, read, replace constants, write, then close service-worker.js
const editProdServiceWorker = () =>{
  const assets = walkSync(appRoot,['/']).filter(path=>path!=='service-worker.js');
  const assetsCode = `const assets = ${JSON.stringify(assets)};`;
  const cacheNameCode = `const cacheName = 'rhi-wcc-${version}';`;

  return new Promise(resolve=>{
    openFile(PATH_TO_SERVICE_WORKER)
    .then(readFile)
    .then(data=>replaceConstants(data,assetsCode,cacheNameCode))
    .then(closeFile)
    .then(()=>resolve(console.log('Postbuild: edit service worker')))
  })
}

const editDevServiceWorker = () =>{
  return new Promise((resolve,reject)=>{
    const modifiedScript = "console.log('dev build has empty service worker')";
    fs.writeFile(PATH_TO_SERVICE_WORKER, modifiedScript, 'utf8', (err) => {
      if (err) throw err;
      resolve(console.log('Postbuild: empty service worker'));
    });
  })
}

exports.editServiceWorker = process.env.BUILD === 'production' ? editProdServiceWorker : editDevServiceWorker;





