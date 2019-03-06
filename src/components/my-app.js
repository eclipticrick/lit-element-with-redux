import { LitElement, html } from '@polymer/lit-element';
import { getAllProducts } from '../store/actions';
import store from '../store/store';


class MyApp extends LitElement {

    firstUpdated(_changedProperties) {
        store.dispatch(getAllProducts())
    }

    render() {
        return html`
            <p>Ik ben lit 🔥</p>
            <shop-cart></shop-cart>
            <shop-products></shop-products>
        `;
    }

}

customElements.define('my-app', MyApp);
