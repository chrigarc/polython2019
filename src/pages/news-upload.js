import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class NewsUpload extends PolymerElement {
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
                <h2>Nueva noticia</h2>
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
            user: {
                type: Object,
                value: null
            }
        };

    }
    connectedCallback() {
        super.connectedCallback();
    }

    handleSave(event){
        event.preventDefault();
        const nombre = this.shadowRoot.querySelector('#inputnombre').value;
        const contenido = this.shadowRoot.querySelector('#inputcontenido').value;
        const newResurceKey = firebase.database().ref('news').push().key;

        const resourceData={
            title:nombre,
            content:contenido,
            date: Date.now(),
            id: newResurceKey,
            deleted: false
        };
        const updates={};
        updates['/news/' + newResurceKey] = resourceData;
        updates['/notifications'] =  'Nuevo noticia disponible';
        firebase.database().ref().update(updates).then(()=>{
            console.log("guarde bien");
            this.dispatchEvent(new CustomEvent('notification', {
                bubbles: true,
                composed: true,
                detail: {text: 'Tu nueva noticia ha sido guardada con éxito'}
            }));
        }).catch(error=>{console.log(error)});

    }
}

window.customElements.define('news-upload', NewsUpload);
