import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ContentEditComponent extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <form action="">
          <input type="radio" name="type_view" value="view" on-click="handleRadio">Ver<br>
          <input type="radio" name="type_view" value="edit" on-click="handleRadio">Editar<br>
      </form>
      <textarea name="" id="" cols="30" rows="10"></textarea>
    `;
    }
    static get properties() {
        return {

        };
    }

    handleRadio(event) {

    }

}

window.customElements.define('content-edit-component', ContentEditComponent);
