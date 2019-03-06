import {LitElement, html} from '@polymer/lit-element';
import {connect} from "pwa-helpers/connect-mixin";
import store from "../store/store";

class ShopItem extends connect(store)(LitElement) {

    static get properties() {
        return {
            products: {
                type: Array
            },
        };
    }

    stateChanged(state) {
        this.products = state.cart.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }

    render() {
        return html`
            <style>
                div.root {
                    color: #242424;
                    border: 1px solid lightgrey;
                    padding: 12px;
                    border-radius: 6px;
                    margin-bottom: 12px;
                    background: #fff;
                }
            </style>
            <div class="root">
                ${this.products.find(p => p.name === ' Remove ads') ? null : html`<ecliptic-banner></ecliptic-banner>`}
                shopping cart:
                <ul>
                    ${this.products.map(p => html`<li>You got ${p.amount} ${p.name} for €${(p.amount * p.price).toFixed(2)}</li>`)}
                </ul>
                total: €${this.products.reduce((a, v) => a + v.amount * v.price, 0).toFixed(2)}
            </div>
        `;
    }

}

customElements.define('shop-cart', ShopItem);
