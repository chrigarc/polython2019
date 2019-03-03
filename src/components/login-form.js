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
      </style>

        <div class="container">
          <label for="uname"><b>Username</b></label>
          <input id="inputemail" type="text" placeholder="Enter Username" name="uname" value="[[username]]" required>
    
          <label for="psw"><b>Password</b></label>
          <input id="inputpassword" type="password" placeholder="Enter Password" name="psw" value="[[password]]" required>
            
          <button type="button" on-click="_handleLogin">Login</button>
          <label>
            <input type="checkbox" checked="checked" name="remember"> Remember me
          </label>
        </div>
    
        <div class="container" style="background-color:#f1f1f1">
          <button type="button" onclick="" class="cancelbtn">Cancel</button>
          <span class="psw">Forgot <a href="#">password?</a></span>
        </div>
 
    `;
    }
    static get properties() {
        return {

        }
    }

    _handleLogin(event){
        const email = this.shadowRoot.querySelector('#inputemail').value;
        const password = this.shadowRoot.querySelector('#inputpassword').value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) =>{
                this.dispatchEvent(new CustomEvent('notification', {
                    bubbles: true,
                    composed: true,
                    detail: {text: 'Gracias por iniciar sesión'}
                }));
            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(error);
        });
    }
}

window.customElements.define('login-form', LoginForm);
