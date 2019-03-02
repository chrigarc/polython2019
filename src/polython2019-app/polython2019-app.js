import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route';
import '@polymer/app-route/app-location';
import '@polymer/iron-pages/iron-pages';
import '../pages/landing-page';
import '../pages/login-page';
import '../pages/registro-page';
import '../pages/dashboard-page';
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
      <h2>Hello [[prop1]]!</h2>
      <app-location route="{{route}}"></app-location>
      <app-route route="{{route}}"
                   pattern="/:page"
                   data="{{data}}"></app-route>
        <iron-pages
                selected="{{data.page}}"
                attr-for-selected="view"
                fallback-selection="landing"
                role="main">
            <landing-page view="landing"></landing-page>
            <login-page view="login"></login-page>
            <registro-page view="registro"></registro-page>
            <dashboard-page view="dashboard"></dashboard-page>
        </iron-pages>

    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'polython2019-app'
      }
    };
  }
}

window.customElements.define('polython2019-app', Polython2019App);
