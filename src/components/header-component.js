import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class HeaderComponent extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
        
        .header {
          overflow: hidden;
          background-color: #f1f1f1;
          padding: 20px 10px;
        }
        
        .header a {
          float: left;
          color: black;
          text-align: center;
          padding: 12px;
          text-decoration: none;
          font-size: 18px; 
          line-height: 25px;
          border-radius: 4px;
        }
        
        .header a.logo {
          font-size: 25px;
          font-weight: bold;
        }
        
        .header a:hover {
          background-color: #ddd;
          color: black;
        }
        
        .header a.active {
          background-color: dodgerblue;
          color: white;
        }
        
        .header-right {
          float: right;
        }
        
        @media screen and (max-width: 500px) {
          .header a {
            float: none;
            display: block;
            text-align: left;
          }
          
          .header-right {
            float: none;
          }
        }
      </style>
      
      <header>
         <a href="landing" class="logo">Repositorio estudiantil</a>
         <nav class="header-right">
            <a class="active" href="/#/landing">Inicio</a>
            <template is="dom-if" if="[[!logged]]">
                <a href="/#/login">Login</a>
                <a href="/#/registro">Registro</a>
            </template>            
            <template is="dom-if" if="[[logged]]">
                <a href="#" on-click="__handleCloseSession">Cerrar sesión</a>               
                <span>[[user.name]]</span>
            </template>            
        </nav>
      </header>
    `;
    }
    static get properties() {
        return {
            user: {
                type: Object
            },
            logged: {
                type: Boolean,
                value: false
            }
        };
    }

    __handleCloseSession(event){
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            this.dispatchEvent(new CustomEvent('notification', {
                bubbles: true,
                composed: true,
                detail: {text: 'Adiós vaquero'}
            }));
        }).catch((error) => {
            // An error happened.
        });
    }
}

window.customElements.define('header-component', HeaderComponent);
