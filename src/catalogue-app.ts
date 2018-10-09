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

import '@rhi-isncsci-ui/mobile-sensory';
import '@rhi-ui/demo-snippet';
import '@rhi-ui/logo';
import '@rhi-ui/markdown-viewer';
import '@rhi-ui/selectable-grid';
import './catalogue-icons';
import './catalogue-view404';
import './@rhi-isncsci-ui/mobile-sensory/rhi-isncsci-ui-mobile-sensory-demo';
import './@rhi-ui/demo-snippet/rhi-ui-demo-snippet-demo';
import './@rhi-ui/logo/rhi-ui-logo-demo';
import './@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer-demo';
import './@rhi-ui/selectable-grid/rhi-ui-selectable-grid-demo';
import { template } from './catalogue-app-template';

class CatalogueApp extends HTMLElement {
    public static get is() { return 'catalogue-app'; }

    public static getTemplate(): string {
        return template;
    }

    private componentMap;
    private content: HTMLElement;
    private dialogBackground: HTMLElement;
    private leftDrawer: HTMLElement;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        // When using a bundler, some custom elements may be included and do not need to be requested again.
        this.componentMap = window['preloadedElements'] || {};
        this.requestRender();
    }

    public connectedCallback(): void {
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

    private getIcon(id): Element {
        const icons = document.head.getElementsByTagName('iconset-svg')[0].getElementsByTagName('g');

        for (let i = 0; i < icons.length; i++) {
            if (icons[i].getAttribute('id') === id) {
                return icons[i];
            }
        }
    }

    private requestRender(): void {
        const template = document.createElement('template');
        template.innerHTML = CatalogueApp.getTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    private loadPage(page): void {
        const componentName = page ? page : 'rhi-ui-logo';
        this.content.innerHTML = '<div>loading</div>';

        switch (componentName) {
            case 'rhi-ui-demo-snippet':
                this.content.innerHTML =
                    `<${componentName}-demo file-uri="node_modules/@rhi-ui/demo-snippet/README.md"></${componentName}-demo>`;
                break;
            case 'rhi-ui-logo':
                this.content.innerHTML =
                    `<${componentName}-demo file-uri="node_modules/@rhi-ui/logo/README.md"></${componentName}-demo>`;
                break;
            case 'rhi-ui-markdown-viewer':
                this.content.innerHTML =
                    `<${componentName}-demo file-uri="node_modules/@rhi-ui/markdown-viewer/README.md"></${componentName}-demo>`;
                break;
            case 'rhi-ui-selectable-grid':
                this.content.innerHTML =
                    `<${componentName}-demo file-uri="node_modules/@rhi-ui/selectable-grid/README.md"></${componentName}-demo>`;
                break;
            case 'rhi-isncsci-ui-mobile-sensory':
                this.content.innerHTML =
                    `<${componentName}-demo file-uri="node_modules/@rhi-isncsci-ui/mobile-sensory/README.md"></${componentName}-demo>`;
                break;
            case 'rhi-isncsci-ui-mobile-totals':
                this.loadModule(componentName,
                    `${componentName}-demo`,
                    // `${window['CatalogueAppGlobals'].rootPath}node_modules/@rhi-isncsci-ui/mobile-totals/${componentName}-demo.js`,
                    `${window['CatalogueAppGlobals'].rootPath}node_modules/@rhi-isncsci-ui/mobile-totals/README.md`);
                break;
            default:
                this.content.innerHTML = '<catalogue-view404></catalogue-view404>';
                break;
        }

        window.scrollTo(0, 0);
    }

    private hideLeftDrawer(): void {
        this.leftDrawer.classList.remove('visible');
        this.dialogBackground.classList.remove('visible');
    }

    private loadModule(moduleName, tagName, /*source, */fileUri): void {
        /*if (!this.componentMap[moduleName]) {
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
        }*/

        this.content.innerHTML = `<${tagName} file-uri="${fileUri}"></${tagName}>`;
    }

    private hashChanged(e): void {
        this.hideLeftDrawer();
        this.loadPage(window.location.hash.replace('#', ''));
    }
}

window.customElements.define(CatalogueApp.is, CatalogueApp);