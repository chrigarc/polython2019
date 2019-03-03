import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class NewsPage extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
        
        header, .content {
		    padding: 40px;
	    }
	    
	       .button {
          width: 100%;
          padding: 12px 20px;
          margin: 8px 0;
          display: inline-block;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        
        .button {
          width: 100%;
          background-color: #4CAF50;
          color: white;
          padding: 14px 20px;
          margin: 8px 0;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
	    
	    .button {
          background-color: #4CAF50;
        }
        
        .button:hover {
          background-color: #45a049;
        }
        
          img{
            width: 100%;
        }
      </style>
              
       <article>
            <header>
                <h2>Noticias</h2>
            </header>
            <template is="dom-if" if="[[user]]">
                <template is="dom-if" if="[[isAdmin]]">
                    <a class="button" href="/#/news-upload">Nuevo</a>
                </template>
            </template>
             
            
            <template is="dom-repeat" items="[[news]]" as="new">
                <img src="https://picsum.photos/800/250?random" alt="News Image">        
                <div class="content">
                    <h3>[[new.title]]</h3>                    
                    <p>[[new.content]]</p>
                </div>
            </template>
        </article>
    `;
    }
    static get properties() {
        return {
            news: {
                type: Object,
                value: [{title:'dummy', content:'random'}]
            },
            user: {
                type: Object,
                value: null
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.handleStart();
    }

    handleStart(){
        const references=firebase.database().ref('news');
        references.on('value', (snapshot)=>{
            const cat=[];
            for(const v in snapshot.val()){
                cat.push(snapshot.val()[v]);
            }
            this.set("news",cat);
        });

    }

    isAdmin(){
        return this.user && this.user.rol === 'admin';
        // return true;
    }
}

window.customElements.define('news-page', NewsPage);
