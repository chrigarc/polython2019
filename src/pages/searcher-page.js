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
        
              header, .content {
		    padding: 40px;
	    }
      </style>
        <article>
            <header>
                <h2>Biblioteca</h2>
            </header>
            <img src="http://placekitten.com/800/250" alt="Gatito" />
            <div class="content">
                <search-component categories="[[categorias]]"></search-component>
            </div>
            
            <div class="content">
                <resources-list categories="[[categorias]]" user="[[user]]"></resources-list>
            </div>            
        </article>
      
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'searcher page',
            },
            user: {
                type: Object,
                value: null
            },
            categorias:{
                type: Array,
                value: [],
            },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.handleStart();
    }
    handleStart(){
        const references=firebase.database().ref('categories');
        references.on('value', (snapshot)=>{
            const cat=[];
            for(const v in snapshot.val()){
                cat.push(snapshot.val()[v]);
            }
            this.set("categorias",cat);
        });

    }
}

window.customElements.define('searcher-page', SearcherPage);
