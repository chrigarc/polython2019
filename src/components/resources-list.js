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
             <template is="dom-repeat" items="[[resources]]" as="resource">
                <li><a href$="content?[[resource.id]]" on-click="handleContentSelect"  content-id$="[[resource.id]]" >[[resource.name]]</a> 
                <a href="#">Borrar</a> <span>vistas: [[resource.views]]</span></li>
            </template>
        </ul>
      </section>
    `;
    }

    static get properties() {
        return {
            resources: {
                type: Array,
                value: [],
            },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.handleStart();
    }

    handleStart() {
        const references = firebase.database().ref('resources');
        references.on('value', (snapshot) => {
            const my_array = [];
            for (const v in snapshot.val()) {
                my_array.push(snapshot.val()[v]);
            }
            this.set("resources", my_array);
        });

    }

    handleContentSelect(event){
        //: event.target.getAttribute('content-id')
        const id = event.target.getAttribute('content-id');
        const references = firebase.database().ref('resources/' + id);
        references.on('value', (snapshot) => {
            this.dispatchEvent(new CustomEvent('contentselected', {
                bubbles: true,
                composed: true,
                detail: {content:snapshot.val()}
            }));
        });

    }
}

window.customElements.define('resources-list', ResourcesList);
