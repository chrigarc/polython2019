import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class UploadForm extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
    
      Nombre:<br>
      <input id="inputnombre" type="text" name="firstname">
      <br>
      Contenido:<br>
      <textarea id="inputcontenido" name="content"></textarea><br>
      <p>Tipo</p>
      <input type="radio" name="type" value="file" checked> Archivo<br>
      <input type="radio" name="type" value="text"> Texto<br>
      
      <select id="inputcategoria">
       <template is="dom-repeat" items="[[categorias]]" as="categoria">
        <option value="[[categoria.id]]">[[categoria.name]]</option>
       </template>
       </select>
       
       <button type="button" on-click="handleSave">Agregar</button>
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'upload page',
            },
            categorias:{
                type: Array,
                value: [],
            },
            user: {
                type: Object,
                value: null
            }
        };
        
    }
    connectedCallback() {
        super.connectedCallback();
        this.handleStart();
    }
    handleStart(){
        const references=firebase.database().ref('categories');
        references.on('value', (snapshot)=>{
            const cat=[];
            for(const v in snapshot.val()){
                cat.push(snapshot.val()[v]);
            }
            this.set("categorias",cat);
        });

    }
    handleSave(event){
        const nombre = this.shadowRoot.querySelector('#inputnombre').value;
        const contenido = this.shadowRoot.querySelector('#inputcontenido').value;
        const categoria = this.shadowRoot.querySelector('#inputcategoria').value;
        const newResurceKey = firebase.database().ref('resources').push().key;

        const resourceData={
            name:nombre,
            content:contenido,
            category:categoria,
            date: Date.now(),
            type:"text",
            views:0,
            rate:0,
            validate:false,
            autor: this.user.uid,
            id: newResurceKey,
            deleted: false
        };
        const updates={};
        updates['/resources/' + newResurceKey] = resourceData;
        updates['/user-resources/' +""+newResurceKey] =resourceData;
        firebase.database().ref().update(updates).then(()=>{
            console.log("guarde bien");
        }).catch(error=>{console.log(error)});
    }
}

window.customElements.define('upload-form', UploadForm);
