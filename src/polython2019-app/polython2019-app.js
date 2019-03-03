import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route';
import '@polymer/app-route/app-location';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-toast/paper-toast';
// pages
import '../pages/landing-page';
import '../pages/login-page';
import '../pages/registro-page';
import '../pages/dashboard-page';
import '../pages/content-page';
import '../pages/searcher-page';
import '../pages/upload-page';
import '../pages/about-page';
import '../pages/contact-page';
import '../pages/news-page';
import '../pages/news-upload';


//components
import '../components/header-component';


/**
 * @customElement
 * @polymer
 */
class Polython2019App extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          margin: 0;
          padding: 0;
          font-family: Helvetica, Arial, sans-serif;
          color: #666;
          background: #f2f2f2; 
          font-size: 1em;
          line-height: 1.5em;
          
          padding-top: 80px;
        }                     
        
        /************ 
        //------------------------------
        // CONTENIDO
        //------------------------------
        ************/
        #main-content {
            background: white;
            width: 90%;
            max-width: 800px;
            margin: 20px auto;
            box-shadow: 0 0 10px rgba(0,0,0,.1);
        }
        
        #main-content header,
        #main-content .content {
            padding: 40px;
        }
        
        .userinfo{
            float: right;    
            margin-right: 40px;
            margin-top: 10px;
        }
        
        /************
        //-----------------------------
        // PIE PÁGINA
        //-----------------------------
        ************/
        #main-footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 20px;
            margin-top: 40px;
        }
        #main-footer p {
            margin: 0;
        }
        
        #main-footer a {
            color: white;
        }

@media screen and (max-width: 860px) {
  #main-content{
    margin-top: 200px;
  }
}

      </style>
      
      <app-location route="{{route}}" use-hash-as-path></app-location>
      <app-route route="{{route}}"
                   pattern="/:page"
                   data="{{data}}"
                   tail="{{subroute}}"></app-route>
      <header-component logged="[[logged]]" on-notification="handleNotification" user="[[user]]"></header-component>
      
      <section id="main-content">
        <article>
            <div class="userinfo">
            [[user.name]] - [[user.rol]]
            </div>
        </article>
        <iron-pages
                selected="{{data.page}}"
                attr-for-selected="view"
                fallback-selection="landing"
                role="main" 
                on-notification="handleNotification"             
                on-contentselected="handleContent">
            <landing-page view="landing"></landing-page>
            
            <template is="dom-if" if="[[!user]]">
              <login-page view="login"></login-page>
              <registro-page view="registro"></registro-page>
            </template>
            
            <template is="dom-if" if="[[user]]">
              <dashboard-page view="dashboard"></dashboard-page>            
              <content-page view="content" content="[[content]]"></content-page>
              <upload-page view="upload" user="[[user]]"></upload-page>
              <searcher-page view="searcher" user="[[user]]"></searcher-page>
              <news-upload view="news-upload" ></news-upload>
            </template>
                        
            <about-page view="about"></about-page>
            <contact-page view="contact"></contact-page>
            <news-page view="news" user="[[user]]"></news-page>
            
        </iron-pages>
      </section>
      
      <footer id="main-footer">
	    <p>&copy; 2019 CHIMaeRA</p>
      </footer><!-- / #main-footer -->
      
      <paper-toast id="toast" text="[[notification.text]]" opened></paper-toast>  
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'polython2019-app'
      },
      logged: {
        type: Boolean,
        value: false
      },
      user: {
        type:Object,
        value: null
      },
      content: {
        type: Object,
        value: null
      },
      notification: {
        type: Object,
        value: {text: 'Bienvenido estas en línea'}
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.__oAuthMiddelware();
    this.notifications();
  }

  __oAuthMiddelware() {
    firebase.auth().onAuthStateChanged(user => {
      this.set('logged', user ? true : false);
      if(user) {
        const references = firebase.database().ref('users/' + user.uid);
        references.on('value', (snapshot) => {
          console.log(snapshot.val());
          const data = Object.assign({}, user, {name: snapshot.val().username, rol: snapshot.val().rol});
          this.set('user', data);
        });
      }else{
          this.set('user', null);
      }
    });
  }

  notifications(){
      const references = firebase.database().ref('notifications');
      references.on('value', (snapshot) => {
          if(snapshot.val()){
              this.set('notification', {text: snapshot.val()})
              this.$.toast.open();
          }
      });
  }

  handleNotification(event){
    this.set('notification', {text: event.detail.text})
    this.$.toast.open();
  }

  handleContent(event){
    console.log('contenido seleccionado');
    console.log(event.detail);
    this.set('content', event.detail.content);
    this.set('page', 'content') ;
  }
}

window.customElements.define('polython2019-app', Polython2019App);
