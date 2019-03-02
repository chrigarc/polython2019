import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../components/search-component';
import '../components/resources-list'

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SearcherPage extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <search-component></search-component>
      <resources-list></resources-list>
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'searcher page',
            },
        };
    }
}

window.customElements.define('searcher-page', SearcherPage);
