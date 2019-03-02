import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SearchComponent extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'login page',
            },
        };
    }
}

window.customElements.define('search-component', SearchComponent);
