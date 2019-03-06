import {LitElement, html} from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import store from '../store/store';
import {buyProduct} from "../store/actions";

class ShopItem extends connect(store)(LitElement) {

    static get properties() {
        return {
            products: {
                type: Array
            },
        };
    }

    stateChanged(state) {
        const { products } = state;
        this.products = products.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }

    render() {
        return html`
            <div class="root">
                ${this.products ? this.products.map(
                    prod => html`<shop-item id="${prod.id}"
                                            name="${prod.name}"
                                            amount="${prod.amount}"
                                            price="${prod.price}"
                                            @buy-item="${() => store.dispatch(buyProduct(prod.id))}"></shop-item>`
                ) : null}
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
    }
}

customElements.define('shop-products', ShopItem);
