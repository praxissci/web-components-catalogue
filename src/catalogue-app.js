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

import '../node_modules/@rhi-ui/logo/rhi-ui-logo.js';
import './catalogue-icons.js';

class CatalogueApp extends HTMLElement {
    static get is() { return 'catalogue-app'; }

    static getTemplate(props) {
        return `
            <style>
                :host {
                    --app-primary-color: #0072CE;
                    --app-secondary-color: #FFF;
                    --app-left-drawer-width: 128px;
                    --app-left-drawer-translate: -128px;
                    --app-top-bar-height: 56px;

                    display: block;
                }

                #dialog-background {
                    background-color: rgba(0, 0, 0, .3);
                    display: none;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    top: 0;
                    z-index: 11;
                }

                #dialog-background.visible {
                    display: block;
                }

                .app-layout .drawer {
                    background-color: rgba(255, 0, 0, .3);
                    bottom: 0;
                    left: 0;
                    position: fixed;
                    top: 0;
                    width: var(--app-left-drawer-width);
                    z-index: 15;
                }

                .app-layout .drawer .bar.top {
                    background-color: #FFF;
                    height: var(--app-top-bar-height);
                    left: 0;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
                
                .app-layout .drawer .content {
                    margin-top: var(--app-top-bar-height);
                    height:100%;
                    overflow: scroll;
                    position: static;
                }

                .app-layout .drawer.left {
                    transform: translate(var(--app-left-drawer-translate));
                    transition: transform 400ms;
                }

                .app-layout .drawer.left.visible {
                    transform: translate(0);
                }
                
                .app-layout .drawer .content .navigation {
                    background-color: blue;
                    height: 1800px;
                }

                .app-layout .content {
                    height: 1800px;
                    position: relative;
                }

                .app-layout .app-bar.top {
                    background-color: var(--app-primary-color);
                    color: var(--app-secondary-color);
                    display: flex;
                    height: var(--app-top-bar-height);
                    left: 0;
                    position: fixed;
                    right: 0;
                    z-index: 10;
                }

                .app-layout .app-bar.top .title {
                    line-height: var(--app-top-bar-height);
                }

                .app-layout .app-bar.top .icons.left {
                    min-height: 24px;
                    width: 72px;
                }

                .app-layout .app-bar.top .icons.left #menu-button {
                    display: inline-block;
                    fill: #FFF;
                    margin: 4px 0 0 1px;
                    padding: 11px 12px 7px 12px;
                }

                .app-layout .app-bar.top .icons.left #menu-button svg {
                    width: 24px;
                }

                @media (min-width: 560px) {
                    .app-layout .content,
                    .app-layout .app-bar.top {
                        left: var(--app-left-drawer-width);
                    }

                    .app-layout .app-bar.top .icons.left #menu-button {
                        display: none;
                    }

                    .app-layout .drawer.left {
                        transform: translate(0);
                    }
                }
            </style>
            <div id="dialog-background"></div>
            <div class="app-layout left-drawer">
                <div class="app-bar top">
                    <div class="icons left">
                        <div id="menu-button">m</div>
                    </div>
                    <div class="title">Custom Elements Catalogue</div>
                </div>
                <div id="left-drawer" class="drawer left">
                    <div class="bar top"><rhi-ui-logo></rhi-ui-logo></div>
                    <div class="content">
                        <div class="navigation">
                            <div>&commat;rhi-ui/</div>
                            <div>
                                <div>demo-snippet</div>
                                <div>logo</div>
                                <div>markdown-viewer</div>
                                <div>selectable-grid</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div><br/><br/><br/><br/><br/><br/>1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
                </div>
            </div>
        `;
    }
    
    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        this.requestRender();
    }

    connectedCallback() {
        const leftDrawer = this.shadowRoot.getElementById('left-drawer');
        
        const dialogBackground = this.shadowRoot.getElementById('dialog-background');
        dialogBackground.addEventListener('click', e => { leftDrawer.classList.remove('visible'); dialogBackground.classList.remove('visible'); });

        const menuButton = this.shadowRoot.getElementById('menu-button');
        menuButton.innerHTML = `<svg viewBox="0 0 24 24">${this.getIcon('menu').innerHTML}</svg>`;
        menuButton.addEventListener('click', e => { leftDrawer.classList.add('visible'); dialogBackground.classList.add('visible'); });
    }

    getIcon(id) {
        const icons = document.head.getElementsByTagName('iconset-svg')[0].getElementsByTagName('g');

        for (let i=0; i<icons.length; i++) {
            if (icons[i].getAttribute('id') === id) {
                return icons[i];
            }
        }
    }

    requestRender() {
        const template = document.createElement('template');
        template.innerHTML = CatalogueApp.getTemplate({});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define(CatalogueApp.is, CatalogueApp);