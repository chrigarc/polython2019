import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/marked-element/marked-element';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ContentComponent extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <marked-element markdown="[[content.content]]">
        <div slot="markdown-html"></div>     
      </marked-element>
    `;
    }
    static get properties() {
        return {
            content: {
                type: Object,
                value: {content:'Cargando...'}
            }
        };
    }
}

window.customElements.define('content-component', ContentComponent);
