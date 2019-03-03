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
        
        input[type=text]{
            margin-left: 10px;
           }
           
          input[type=text], select {
          width: 100%;
          padding: 12px 20px;
          margin: 8px 0;
          display: inline-block;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        
         .topnav input[type=text] {
            border: 1px solid #ccc;  
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
          
         
          
           input[type=text]{
            margin-left: 0;
           }
        }
        
      </style>
      <div class="topnav" style="padding-bottom: 8px;">
        <input id="inputfilter" type="text" placeholder="Search.."  on-keyup="_filter">
        <select id="inputcategoria" on-change="_filter">
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

    _filter(){
        console.log('buscando');
        const keyword = this.$.inputfilter.value;
        const category = this.$.inputcategoria.value;
        // console.log(keyword + '  -   ' + category);
        this.dispatchEvent(new CustomEvent('searching', {
            bubbles: true,
            composed: true,
            detail: {keyword, category}
        }));
    }
}

window.customElements.define('search-component', SearchComponent);
