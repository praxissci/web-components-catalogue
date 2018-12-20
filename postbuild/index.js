const copyFiles = require('./copyFiles').copyFiles;
const editServiceWorker = require('./editServiceWorker').editServiceWorker;
const editManifest = require('./editManifest').editManifest;

copyFiles()
.then(editServiceWorker)
.then(editManifest)
.then(_=>console.log('Postbuild: Done postbuild process'));
