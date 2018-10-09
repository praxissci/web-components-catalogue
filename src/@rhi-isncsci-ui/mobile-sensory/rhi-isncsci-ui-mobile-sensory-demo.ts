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

export class RhiIsncsciUiMobileSensoryDemo extends HTMLElement {
    public static getTemplate(props): string {
        return html`
            <!-- shadow DOM for your element -->
            <!-- RHI Blue: #007DC2 -->
            <style>
                :host {
                    display: block;
                }

                rhi-ui-demo-snippet,
                rhi-ui-markdown-viewer {
                    display: block;
                    margin-bottom: 48px;
                }

                .container {
                    height: 536px;
                    margin: -16px;
                    position: relative;
                }

                .container rhi-isncsci-ui-mobile-sensory {
                    bottom: 0;
                    overflow: hidden;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                }
            </style>
            <rhi-ui-markdown-viewer bind-to="readme-viewer" class="readme"></rhi-ui-markdown-viewer>
            <rhi-ui-demo-snippet class="snippet default" snippet-title="Default">
                <div class="container">
                    <rhi-isncsci-ui-mobile-sensory bind-to="sensory"
                                                   dermatome="C2"
                                                   nl="int"
                                                   total="56"></rhi-isncsci-ui-mobile-sensory>
                </div>
            </rhi-ui-demo-snippet>
            <rhi-ui-demo-snippet class="snippet default" snippet-title="Motor Top">
                <div class="container">
                    <rhi-isncsci-ui-mobile-sensory bind-to="motor"
                                                   dermatome="C6"
                                                   nl="int"
                                                   total="56"
                                                   input-type="motor-top"></rhi-isncsci-ui-mobile-sensory>
                </div>
            </rhi-ui-demo-snippet>
        `;
    }

    public static get observedAttributes(): string[] {
        const attributes: string[] = [];

        // tslint:disable-next-line:forin
        for (const key in RhiIsncsciUiMobileSensoryDemo.properties) {
            attributes.push(key.toLowerCase());
        }

        return attributes;
    }

    private props = {};
    private motorValues = {};
    private sensoryValues = {};
    private uiBindings = {
        motor: null,
        'readme-viewer': null,
        sensory: null
    };

    public constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.requestRender();
    }

    public static get is(): string { return 'rhi-isncsci-ui-mobile-sensory-demo'; }

    public static get properties() {
        return {
            'file-uri': {
                type: String,
                value: ''
            }
        };
    }

    public connectedCallback(): void {
        this.uiBindings;
        const elements: NodeListOf<Element> = this.shadowRoot.querySelectorAll('[bind-to]');

        for (let i: number = 0; i < elements.length; i++) {
            const element: Element = elements[i];
            const bindTo: string = element.getAttribute('bind-to');
            this.uiBindings[bindTo] = element;
        }

        this.uiBindings['readme-viewer'].setAttribute('file-uri', this.props['file-uri']);
        
        // MOTOR
        this.uiBindings.motor
        .addEventListener('dermatome-selected', (e: CustomEvent) => this.dermatomeSelected(e, this.uiBindings.motor));
        
        this.uiBindings.motor
        .addEventListener('dermatome-score-changed', (e: CustomEvent) => this.dermatomeScoreChanged(e, this.uiBindings.motor));
        
        this.uiBindings.motor
        .addEventListener('non-sci-impairment-reason-changed', (e: CustomEvent) => this.nonSciImpairmentReasonChanged(e, this.uiBindings.motor));
        
        this.uiBindings.motor
        .addEventListener('non-sci-impairment-comments-changed', (e: CustomEvent) => this.nonSciImpairmentCommentsChanged(e, this.uiBindings.motor));
        
        this.uiBindings.motor
        .addEventListener('propagate-value-changed', (e: CustomEvent) => alert(`Propagate value: ${e.detail.propagateValue}`));
        

        // SENSORY
        this.uiBindings.sensory
        .addEventListener('dermatome-selected', (e: CustomEvent) => this.dermatomeSelected(e, this.uiBindings.sensory));
        
        this.uiBindings.sensory
        .addEventListener('dermatome-score-changed', (e: CustomEvent) => this.dermatomeScoreChanged(e, this.uiBindings.sensory));
        
        this.uiBindings.sensory
        .addEventListener('non-sci-impairment-reason-changed', (e: CustomEvent) => this.nonSciImpairmentReasonChanged(e, this.uiBindings.sensory));
        
        this.uiBindings.sensory
        .addEventListener('non-sci-impairment-comments-changed', (e: CustomEvent) => this.nonSciImpairmentCommentsChanged(e, this.uiBindings.sensory));
        
        this.uiBindings.sensory
        .addEventListener('propagate-value-changed', (e: CustomEvent) => alert(`Propagate value: ${e.detail.propagateValue}`));
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string, namespace: string): void {
        if (oldValue === newValue) {
            return;
        }

        this.props[name] = newValue;

        if (name === 'file-uri' && newValue) {
            const readmeViewer: HTMLElement = this.uiBindings['file-uri'];

            if (readmeViewer) {
                readmeViewer.setAttribute('file-uri', newValue);
            }
        }
    }

    private requestRender(): void {
        const template: HTMLTemplateElement = document.createElement('template') as HTMLTemplateElement;
        template.innerHTML = RhiIsncsciUiMobileSensoryDemo.getTemplate({});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    private getDermatome(name: string, inputType: string): { name: string, score: string, reason: string, comments: string } {
        const target = inputType === 'motor-top' ? this.motorValues : this.sensoryValues;
        let dermatome = target[name];

        if (!dermatome) {
            dermatome = {
                name: name,
                score: '',
                reason: '',
                comments: ''
            };

            target[name] = dermatome;
        }

        return dermatome;
    }

    private dermatomeSelected(e: CustomEvent, target: Element): boolean {
        const dermatome = this.getDermatome(e.detail.dermatome, target.getAttribute('input-type'));

        target.setAttribute('dermatome', e.detail.dermatome);
        target.setAttribute('dermatome-score', dermatome.score);
        target.setAttribute('non-sci-impairment-reason', dermatome.reason);
        target.setAttribute('non-sci-impairment-comments', dermatome.comments);
        return true;
    }

    private dermatomeScoreChanged(e: CustomEvent, target: Element): boolean {
        const dermatome = this.getDermatome(e.detail.dermatome, target.getAttribute('input-type'));
        dermatome.score = e.detail.score;
        target.setAttribute('dermatome-score', e.detail.score);
        
        return true;
    }

    private nonSciImpairmentReasonChanged(e: CustomEvent, target: Element): boolean {
        const dermatome = this.getDermatome(e.detail.dermatome, target.getAttribute('input-type'));
        dermatome.reason = e.detail.reason;
        target.setAttribute('non-sci-impairment-reason', e.detail.reason);
        
        return true;
    }

    private nonSciImpairmentCommentsChanged(e: CustomEvent, target: Element): boolean {
        const dermatome = this.getDermatome(e.detail.dermatome, target.getAttribute('input-type'));
        dermatome.comments = e.detail.comments;
        target.setAttribute('non-sci-impairment-comments', e.detail.comments);
        
        return true;
    }
}

customElements.define(RhiIsncsciUiMobileSensoryDemo.is, RhiIsncsciUiMobileSensoryDemo);