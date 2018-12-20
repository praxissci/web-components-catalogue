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

class CatalogueView404 extends HTMLElement {
    public static get is(): string { return 'catalogue-view404'; }

    private static getTemplate(): string {
        return `
            <style>
                :host {
                display: block;

                padding: 10px 20px;
                }
            </style>

            Oops you hit a 404. <a href="/">Head back to home.</a>
        `;
    }
    
    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        this.requestRender();
    }

    private requestRender(): void {
        const template = document.createElement('template');
        template.innerHTML = CatalogueView404.getTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define(CatalogueView404.is, CatalogueView404);
