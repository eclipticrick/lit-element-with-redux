export const GET_PRODUCTS = 'GET_PRODUCTS';
export const BUY_PRODUCT = 'BUY_PRODUCT';
const PRODUCT_LIST = [
    {
        name: 'Brood',
        amount: 70,
        price: 4.5
    },
    {
        name: 'Apple',
        amount: 12,
        price: 0.5
    },
    {
        name: 'Rice',
        amount: 3000,
        price: 0.005
    },
    {
        name: 'Television',
        amount: 4,
        price: 700
    },
    {
        name: ' Remove ads',
        amount: 1,
        price: 8000
    }
].map((product, id) => ({id, ...product}));

export const getAllProducts = () => {
    return {
        type: GET_PRODUCTS,
        payload: {
            products: PRODUCT_LIST
        }
    }
};
export const buyProduct = id => {
    return {
        type: BUY_PRODUCT,
        payload: { id }
    }
};
