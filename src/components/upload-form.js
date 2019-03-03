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
        
        header, .content {
		    padding: 40px;
	    }
	    
	      
	    input[type=text], select, textarea {
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
                <h2>Nuevo recurso</h2>
            </header>
            <img src="https://picsum.photos/800/250?random" alt="Resource Image">        
            <form on-submit="handleSave">
                <div class="content">
                 
                  <label for="inputnombre"><b>Titulo</b></label>
                  <input id="inputnombre" type="text" name="firstname" required>
                              
                  <label for="inputcontenido"><b>Contenido</b></label>
                  <textarea id="inputcontenido" name="content" required></textarea><br>
                  <!--<p>Tipo</p>-->
                  <!--<input type="radio" name="type" value="file" checked> Archivo<br>-->
                  <!--<input type="radio" name="type" value="text"> Texto<br>-->
                  <label for="inputcategoria"><b>Categoría</b></label>
                  <select id="inputcategoria" required>
                   <template is="dom-repeat" items="[[categorias]]" as="categoria">
                    <option value="[[categoria.id]]">[[categoria.name]]</option>
                   </template>
                   </select>
                   
                   <button type="submit">Agregar</button>      
                </div>
            </form>            
        </article>
      
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
        event.preventDefault();
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
        updates['/user-resources/' +this.user.uid+ '/' +newResurceKey] =resourceData;
        updates['/notifications'] =  Date.now + ': Nuevo recurso disponible';
        firebase.database().ref().update(updates).then(()=>{
            console.log("guarde bien");
            this.dispatchEvent(new CustomEvent('notification', {
                bubbles: true,
                composed: true,
                detail: {text: 'Tu nuevo recurso ha sido guardado con éxito'}
            }));
        }).catch(error=>{console.log(error)});

    }
}

window.customElements.define('upload-form', UploadForm);
