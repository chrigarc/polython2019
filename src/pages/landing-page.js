import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class LandingPage extends PolymerElement {
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
			<h1>¡APRENDER Y PRODUCIR COMO NUNCA!</h1>
		</header>
		
		<img src="http://placekitten.com/800/250" alt="Gatito" />
		
		<div class="content">
		    <p>El secreto para cambiar el mundo es compartir con los demás todo lo que tu ya sabes,cambiar la prespectiva de los demas y abrir la visión dedicando cada segundo a creecer </p>
		</div>
		<img src="http://placekitten.com/800/250" alt="Gatito" />
		<div class="content">
		    <p>Comparte todo lo que para ti tambien es necesario, lo que te ayuda seguro ayudara a alguien </p>
		</div>
		<img src="http://placekitten.com/800/250" alt="Gatito" />
      </article>
		
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'landing page',
            },
        };
    }
}

window.customElements.define('landing-page', LandingPage);
