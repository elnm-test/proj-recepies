import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import storageSession from 'redux-persist/lib/storage/session'

import mealsReducer from './reducers/mealsReducer';

const rootReducer = combineReducers({
    meals:mealsReducer
})

const persistConfig = {
    key: 'root',
    storage:storageSession
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

  
export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
)

export const persistor = persistStore(store);