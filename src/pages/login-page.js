import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../components/login-form'

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class LoginPage extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <login-form></login-form>
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

window.customElements.define('login-page', LoginPage);
