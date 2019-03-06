// We define an ES6 class that extends HTMLElement
class EclipticBanner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        const prefix = style => {
            const $ = prefix => style.replace(new RegExp(/\[prefix]/, 'g'), prefix);
            return `
                ${$('-o-')}
                ${$('-ms-')}
                ${$('-moz-')}
                ${$('-webkit-')}
                ${$('')}
            `;
        };

        const keyframes = `
            ${prefix(`@[prefix]keyframes animate-bg { 
                0%   { background-position: 0 50% }
                50%  { background-position: 100% 50% }
                100% { background-position: 0 50% }
            }`)}
            ${prefix(`@[prefix]keyframes animate-scale-1 { 
                0%   { [prefix]transform: scale(1); }
                50%  { [prefix]transform: scale(0.95); }
                100% { [prefix]transform: scale(1); }
            }`)}
            ${prefix(`@[prefix]keyframes animate-scale-2 { 
                0%   { [prefix]transform: scale(1); }
                50%  { [prefix]transform: scale(0.8); }
                100% { [prefix]transform: scale(1); }
            }`)}
            ${prefix(`@[prefix]keyframes animate-rotation-1 { 
                0%   { [prefix]transform: rotate(0deg) }
                50%  { [prefix]transform: rotate(4deg) }
                100% { [prefix]transform: rotate(0deg) }
            }`)}
            ${prefix(`@[prefix]keyframes animate-rotation-2 { 
                0%   { [prefix]transform: rotate(-2deg) }
                50%  { [prefix]transform: rotate(-6deg) }
                100% { [prefix]transform: rotate(-2deg) }
            }`)}`;
        const styles = `
            ${keyframes}
           :host {
                position: relative;
                font-family: sans-serif;
                text-align: center;
            }
            div.root {
                ${prefix(`[prefix]animation: animate-scale-1 250ms linear infinite;`)}
                ${prefix(`[prefix]transform-origin: 50% 50%;`)}
            }
            
            h2 { font-size: 60px }
            h3 { font-size: 25px }
            
            u { 
                text-decoration: none; 
                border-bottom: 3px 
                solid red; 
            }
            
            span#amount { 
                color: yellow;
                font-size: 200%;
                vertical-align: middle;
            }
            
            div.bg {
                background: linear-gradient(325deg, #ff0000, #ff0000, #f2ff00, #11ff00, #0d00ff, #ff0000, #ff0000);
                background-size: 1400% 1400%;
                ${prefix(`[prefix]animation: animate-bg 4s ease infinite;`)}
                border-radius: 12px;
                border: 5px solid #333;
            }
            
            div.text { padding: 20px; }
            
            h4:first-child {
                ${prefix(`[prefix]animation: animate-rotation-1 500ms linear infinite;`)}
                ${prefix(`[prefix]transform-origin: 50% 50%;`)}
            }
            
            h3 {
                ${prefix(`[prefix]animation: animate-scale-2 500ms linear infinite;`)}
                ${prefix(`[prefix]transform-origin: 50% 50%;`)}
            }
            
            h4:last-child {
                ${prefix(`[prefix]animation: animate-rotation-2 500ms linear infinite;`)}
                ${prefix(`[prefix]transform-origin: 50% 50%;`)}
            }
`;

        const template = document.createElement('template');
        template.innerHTML = `
            <style>${styles}</style>
            <div class="root">
                <div class="bg">
                    <div class="text">
                        <h4>U bent een <u>mogelijke</u></h4>
                        <h3>WINNAAR van <span id="amount"></span> <span id="prize"></span></h3>
                        <h4>klik <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">HIER</a> als je achterlijk bent!!!!</h4>
                    </div>
                </div>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.amountEl = this.shadowRoot.querySelector('#amount');
        this.prizeEl = this.shadowRoot.querySelector('#prize');
    }

    connectedCallback() {
        if (!this.hasAttribute('amount')) {
            this.setAttribute('amount', 3);
        }
        if (!this.hasAttribute('prize')) {
            this.setAttribute('prize', 'bananen');
        }
    }

    static get observedAttributes() {
        return ['amount', 'prize'];
    }

    get amount() {
        return this.getAttribute('amount');
    }
    set amount(v) {
        this.setAttribute('amount', v);
    }

    get prize() {
        return this.getAttribute('prize');
    }

    set prize(v) {
        this.setAttribute('prize', v);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'amount'){
            this.amountEl.innerText = newValue;
        }
        if (name === 'prize'){
            this.prizeEl.innerText = newValue;
        }
    }
}

// This is where the actual element is defined for use in the DOM
customElements.define('ecliptic-banner', EclipticBanner);