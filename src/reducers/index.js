import {combineReducers} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
// import AsyncStorage from 'react-native'
import configureStore from './createStore'
import rootSaga from '../sagas'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  transforms: [],
  timeout: null,
}

/* ------------- Assemble The Reducers ------------- */
const reducers = combineReducers({
  app: require('./app').reducer,
  product: require('./product').reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const {store, sagasManager, sagaMiddleware} = configureStore(
  persistedReducer,
  rootSaga,
)

if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require('./').reducers
    store.replaceReducer(nextRootReducer)

    const newYieldedSagas = require('../sagas').default
    sagasManager.cancel()
    sagasManager.done.then(() => {
      sagasManager = sagaMiddleware.run(newYieldedSagas)
    })
  })
}

const persistor = persistStore(store)

export {store, persistor}
