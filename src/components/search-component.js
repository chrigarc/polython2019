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
        
        .topnav {
          overflow: hidden;
          background-color: #e9e9e9;
        }
        
        .topnav a {
          float: left;
          display: block;
          color: black;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
          font-size: 17px;
        }
        
        .topnav a:hover {
          background-color: #ddd;
          color: black;
        }
        
        .topnav a.active {
          background-color: #2196F3;
          color: white;
        }
        
        .topnav input[type=text] {
          padding: 6px;
          margin-top: 8px;
          margin-right: 16px;
          border: none;
          font-size: 17px;
        }
        
        @media screen and (max-width: 600px) {
          .topnav a, .topnav input[type=text] {
            float: none;
            display: block;
            text-align: left;
            width: 100%;
            margin: 0;
            padding: 14px;
          }
          
          .topnav input[type=text] {
            border: 1px solid #ccc;  
          }
        }
        
      </style>
      <div class="topnav">
        <input type="text" placeholder="Search..">
        <select id="inputcategoria">
           <template is="dom-repeat" items="[[categories]]" as="categoria">
            <option value="[[categoria.id]]">[[categoria.name]]</option>
           </template>
       </select>
      </div>
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'login page',
            },
            categories: {
                type: Array,
                value: []
            }
        };
    }
}

window.customElements.define('search-component', SearchComponent);
