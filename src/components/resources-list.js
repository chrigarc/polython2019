import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ResourcesList extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <section>
        <ul>
             <template is="dom-repeat" items="[[resources]]" as="lol" index-as="indexA" id="a">
                <li><a href="content">[[lol]]</a> <a href="">Borrar</a> <span>vistas: 245</span></li>
            </template>
        </ul>
      </section>
    `;
    }
    static get properties() {
        return {
            resources: {
                type: Array,
                value: ['Resource 1', 'Resource 2', 'Resource 3'],
            },
        };
    }
}

window.customElements.define('resources-list', ResourcesList);
