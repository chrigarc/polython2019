import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class AboutPage extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
        
         header, .content {
		    padding: 40px;
	    }
	    
	      img{
            width: 100%;
        }
      </style>
     
       <article>
            <header>
                <h2>SOBRE NOSOTROS</h2>
            </header>
            <img src$="https://picsum.photos/800/250?random&[[random()]]" alt="Gatito" />
            <div class="content">
                <h3>VISIÒN</h3>
                <p>Apoyar con material de consulta a la comunidad del centro de estudios científicos y tecnológicos “José María Morelos” de alta calidad, aprobada por docentes para uso de la comunidad estudiantil coadyuvando al rendimiento escolar .</p>
            </div>
            <img src$="https://picsum.photos/800/250?random&[[random()]]" alt="Gatito" />
            <div class="content">
                <h3>MISIÒN</h3>
                <p>Nacemos como “Chimaera” preocupados por los retos adicionales a la vida escolar, y la falta de medios de difusión de información que apoyen a la misma, así como mejorar el uso de la Tecnología actual haciendo rendir cada minuto de consulta, comenzando por la comunidad escolar del centro de estudios científicos y tecnológicos “José María Morelos”</p>
            </div>
            <img src$="https://picsum.photos/800/250?random&[[random()]]" alt="Gatito" />
            <div class="content">
                <h3>VALORES</h3>
                <p>
                En nuestra empresa se maneja con pilares que rigen la forma en la que hacemos las cosas y que nos identifican    
                </p>
                <ul>
                    <li>Tenacidad: La fuerza que nos impulsa a continuar.</li>
                    <li>Responsabilidad: Hacer lo que se debe hacerse y no dejar para después.</li>
                    <li>Entusiasmo: siempre buscamos entregar lo mejor de nosotros</li>
                    <li>Creatividad: Mantenemos siempre con la capacidad de inventar y reinventarnos.</li>
                    <li>Constancia: Tenemos la voluntad de lograr metas diarias y seguir creciendo como empresa.</li>
                    <li>Actitud: Contamos con el ánimo de hacer el trabajo no importando que tan difícil pueda llegar a ser.</li>
                    <li>Humildad: Es base de nuestra empresa. Compartimos un mismo principio y la voluntad de cumplirlo.</li>
                </ul>
            </div>
            <img src$="https://picsum.photos/800/250?random&[[random()]]" alt="Gatito" />
            <div class="content">
                <h3>OBJETIVOS </h3>
                <ol>
                        <li>Implementar el uso de tecnologías que permitan tener acceso a material didáctico para estudiantes</li>
                        <li>Disminuir el tiempo de consulta de textos y proporcionar contenido de calidad.</li>
                        <li>Construir herramientas que apoyen a la comunidad estudiantil que permitan la compresión y creación de métodos de estudio.</li>
                        <li>Difundir información de alcance institucional e interinstitucional que en base a los intereses de la comunidad.</li>
                        <li>Ofrecer material de apoyo concisa aprobada por docentes.</li>
                </ol>
            </div>
        </article>
    `;
    }
    static get properties() {
        return {
        };
    }

    random(){
        return Math.random();
    }
}

window.customElements.define('about-page', AboutPage);
