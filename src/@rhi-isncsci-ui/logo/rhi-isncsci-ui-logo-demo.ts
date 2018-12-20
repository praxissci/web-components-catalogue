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

import '@rhi-isncsci-ui/logo';
import '@rhi-ui/demo-snippet';
import '@rhi-ui/markdown-viewer';

export class RhiIsncsciUiLogoDemo extends HTMLElement {
    public static get is(): string { return 'rhi-isncsci-ui-logo-demo'; }

    public getTemplate(): string {
        return `
            <style>
                :host {
                    display: block;
                }

                rhi-ui-demo-snippet,
                rhi-ui-markdown-viewer {
                    display: block;
                    margin-bottom: 48px;
                }

                rhi-isncsci-ui-logo {
                    display: block;
                    max-width: 512px;
                }

                rhi-isncsci-ui-logo-small {
                    display: block;
                    max-width: 200px;
                }
            </style>
            <rhi-ui-markdown-viewer id="readme-viewer" class="readme"></rhi-ui-markdown-viewer>
            <rhi-ui-demo-snippet snippet-title="Logo">
                <rhi-isncsci-ui-logo></rhi-isncsci-ui-logo>
                <rhi-isncsci-ui-logo color-palette="grayscale"></rhi-isncsci-ui-logo>
                <rhi-isncsci-ui-logo color-palette="black"></rhi-isncsci-ui-logo>
                <rhi-isncsci-ui-logo color-palette="white" style="background-color:#0072CE;"></rhi-isncsci-ui-logo>
            </rhi-ui-demo-snippet>
            <rhi-ui-demo-snippet snippet-title="Logo small">
                <rhi-isncsci-ui-logo-small></rhi-isncsci-ui-logo-small>
                <rhi-isncsci-ui-logo-small color-palette="grayscale"></rhi-isncsci-ui-logo-small>
                <rhi-isncsci-ui-logo-small color-palette="black"></rhi-isncsci-ui-logo-small>
                <rhi-isncsci-ui-logo-small color-palette="white" style="background-color:#0072CE;"></rhi-isncsci-ui-logo-small>
            </rhi-ui-demo-snippet>
        `;
    }

    public static get properties() {
        return {
            'file-uri': {
                type: String,
                value: ''
            }
        };
    }
    
    public static get observedAttributes(): string[] {
        const attributes: string[] = [];

        for (let key in RhiIsncsciUiLogoDemo.properties) {
            attributes.push(key.toLowerCase());
        }

        return attributes;
    }

    private props: any = {};

    public constructor() {
        super();

        this.attachShadow({mode: 'open'});

        this.requestRender();
    }

    public connectedCallback(): void {
    }

    private requestRender(): void {
        const template: HTMLTemplateElement = <HTMLTemplateElement>document.createElement('template');
        template.innerHTML = this.getTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string, namespace: string): void {
        if (oldValue === newValue) {
            return;
        }

        this.props[name] = newValue;
        
        if (name === 'file-uri' && newValue) {
            const readmeViewer: HTMLElement = this.shadowRoot.getElementById('readme-viewer');

            if (readmeViewer) {
                readmeViewer.setAttribute('file-uri', newValue);
            }
        }
    }
}

customElements.define(RhiIsncsciUiLogoDemo.is, RhiIsncsciUiLogoDemo);