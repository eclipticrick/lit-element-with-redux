import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import reducer from './reducer';

export default createStore(
    reducer,
    composeWithDevTools()
)