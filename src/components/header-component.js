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
        
                /************
        //-------------------------------
        // CABECERA
        //-------------------------------
        ************/
        #main-header {
            background: #333;
            color: white;
            height: 80px;
        
            width: 100%;
            left: 0;
            top: 0;
            position: fixed;
        }
        #main-header a {
            color: white;
        }
        
        
        /*
         * Logo
         */
        #logo-header {
            float: left;
            padding: 15px 0 0 20px;
            text-decoration: none;
        }
        #logo-header:hover {
            color: #0b76a6;
        }
        
        #logo-header .site-name {
            display: block;
            font-weight: 700;
            font-size: 1.2em;
        }
        
        #logo-header .site-desc {
            display: block;
            font-weight: 300;
            font-size: 0.8em;
            color: #999;
        }
        
        
        /*
         * Navegación
         */
        nav {
            float: right;
        }
        nav ul {
            margin: 0;
            padding: 0;
            list-style: none;
            padding-right: 20px;
        }
        
        nav ul li {
            display: inline-block;
            line-height: 80px;
        }
        
        nav ul li a {
            display: block;
            padding: 0 10px;
            text-decoration: none;
        }
        
        nav ul li a:hover {
            background: #0b76a6;
        }
        

        
        
      </style>
      
      
      
      <header id="main-header">
            
            <a id="logo-header" href="#">
                <span class="site-name">CHIMaeRA</span>
                <span class="site-desc">APRENDER Y PRODUCIR COMO NUNCA</span>
            </a> <!-- / #logo-header -->
        
            <nav>
                <ul>
                    <li><a class="active" href="/#/landing">Inicio</a></li>
                    <li><a href="/#/about">Acerca de</a></li>
                    <template is="dom-if" if="[[!logged]]">
                        <li><a href="/#/login">Login</a></li>
                        <li><a href="/#/registro">Registro</a></li>
                    </template>            
                    <template is="dom-if" if="[[logged]]">
                        <li><a href="/#/searcher">Biblioteca</a></li>                               
                        <li><a href="#" on-click="__handleCloseSession">Cerrar sesión</a></li>                               
                    </template>      
                    <li><a href="/#/contact">Contacto</a></li>			
                </ul>	
            </nav><!-- / nav -->
        
        </header><!-- / #main-header -->


   
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

    __handleCloseSession(event) {
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
