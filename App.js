/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {Alert, BackHandler} from 'react-native'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './src/reducers'
import RootContainer from './src/containers/root'

import * as Sentry from '@sentry/react-native'
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler'

Sentry.init({
  dsn:
    env.sentry_url,
})

setJSExceptionHandler((error, isFatal) => {
  Sentry.captureException(error)
  Alert.alert(
    'Unexpected Error Occurred',
    `"Following issue has been reported to development team." ${error.message} `,
    [
      {
        text: 'OK',
        onPress: () => {
          BackHandler.exitApp()
        },
      },
    ],
  )
})

setNativeExceptionHandler((exceptionString) => {
  Sentry.captureException(exceptionString)
  Alert.alert(
    'Unexpected Error Occurred',
    `"Following issue has been reported to development team." ${error.message} `,
    [
      {
        text: 'OK',
        onPress: () => {
          BackHandler.exitApp()
        },
      },
    ],
  )
})

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootContainer />
      </PersistGate>
    </Provider>
  )
}

export default App
