import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../components/content-component';
import '../components/content-edit-component';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ContentPage extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <content-component></content-component>
      <content-edit-component></content-edit-component>
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'content page',
            },
        };
    }
}

window.customElements.define('content-page', ContentPage);
