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
      
      <template is="dom-if" if="[[user]]">
          <table style="width: 100%;">
            <thead>
                <tr>
                    <td>Titulo</td>
                    <td>Categoría</td>
                    <td>Valoraciones</td>                   
                    <td>Valido</td>
                    <td>Acciones</td>
                </tr>
            </thead>
            <tbody>
                <template is="dom-repeat" items="[[resources]]" as="resource" id="trepeat">
                    <template is="dom-if" if="[[isVisible(resource, filters)]]">
                        <tr>
                            <td>
                                <a href="/#/content" on-click="handleContentSelect"  content-id$="[[resource.id]]" >[[resource.name]]</a> 
                            </td>
                            <td>
                                [[resource.category]]
                            </td>
                            <td>
                            [[resource.rate]]
                            </td>
                            <td>
                            [[renderValid(resource)]]
                            </td>
                            <td>
                                <template is="dom-if" if="[[isAdmin()]]">
                                    <a href="#" on-click="handleDelete" content-id$="[[resource.id]]" >Borrar</a>
                                
                                    <a href="#" on-click="handleValidate" content-id$="[[resource.id]]" >Validar</a>
                                </template>                        
                                <template is="dom-if" if="[[isStudent()]]">
                                    <a href="#" on-click="handleRate" content-id$="[[resource.id]]" content-rate$="[[resource.rate]]">Me gusta</a>
                                </template>                                                  
                            
                            </td>                                                     
                        </tr>
                    </template>            
                </template>
            </tbody>
          </table>
        <!--<section>        -->
            <!--<ul>-->
                 <!--<template is="dom-repeat" items="[[resources]]" as="resource">-->
                    <!--<template is="dom-if" if="[[isVisible(resource)]]">-->
                        <!--<li><a href="/#/content" on-click="handleContentSelect"  content-id$="[[resource.id]]" >[[resource.name]]</a> -->
                            <!--<template is="dom-if" if="[[isAdmin()]]">-->
                                <!--<a href="#" on-click="handleDelete" content-id$="[[resource.id]]" >Borrar</a>-->
                            <!---->
                                <!--<a href="#" on-click="handleValidate" content-id$="[[resource.id]]" >Validar</a>-->
                            <!--</template>                        -->
                            <!--<template is="dom-if" if="[[isStudent()]]">-->
                                <!--<a href="#" on-click="handleRate" content-id$="[[resource.id]]" content-rate$="[[resource.rate]]">Me gusta</a>-->
                            <!--</template>                       -->
                            <!--<span><strong>Valoraciones: </strong>[[resource.rate]]</span>-->
                            <!--<span><strong>Valido: </strong>[[renderValid(resource)]]</span>-->
                            <!---->
                        <!--</li>-->
                    <!--</template>            -->
                <!--</template>-->
            <!--</ul>-->
          <!--</section>-->
      </template>
      
    `;
    }

    static get properties() {
        return {
            resources: {
                type: Array,
                value: [],
            },
            user: {
                type: Object,
                value: null
            },
            filters: {
                type: Object,
                value: {},
                observer: 'handleFilters'
            }
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

    handleDelete(event){
        const id = event.target.getAttribute('content-id');
        firebase.database().ref('resources/' + id).child('deleted').set(true);
    }

    isVisible(resource, filters){
        console.log('asads');
        let status = true;
        if(!filters.keyword || filters.keyword === ''){
            status = status && !resource.deleted;
        }else{
            status = status && !resource.deleted && resource.name.toString().startsWith(filters.keyword);
        }

        if(filters.category && filters.category !== ''){
            status = status && resource.category.toString().startsWith(filters.category);
        }
        return status;

    }

    handleValidate(event){
        const id = event.target.getAttribute('content-id');
        firebase.database().ref('resources/' + id).child('validate').set(true);
    }

    handleRate(event){
        const id = event.target.getAttribute('content-id');
        const rate = Number(event.target.getAttribute('content-rate'));
        firebase.database().ref('resources/' + id).child('rate').set(rate + 1);
    }

    isStudent(){
        return this.user && this.user.rol === 'student';
        // return true;
    }

    isAdmin(){
        return this.user && this.user.rol === 'admin';
    }

    renderValid(resource){
        return resource.validate? 'Si':'No';
    }

    handleFilters(){
        console.log('mange');
        const tmp = this.resources;
        this.set('resources', []);
        this.set('resources', tmp);
        console.log(this.resources);
        console.log(this.filters);

    }
}

window.customElements.define('resources-list', ResourcesList);
