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

import '@rhi-isncsci-ui/mobile-totals';
import '@rhi-ui/demo-snippet';
import '@rhi-ui/markdown-viewer';
import { html } from '@rhi-ui/html';

export class RhiIsncsciUiMobileTotalsDemo extends HTMLElement {
    public static get is(): string { return 'rhi-isncsci-ui-mobile-totals-demo'; }

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

                rhi-isncsci-ui-mobile-totals {
                    margin: -24px -16px -16px -16px;
                }
            </style>
            <rhi-ui-markdown-viewer bind-to="readme-viewer" class="readme"></rhi-ui-markdown-viewer>
            <rhi-ui-demo-snippet snippet-title="Default">
                <rhi-isncsci-ui-mobile-totals bind-to="totals"
                                              ais="A"
                                              comments="my two cents"
                                              complete-incomplete="C"
                                              dap="NT"
                                              left-lower-motor="C5"
                                              left-motor-nl="T5"
                                              left-motor-nl-zpp="T9"
                                              left-prick="T1"
                                              left-sensory-nl="T3"
                                              left-sensory-nl-zpp="T7"
                                              left-touch="C7"
                                              left-upper-motor="C3"
                                              nli="T6"
                                              right-lower-motor="C4"
                                              right-motor-nl="T4"
                                              right-motor-nl-zpp="T8"
                                              right-prick="C8"
                                              right-sensory-nl="T2"
                                              right-sensory-nl-zpp="T6"
                                              right-touch="C6"
                                              right-upper-motor="C2"
                                              vac="Yes"></rhi-isncsci-ui-mobile-totals>
            </rhi-ui-demo-snippet>
            <rhi-ui-demo-snippet snippet-title="Dark Theme in French">
                <style>
                    .dark-theme {
                        --isncsci-primary-text-color: #FFF;
                        --isncsci-secondary-text-color: #CCC;
                        --isncsci-cell-color: #333;
                        --isncsci-interactive-cell-color: #999;

                        background-color: #000;
                    }
                </style>
                <rhi-isncsci-ui-mobile-totals bind-to="totals-fr"
                                              class="dark-theme"
                                              text-ais="AIS"
                                              text-comments="Observations générales:"
                                              text-complete-incomplete="Complet ou incomplet"
                                              text-dap="PAP"
                                              text-dap-description="Pression anale profonde"
                                              text-left="La gauche"
                                              text-light-touch="Touche légère"
                                              text-lower-motor="Moteur inférieur"
                                              text-motor-nl="NN moteur"
                                              text-motor-nl-zpp="NN Motor ZCP"
                                              text-nli="NNB"
                                              text-option-no="Non"
                                              text-option-nt="NT"
                                              text-option-yes="Oui"
                                              text-pin-prick="Piqûre d'épingle"
                                              text-right="droite"
                                              text-sensory-nl="NN sensoriel"
                                              text-sensory-nl-zpp="NN sensoriel ZCP"
                                              text-upper-motor="moteur supérieur"
                                              text-vac="CAV"
                                              text-vac-description="Contraction anale volontaire">
                </rhi-isncsci-ui-mobile-totals>
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

        // tslint:disable-next-line:forin
        for (const key in RhiIsncsciUiMobileTotalsDemo.properties) {
            attributes.push(key.toLowerCase());
        }

        return attributes;
    }

    private props = {};
    private uiBindings = {
        'readme-viewer': null,
        totals: null,
        'totals-fr': null
    };

    public constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.requestRender();
        this.initializeDeclaredProperties();
        this.updateUiBindings();
    }

    public connectedCallback(): void {
        this.bindToEvents();
    }

    private initializeDeclaredProperties(): void {
        const props: any = RhiIsncsciUiMobileTotalsDemo.properties;

        for (let key in props) {
            this.props[key] = props[key].value;
        }
    }

    private updateUiBindings(): void {
        const elements: NodeListOf<Element> = this.shadowRoot.querySelectorAll('[bind-to]');

        for (let i: number = 0; i < elements.length; i++) {
            const element: Element = elements[i];
            const bindTo: string = element.getAttribute('bind-to');
            this.uiBindings[bindTo] = element;

            const property = RhiIsncsciUiMobileTotalsDemo.properties[bindTo]

            if (property && property.value) {
                if (property.useProperty) {
                    element[property.useProperty] = property.value;
                } else {
                    element.innerHTML = property.value;
                }
            }
        }
    }

    private requestRender(): void {
        const template: HTMLTemplateElement = document.createElement('template') as HTMLTemplateElement;
        template.innerHTML = RhiIsncsciUiMobileTotalsDemo.getTemplate({});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    private bindToEvents(): void {
        const totals = this.uiBindings['totals'];

        totals.addEventListener(
            'interactive-cell-clicked',
            (e: CustomEvent) => { alert(`Interactive cell clicked "${e.detail.name}"`); }
        );

        totals.addEventListener(
            'comments-change',
            (e: CustomEvent) => {
                alert(`Comments changed to  "${e.detail.comments}"`);
                totals.setAttribute('comments', e.detail.comments);
            }
        );

        totals.addEventListener(
            'dap-change',
            (e: CustomEvent) => {
                alert(`Dap changed to  "${e.detail.dap}"`);
                totals.setAttribute('dap', e.detail.dap);
            }
        );

        totals.addEventListener(
            'vac-change',
            (e: CustomEvent) => {
                alert(`Vac changed to  "${e.detail.vac}"`);
                totals.setAttribute('vac', e.detail.vac);
            }
        );

        this.uiBindings['totals-fr']
        .addEventListener(
            'interactive-cell-clicked',
            (e: CustomEvent) => { alert(`Interactive cell clicked "${e.detail.name}"`); }
        );
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string, namespace: string): void {
        if (oldValue === newValue) {
            return;
        }

        this.props[name] = newValue;

        if (name === 'file-uri' && newValue) {
            this.uiBindings['readme-viewer'].setAttribute('file-uri', newValue);
        }
    }
}

customElements.define(RhiIsncsciUiMobileTotalsDemo.is, RhiIsncsciUiMobileTotalsDemo);
