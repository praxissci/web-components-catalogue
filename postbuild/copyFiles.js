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
const fs = require('fs-extra');

filter_js = (src) => {
    return fs.lstatSync(src).isDirectory() || src.endsWith('.js');
}

filter_md = (src) => {
    return src.endsWith('.md');
}

exports.copyFiles = () => {
    const customElementPaths = [
        '@rhi-isncsci-ui/logo',
        '@rhi-isncsci-ui/mobile-sensory',
        '@rhi-isncsci-ui/mobile-totals',
        '@rhi-ui/demo-snippet',
        '@rhi-ui/logo',
        '@rhi-ui/markdown-viewer',
        '@rhi-ui/selectable-grid',
        '@rhi-ui/thermometer-eq5d',
    ];

    const customElementPromises = 
        customElementPaths.map((path) =>  fs.copy(`./node_modules/${path}/README.md`, `./dist/${path}/README.md`));

    return Promise.all(
        [
            fs.copy('./assets', './dist'),
            fs.copy('./node_modules/@webcomponents/webcomponentsjs', './dist/webcomponentsjs', { filter: filter_js })
        ]
        .concat(customElementPromises)
    ).then(_ => console.log('Postbuild: copy files'));
};
