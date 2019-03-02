import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../components/registro-form';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class RegistroPage extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <registro-form></registro-form>
      
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'registro page',
            },
        };
    }
}

window.customElements.define('registro-page', RegistroPage);
