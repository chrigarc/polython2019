import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ContactPage extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
          header, .content {
		    padding: 40px;
	    }
	    
	    input[type=text], select, textarea {
          width: 100%;
          padding: 12px 20px;
          margin: 8px 0;
          display: inline-block;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        
       
        
        input[type=email], select {
          width: 100%;
          padding: 12px 20px;
          margin: 8px 0;
          display: inline-block;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        
        input[type=submit], button {
          width: 100%;
          background-color: #4CAF50;
          color: white;
          padding: 14px 20px;
          margin: 8px 0;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        input[type=submit]:hover, button {
          background-color: #45a049;
        }
        
          img{
            width: 100%;
        }
      </style>
      
        <article>
            <header>
                <h2>Registro</h2>
            </header>
            <img src="https://picsum.photos/800/250?random" alt="Gatito" />
            <form on-submit="handleSubmit">
                <div class="content">
                  <label for="name"><b>Name</b></label>
                  <input id="field_name" type="text" placeholder="Enter Name" name="name"  required>
                
                  <label for="uname"><b>Email</b></label>
                  <input id="field_email" type="email" placeholder="Enter a valid email" name="uname" required>                    
                  
                  <label for="uname"><b>Mensaje</b></label>
                  <textarea id="field_message" type="email" placeholder="Enter text" name="message" required></textarea>                    
                    
                  <button type="submit" >Login</button>
                </div>
            </form>            
        </article>
    `;
    }
    static get properties() {
        return {

        };
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('Submit');
        const name = this.shadowRoot.querySelector('#field_name').value;
        const email = this.shadowRoot.querySelector('#field_email').value;
        const content = this.shadowRoot.querySelector('#field_message').value;
        this.shadowRoot.querySelector('#field_name').value = '';
        this.shadowRoot.querySelector('#field_email').value = '';
        this.shadowRoot.querySelector('#field_message').value = '';
        firebase.database().ref('contact-message/').push({
            email: email,
            content: content,
            name: name
        });
        this.dispatchEvent(new CustomEvent('notification', {
            bubbles: true,
            composed: true,
            detail: {text: 'Tu mensaje ha sido enviado'}
        }));
    }
}

window.customElements.define('contact-page', ContactPage);
