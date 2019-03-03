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
      </style>
              
       <article>
            <header>
                <h2>Noticias</h2>
            </header>
            
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
            }
        };
    }
}

window.customElements.define('news-page', NewsPage);
