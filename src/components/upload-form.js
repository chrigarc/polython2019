import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class UploadForm extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
    <form>
      Nombre:<br>
      <input type="text" name="firstname">
      <br>
      Contenido:<br>
      <input type="text" name="content"><br>
      <p>Tipo</p>
      <input type="radio" name="gender" value="male" checked> Archivo<br>
      <input type="radio" name="gender" value="female"> Texto<br>
      
      <select>
         <option value="volvo">Categoria1</option>
         <option value="saab">Categoria2</option>
         <option value="opel">Categoria3</option>
         <option value="audi">Categoria4</option>
       </select>
    </form>
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'upload page',
            },
        };
    }
}

window.customElements.define('upload-form', UploadForm);
