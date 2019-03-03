import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class LoginForm extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
        
         header, .content {
		    padding: 40px;
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
        
        input[type=password], select {
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
        
        input[type=submit]:hover, button:hover {
          background-color: #45a049;
        }
        
        img{
            width: 100%;
        }
      </style>

    <article>
		<header>
			<h2>Acceso</h2>
		</header>
		<img src="http://placekitten.com/800/250" alt="Gatito" />
		<form on-submit="_handleLogin">
            <div class="content">
              <label for="uname"><b>Username</b></label>
              <input id="inputemail" type="text" placeholder="Enter Username" name="uname" value="[[username]]" required>
        
              <label for="psw"><b>Password</b></label>
              <input id="inputpassword" type="password" placeholder="Enter Password" name="psw" value="[[password]]" required>
                
              <button type="submit">Login</button>         
            </div>		    
        </form>
		
    </article>
        <!--<div class="container">-->
          <!--<label for="uname"><b>Username</b></label>-->
          <!--<input id="inputemail" type="text" placeholder="Enter Username" name="uname" value="[[username]]" required>-->
    <!---->
          <!--<label for="psw"><b>Password</b></label>-->
          <!--<input id="inputpassword" type="password" placeholder="Enter Password" name="psw" value="[[password]]" required>-->
            <!---->
          <!--<button type="button" on-click="_handleLogin">Login</button>-->
          <!--<label>-->
            <!--<input type="checkbox" checked="checked" name="remember"> Remember me-->
          <!--</label>-->
        <!--</div>-->
    <!---->
        <!--<div class="container" style="background-color:#f1f1f1">-->
          <!--<button type="button" onclick="" class="cancelbtn">Cancel</button>-->
          <!--<span class="psw">Forgot <a href="#">password?</a></span>-->
        <!--</div>-->
 
    `;
    }
    static get properties() {
        return {

        }
    }

    _handleLogin(event){
        event.preventDefault();
        const email = this.shadowRoot.querySelector('#inputemail').value;
        const password = this.shadowRoot.querySelector('#inputpassword').value;
        this.shadowRoot.querySelector('#inputemail').value = '';
        this.shadowRoot.querySelector('#inputpassword').value = '';
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) =>{
                this.dispatchEvent(new CustomEvent('notification', {
                    bubbles: true,
                    composed: true,
                    detail: {text: 'Gracias por iniciar sesión'}
                }));
            })
            .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(error);
            this.dispatchEvent(new CustomEvent('notification', {
                bubbles: true,
                composed: true,
                detail: {text: 'Datos invalidos'}
            }));
        });
    }
}

window.customElements.define('login-form', LoginForm);
