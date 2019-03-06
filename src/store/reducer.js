import {GET_PRODUCTS, BUY_PRODUCT} from "./actions";

const INITIAL_STATE = {
    products: [],
    cart: []
};
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
            ...state,
            products: action.payload.products
        };
        case BUY_PRODUCT:
            const product = { ...state.products.find(p => p.id === action.payload.id) };
            product.amount--;
            let cart = [...state.cart];
            let productInCart = cart.find(p => p.id === action.payload.id);
            if (!productInCart) {
                cart = [...cart, { ...product, amount: 1 }];
            } else {
                productInCart = {...productInCart};
                productInCart.amount++;
                cart = [...[...state.cart].filter(p => p.id !== action.payload.id), productInCart];
            }

            return {
                ...state,
                products: [...[...state.products].filter(p => p.id !== product.id), product],
                cart
        };
        default: return state
    }
}