const fs = require('fs-extra');
const version = require('../package.json').version;
const manifestPath = './dist/manifest.json';

exports.editManifest = () => {
  return fs.readJson(manifestPath).then( manifest => {
    manifest.version = version;
    fs.writeJson(manifestPath, manifest);
  }).then(_=>console.log('Postbuild: edit manifest'));
}
