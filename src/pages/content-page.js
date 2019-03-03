import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../components/content-component';
import '../components/content-edit-component';


/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ContentPage extends PolymerElement {
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
                <h2>[[content.name]]</h2>
            </header>
            <img src="https://picsum.photos/800/250?random" alt="Resource Image" />
            <div class="content">
                <content-component content="[[content]]"></content-component>      
            </div>
            <div class="content">
                <a href="/#/searcher">Regresar</a>
            </div>
        </article>
            
      
      <!--<content-edit-component></content-edit-component>-->
      
    `;
    }
    static get properties() {
        return {
            content: {
                type: String,
                value: 'content page',
            },
        };
    }
}

window.customElements.define('content-page', ContentPage);
