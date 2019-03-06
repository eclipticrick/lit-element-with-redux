import {LitElement, html} from '@polymer/lit-element';

class ShopItem extends LitElement {

    static get properties() {
        return {
            id: {
                attribute: true,
                type: Number
            },
            name: {
                attribute: true,
                type: String
            },
            price: {
                attribute: true,
                type: Number
            },
            amount: {
                attribute: true,
                type: Number
            }
        };
    }

    render() {
        return html`
            <style>
            div.root {
                color: #242424;
                background: #f9f9f9;
                padding: 12px;
                border-radius: 6px;
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                margin-bottom: 12px;
            }
             h4,
             p {
                margin: 0;
            }
            hr {
                border: 0;
                border-bottom: 1px solid lightgrey;
            }
            button {
                border-radius: 11px;
                height: 22px;
                border: 0;
                box-shadow: none;
                transition: all .24s;
                cursor: pointer;
                margin-left: 12px;
            }
            button:focus {
                outline: 0;
            }
            button:hover,
            button:active {
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            }
            button[disabled] {
                box-shadow: none;
                cursor: not-allowed;
            }
            </style>
            <div class="root" id="item-${this.id}">
                <h4>${this.name}</h4>
                <hr/>
                <p>
                    ${this.amount} left 
                    <button @click="${this.decrementAmount}" .disabled="${this.amount === 0}">
                        ${this.amount !== 0 ? html`Buy 1 for €${this.price}` : html`Sold Out`}
                    </button>
                </p>
            </div>
        `;
    }
    decrementAmount() {
        this.amount--;
        let myEvent = new CustomEvent('buy-item', {
            data: { id: this.id },
            bubbles: true, // <-- bubble
            composed: true // <-- verder bubblen dan de shadowDOM
        });
        this.dispatchEvent(myEvent)
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    // firstUpdated(_changedProperties) {
    //     let myEvent = new CustomEvent('', {
    //         data: { lol: 'lololol' },
    //         bubbles: true, // <-- bubble
    //         composed: true // <-- verder bubblen dan de shadowDOM
    //     });
    //     this.dispatchEvent(myEvent)
    // }
}

customElements.define('shop-item', ShopItem);
