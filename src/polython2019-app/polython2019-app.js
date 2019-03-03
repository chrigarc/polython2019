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
        }
      </style>
      
      <app-location route="{{route}}"></app-location>
      <app-route route="{{route}}"
                   pattern="/:page"
                   data="{{data}}"
                   tail="{{subroute}}"></app-route>
      <header-component logged="[[logged]]" on-notification="handleNotification" user="[[user]]"></header-component>
      <iron-pages
              selected="{{data.page}}"
              attr-for-selected="view"
              fallback-selection="landing"
              role="main" 
              on-notification="handleNotification"
              on-loginsuccess="handleLoginSuccess"
              on-contentselected="handleContent">
          <landing-page view="landing"></landing-page>
          <login-page view="login"></login-page>
          <registro-page view="registro"></registro-page>
          <dashboard-page view="dashboard"></dashboard-page>
          <content-page view="content" content="[[content]]"></content-page>
          <upload-page view="upload" user="[[user]]"></upload-page>
          <searcher-page view="searcher"></searcher-page>
      </iron-pages>
        
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
  }

  __oAuthMiddelware() {
    firebase.auth().onAuthStateChanged(user => {
      this.set('logged', user ? true : false);
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


  handleLoginSuccess(event){
    this.set('user', event.detail.user);
  }
}

window.customElements.define('polython2019-app', Polython2019App);
