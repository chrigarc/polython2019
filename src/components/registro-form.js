import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class RegistroForm extends PolymerElement {
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
        
        input[type=submit]:hover, button:hover {
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
            <img src="https://picsum.photos/800/250?random" alt="Random Image" />
            <form on-submit="_handleRegister">
                <div class="content">
                     <label for="name"><b>Name</b></label>
                  <input id="field_name" type="text" placeholder="Enter Name" name="name" value="[[name]]" required>
                
                  <label for="uname"><b>Email</b></label>
                  <input id="field_username" type="email" placeholder="Enter a valid email" name="uname" value="[[username]]" required>
            
                  <label for="psw"><b>Password</b></label>
                  <input id="field_password" type="password" placeholder="Enter Password" name="psw" value="[[password]]" required>
                    
                  <button type="submit" >Registrar</button>
                </div>
            </form>
            
		</article>

        <!--<div class="container">-->
          <!--<label for="name"><b>Name</b></label>-->
          <!--<input id="field_name" type="text" placeholder="Enter Name" name="name" value="[[name]]" required>-->
        <!---->
          <!--<label for="uname"><b>Username</b></label>-->
          <!--<input id="field_username" type="email" placeholder="Enter Username" name="uname" value="[[username]]" required>-->
    <!---->
          <!--<label for="psw"><b>Password</b></label>-->
          <!--<input id="field_password" type="password" placeholder="Enter Password" name="psw" value="[[password]]" required>-->
            <!---->
          <!--<button type="button" on-click="_handleRegister">Login</button>-->
          <!--<label>-->
            <!--<input type="checkbox" checked="checked" name="remember"> Remember me-->
          <!--</label>-->
        <!--</div>-->
    <!---->
        <!--<div class="container" style="background-color:#f1f1f1">-->
          <!--<button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>-->
          <!--<span class="psw">Forgot <a href="#">password?</a></span>-->
        <!--</div>-->
  
    `;
    }
    static get properties() {
        return {
            name: {
                type: String
            },
            username: {
                type: String
            },
            password: {
                type: String
            }
        };
    }

    _handleRegister(event){
        event.preventDefault();
        const name = this.shadowRoot.querySelector('#field_name').value;
        const email = this.shadowRoot.querySelector('#field_username').value;
        const password = this.shadowRoot.querySelector('#field_password').value;
        this.shadowRoot.querySelector('#field_name').value = '';
        this.shadowRoot.querySelector('#field_username').value = '';
        this.shadowRoot.querySelector('#field_password').value = '';

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('success');
                console.log(result);
                firebase.database().ref('users/' + result.user.uid).set({
                    username: name,
                    email: email,
                    rol: 'student'
                });
                const link=document.createElement("a");
                link.id = 'someLink'; //give it an ID!
                link.href="/#/landing";
                link.click();
            })
            .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        })
    }
}

window.customElements.define('registro-form', RegistroForm);
