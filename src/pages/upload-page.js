import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../components/upload-form';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class UploadPage extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <upload-form user="[[user]]"></upload-form>
      
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'upload page',
            },
            user:{
                type: Object,
                value: null
            }
        };
    }
}

window.customElements.define('upload-page', UploadPage);
