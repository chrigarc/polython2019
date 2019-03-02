import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/marked-element/marked-element';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ContentComponent extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
       <marked-element>
      <div slot="markdown-html"></div>
      <script type="text/markdown">
        # tiTULO
        ## SUBTITULO
        Check out my markdown!
 
        We can even embed elements without fear of the HTML parser mucking up their
        textual representation:
 
        \`\`\`html
        <awesome-sauce>
          <div>Oops, I'm about to forget to close this div.
        </awesome-sauce>
        \`\`\`
      </script> 
    </marked-element>
    `;
    }
    static get properties() {
        return {
        };
    }
}

window.customElements.define('content-component', ContentComponent);
