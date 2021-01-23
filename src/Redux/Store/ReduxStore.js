import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk';
import {auth} from '../reducers/Authentication'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

let storeEnhancer;

const persistConfig = {
    key: 'root',
    storage,
}

if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    storeEnhancer = composeEnhancers(applyMiddleware(thunk));
} else {
    storeEnhancer = applyMiddleware(thunk);
}

const ReducerMerger = combineReducers({auth})

const persistedReducer = persistReducer(persistConfig, ReducerMerger)

const configureStore = (initialState) => {
    let store = createStore (persistedReducer,initialState,storeEnhancer )
    let persistor = persistStore(store)
    return {store, persistor}
};

export default configureStore;
