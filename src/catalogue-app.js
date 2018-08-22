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
import './catalogue-view404.js';
import { html } from './html.js';

class CatalogueApp extends HTMLElement {
    static get is() { return 'catalogue-app'; }

    static getTemplate(props) {
        return html`
            <style>
                :host {
                    --app-primary-color: #0072CE;
                    --app-secondary-color: #FFF;
                    --app-left-drawer-width: 256px;
                    --app-left-drawer-translate: -256px;
                    --app-top-bar-height: 56px;
                    --app-content-top: 72px;

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
                    background-color: #FFF;
                    bottom: 0;
                    left: 0;
                    position: fixed;
                    top: 0;
                    width: var(--app-left-drawer-width, 256px);
                    z-index: 15;
                }

                .app-layout .drawer .bar.top {
                    background-color: #FFF;
                    height: var(--app-top-bar-height, 56px);
                    left: 0;
                    position: absolute;
                    right: 0;
                    top: 0;
                }

                .app-layout .drawer .bar.top rhi-ui-logo {
                    /*0 0 573 168*/
                    display: inline-block;
                    height: 56px;
                    margin-left: 24px;
                    width: 191px;
                }

                .app-layout .drawer .content {
                    margin-top: var(--app-top-bar-height, 56px);
                    height:100%;
                    overflow-y: auto;
                    position: static;
                }

                .app-layout .drawer.left {
                    transform: translate(var(--app-left-drawer-translate, -256px));
                    transition: transform 400ms;
                }

                .app-layout .drawer.left.visible {
                    transform: translate(0);
                }
                
                .app-layout .drawer .navigation {
                    font-size: 14px;
                }
                
                .app-layout .drawer .navigation .section-name,
                .app-layout .drawer .navigation a {
                    line-height: 48px;
                    padding: 0 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .app-layout .drawer .navigation a {
                    color: #666;
                    display: block;
                    transition: background-color 500ms;
                }

                .app-layout .drawer .navigation a:hover {
                    background-color: #EEE;
                }

                .app-layout .drawer .navigation a.current {
                    background-color: #EEE;
                    color: #333;
                }
                
                .app-layout #app-content {
                    padding: var(--app-content-top, 72px) 16px 16px 16px;
                    position: relative;
                }

                .app-layout #app-content {
                    position: relative;
                }

                .app-layout .app-bar.top {
                    background-color: var(--app-primary-color, #0072CE);
                    box-shadow: 0 3px 10px -3px rgba(0, 0, 0, .5);
                    color: var(--app-secondary-color, #FFF);
                    display: flex;
                    height: var(--app-top-bar-height, 56px);
                    left: 0;
                    position: fixed;
                    right: 0;
                    z-index: 10;
                }

                .app-layout .app-bar.top .title {
                    line-height: var(--app-top-bar-height, 56px);
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
                    .app-layout .app-bar.top {
                        left: var(--app-left-drawer-width, 256px);
                    }

                    .app-layout #app-content {
                        margin-left: var(--app-left-drawer-width, 256px);

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
                        <div id="menu-button"></div>
                    </div>
                    <div class="title">Custom Elements Catalogue</div>
                </div>
                <div id="left-drawer" class="drawer left">
                    <div class="bar top"><rhi-ui-logo></rhi-ui-logo></div>
                    <div class="content">
                        <div class="navigation">
                            <div class="section-name">&commat;rhi-ui/</div>
                            <div>
                                <div>
                                    <a class="nav-link" href="#rhi-ui-demo-snippet">demo-snippet</a>
                                </div>
                                <div>
                                    <a class="nav-link" href="#rhi-ui-logo">logo</a>
                                </div>
                                <div>
                                    <a class="nav-link" href="#rhi-ui-markdown-viewer">markdown-viewer</a>
                                </div>
                                <div>
                                    <a class="nav-link" href="#rhi-ui-selectable-grid">selectable-grid</a>
                                </div>
                            </div>
                            <!--<div class="section-name">&commat;rhi-isncsci-ui/</div>
                            <div>
                                <div>
                                    <a class="nav-link" href="#rhi-isncsci-ui-mobile-totals">mobile-totals</a>
                                </div>
                            </div>-->
                        </div>
                    </div>
                </div>
                <div id="app-content"></div>
            </div>
        `;
    }
    
    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        this.componentMap = {};
        this.requestRender();
    }

    connectedCallback() {
        this.leftDrawer = this.shadowRoot.getElementById('left-drawer');
        
        this.dialogBackground = this.shadowRoot.getElementById('dialog-background');
        this.dialogBackground.addEventListener('click', e => this.hideLeftDrawer());

        const menuButton = this.shadowRoot.getElementById('menu-button');
        menuButton.innerHTML = `<svg viewBox="0 0 24 24">${this.getIcon('menu').innerHTML}</svg>`;
        menuButton.addEventListener('click', e => { this.leftDrawer.classList.add('visible'); this.dialogBackground.classList.add('visible'); });

        this.content = this.shadowRoot.getElementById('app-content');

        window.addEventListener('hashchange', e => this.hashChanged(e));
        this.loadPage(window.location.hash.replace('#', ''));
    }

    // initializeNavigation() {
    //     const navLinks = this.shadowRoot.querySelectorAll('.nav-link');

    //     for (let i=0; i<navLinks.length; i++) {
    //         navLinks[i].addEventListener('click', e => this.navLinkClicked(e));
    //     }
    // }

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

    loadPage(page) {
        const componentName = page ? page : 'rhi-ui-logo';
        console.log(componentName);
        this.content.innerHTML = '<div>loading</div>';

        switch (componentName) {
            case 'rhi-ui-demo-snippet':
                this.loadModule(componentName,
                    `${componentName}-demo`,
                    `${window.CatalogueAppGlobals.rootPath}node_modules/@rhi-ui/demo-snippet/${componentName}-demo.js`,
                    `${window.CatalogueAppGlobals.rootPath}node_modules/@rhi-ui/demo-snippet/README.md`);
                break;
            case 'rhi-ui-logo':
                this.loadModule(componentName,
                    `${componentName}-demo`,
                    `${window.CatalogueAppGlobals.rootPath}node_modules/@rhi-ui/logo/${componentName}-demo.js`,
                    `${window.CatalogueAppGlobals.rootPath}node_modules/@rhi-ui/logo/README.md`);
                break;
            case 'rhi-ui-markdown-viewer':    
                this.loadModule(componentName,
                    `${componentName}-demo`,
                    `${window.CatalogueAppGlobals.rootPath}node_modules/@rhi-ui/markdown-viewer/${componentName}-demo.js`,
                    `${window.CatalogueAppGlobals.rootPath}node_modules/@rhi-ui/markdown-viewer/README.md`);
                break;
            case 'rhi-ui-selectable-grid':
                this.loadModule(componentName,
                    `${componentName}-demo`,
                    `${window.CatalogueAppGlobals.rootPath}node_modules/@rhi-ui/selectable-grid/${componentName}-demo.js`,
                    `${window.CatalogueAppGlobals.rootPath}node_modules/@rhi-ui/selectable-grid/README.md`);
                break;
            case 'rhi-isncsci-ui-mobile-totals':
                this.loadModule(componentName,
                    `${componentName}-demo`,
                    `${window.CatalogueAppGlobals.rootPath}node_modules/@rhi-isncsci-ui/mobile-totals/${componentName}-demo.js`,
                    `${window.CatalogueAppGlobals.rootPath}node_modules/@rhi-isncsci-ui/mobile-totals/README.md`);
                break;
            default:
                 this.content.innerHTML = '<catalogue-view404></catalogue-view404>';
                break;
        }

        window.scrollTo(0, 0);
    }

    hideLeftDrawer() {
        this.leftDrawer.classList.remove('visible');
        this.dialogBackground.classList.remove('visible');
    }

    loadModule(moduleName, tagName, source, fileUri) {
        if (!this.componentMap[moduleName]) {
            // ToDo: The presence on code of the import method makes Edge throw an automatic exception 
            //if (/Edge\/\d+/i.test(navigator.appVersion)) {
                const script = document.createElement('script');
                script.setAttribute('type', 'module');
                script.setAttribute('src', source);
                document.body.appendChild(script);
            //} else {
            //    import(source);
            //}
            
            this.componentMap[moduleName] = true;
        }

        this.content.innerHTML = `<${tagName} file-uri="${fileUri}"></${tagName}>`;
    }

    hashChanged(e) {
        this.hideLeftDrawer();
        this.loadPage(window.location.hash.replace('#', ''));
    }
}

window.customElements.define(CatalogueApp.is, CatalogueApp);