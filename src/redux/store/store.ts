import { compose, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from '../reducers/rootReducer';

declare global {
    interface Window {
       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(persistedReducer, composeEnhancers())
export const persistor = persistStore(store as any)