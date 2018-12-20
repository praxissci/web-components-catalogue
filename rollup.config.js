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

import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser as minify } from "rollup-plugin-terser";

function config({ output = {}, plugins = [] }) {
    return {
        input: 'src/index.ts',
        output: {
            file: 'dist/bundle.js',
            format: 'esm',
            ...output,
        },
        plugins: [
            resolve(),
            typescript(),
            ...plugins
        ]
    }
}

const devBuild = {
    output:{
        sourcemap: true
    }
};

const prodBuild = {
    plugins:[
        minify()
    ]
};

const build = process.env.BUILD === 'production' ? prodBuild : devBuild;

export default config(build)