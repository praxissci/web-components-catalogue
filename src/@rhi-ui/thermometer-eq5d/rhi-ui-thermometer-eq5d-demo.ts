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

import '@rhi-ui/thermometer-eq5d';

export class RhiUiThermometerEq5dDemo extends HTMLElement {
    public static get is(): string { return 'rhi-ui-thermometer-eq5d-demo'; }

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

                input[type="number"] {
                    display: block;
                    font-size: 24px;
                    margin: 0 auto;
                    padding: 4px 8px;
                    text-align: center;
                    width: 64px;
                }
            </style>
            <rhi-ui-markdown-viewer id="readme-viewer" class="readme"></rhi-ui-markdown-viewer>
            <rhi-ui-demo-snippet snippet-title="Default">
                <rhi-ui-thermometer-eq5d
                    end="100"
                    id="thermometer"
                    start="0"
                    steps="10"
                    value="20"></rhi-ui-thermometer-eq5d>
                <div class="value-container">
                    <input type="number" id="value" value="20"/>
                </div>
                <style>
                    #thermometer {
                        margin: 0 auto 12px auto;
                        width: 80px;
                    }
                </style>
                <script>
                    const thermometer = document.getElementById('thermometer');
                    document.getElementById('value')
                        .addEventListener('change', (e) => {
                            thermometer.setAttribute('value', e.srcElement.value);
                        });
                </script>
            </rhi-ui-demo-snippet>
            <rhi-ui-demo-snippet snippet-title="Logo small">
                <rhi-ui-thermometer-eq5d
                    end="80"
                    id="thermometer-dark"
                    start="-10"
                    steps="10"
                    value="20"></rhi-ui-thermometer-eq5d>
                <div class="value-container">
                    <input type="number" id="value-dark" value="20"/>
                </div>
                <style>
                    #thermometer-dark {
                        --thermometer-bar-color: #666;
                        --thermometer-border-color: red;
                        --thermometer-box-shadow-color: rgba(0, 0, 0, .5);
                        --thermometer-main-bar-color: #999;
                        --thermometer-mercury-bar-color: gold;
                        --thermometer-mercury-mix-blend-mode: overlay;
                        --thermometer-grade-color: #CCC;
                        background-color: #333;
                        margin: 0 auto 12px auto;
                        width: 80px;
                    }
                </style>
                <script>
                    console.log('darker');
                    const thermometerDark = document.getElementById('thermometer-dark');
                    document.getElementById('value-dark')
                        .addEventListener('change', (e) => {
                            thermometerDark.setAttribute('value', e.srcElement.value);
                        });
                </script>
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

        for (let key in RhiUiThermometerEq5dDemo.properties) {
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
        const thermometer: HTMLElement = this.shadowRoot.getElementById('thermometer');
        const value: HTMLInputElement = this.shadowRoot.getElementById('value') as HTMLInputElement;
        const thermometerDark: HTMLElement = this.shadowRoot.getElementById('thermometer-dark');
        const valueDark: HTMLInputElement = this.shadowRoot.getElementById('value-dark') as HTMLInputElement;

        value
        .addEventListener('change', (e: Event) => {
            thermometer.setAttribute('value', value.value);
        });

        valueDark
        .addEventListener('change', (e: Event) => {
            thermometerDark.setAttribute('value', valueDark.value);
        });
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

customElements.define(RhiUiThermometerEq5dDemo.is, RhiUiThermometerEq5dDemo);