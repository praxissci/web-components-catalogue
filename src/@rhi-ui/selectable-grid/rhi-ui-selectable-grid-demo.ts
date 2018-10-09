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

import { html } from '@rhi-ui/html';

export class RhiUiSelectableGridDemo extends HTMLElement {
    public static get is(): string { return 'rhi-ui-selectable-grid-demo'; }

    public getTemplate(): string {
        return html`
            <style>
                :host {
                    display: block;
                }

                .row {
                    display: flex;
                    width: 100%;
                }

                rhi-ui-demo-snippet,
                rhi-ui-markdown-viewer {
                    display: block; /* Fix for MS Edge*/
                    margin-bottom: 48px;
                }

                /* This is also here for MS Edge compatibility */
                rhi-ui-selectable-grid
                rhi-ui-selectable-grid-cell {
                    display: block;
                    flex-grow: 0;
                }
            </style>
            <rhi-ui-markdown-viewer id="readme-viewer" class="readme"></rhi-ui-markdown-viewer>
            <rhi-ui-demo-snippet snippet-title="Default">
                <rhi-ui-selectable-grid>
                    <div class="row">
                        <rhi-ui-selectable-grid-cell value="1" selected></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="2" special></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="3"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="4"></rhi-ui-selectable-grid-cell>
                    </div>
                    <div class="row">
                        <rhi-ui-selectable-grid-cell value="a"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="b"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="c"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="d"></rhi-ui-selectable-grid-cell>
                    </div>
                    <div class="row">
                        <rhi-ui-selectable-grid-cell value="!"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="@"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="#"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="$"></rhi-ui-selectable-grid-cell>
                    </div>
                </rhi-ui-selectable-grid>
            </rhi-ui-demo-snippet>
            <rhi-ui-demo-snippet snippet-title="Styled">
                <style>
                    .theme-wacky {
                        --grid-background-color: black;
                        --grid-color: white;
                        --grid-highlight-background-color: green;
                        --grid-highlight-color: orange;
                        --grid-selected-border-color: red;
                        --grid-special-background-color: blue;
                    }
                </style>
                <rhi-ui-selectable-grid class="theme-wacky">
                    <div class="row">
                        <rhi-ui-selectable-grid-cell value="1" selected></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="2" special></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="3"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="4"></rhi-ui-selectable-grid-cell>
                    </div>
                    <div class="row">
                        <rhi-ui-selectable-grid-cell value="a"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="b"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="c"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="d"></rhi-ui-selectable-grid-cell>
                    </div>
                    <div class="row">
                        <rhi-ui-selectable-grid-cell value="!"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="@"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="#"></rhi-ui-selectable-grid-cell>
                        <rhi-ui-selectable-grid-cell value="$"></rhi-ui-selectable-grid-cell>
                    </div>
                </rhi-ui-selectable-grid>
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

        for (let key in RhiUiSelectableGridDemo.properties) {
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

customElements.define(RhiUiSelectableGridDemo.is, RhiUiSelectableGridDemo);