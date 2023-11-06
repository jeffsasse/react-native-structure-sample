import {Alert} from 'react-native'
import {call, put, select, delay} from 'redux-saga/effects'
import AppActions from '~/actions/app'
import ProductActions from '~/actions/product'
import * as app from '@config'

export function* loginRequest(api, action) {
  const {payload, message} = action
  const response = yield api.login(payload)
  console.log(response)
  if (response.ok) {
    window.token = response.data.auth_token
    yield put(AppActions.loginSuccess(response.data))
    if (app.type === 'single') {
      console.log('----- this is the single type -----')
    } else {
      console.log('----- this is the another type -----')
      yield put(ProductActions.getbundlesRequest(app.slug))
    }
  } else {
    Alert.alert(
      'Code3Apps',
      response.data?.message ? response.data.message : message,
      [{text: 'Ok', onPress: () => {}}],
    )
    yield put(AppActions.loginFailure())
  }
}

export function* logoutRequest(api, action) {
  yield put(AppActions.logoutSuccess())
  yield put(AppActions.clearRequest())
  yield put(ProductActions.clearRequest())
  window.token = ''
  if (action?.callback) {
    yield put(action.callback())
  }
  yield put(ProductActions.getbundlesRequest(app.slug))
  if (action?.payload?.msg) {
    Alert.alert('Code3Apps', action?.payload?.msg, [
      {text: 'Ok', onPress: () => {}},
    ])
  }
}

export function* registerRequest(api, action) {
  const {payload} = action
  const response = yield api.register(payload)

  if (response.ok) {
    yield put(
      AppActions.loginRequest({
        email: payload.email,
        password: payload.password,
      }),
    )
    yield put(AppActions.registerSuccess(response.data))
  } else {
    yield put(AppActions.registerFailure())
  }
}

export function* emailRequest(api, action) {
  const {payload, callback} = action
  const response = yield api.postEmail(payload)

  if (response.ok && response.data?.success) {
    Alert.alert('Code3Apps', 'Email updated successfully!', [
      {text: 'Ok', onPress: () => {}},
    ])
    yield callback()
    yield put(AppActions.emailSuccess(response.data))
  } else {
    Alert.alert(
      'Code3Apps',
      response.data?.message ? response.data.message : 'Email update failed!',
      [{text: 'Ok', onPress: () => {}}],
    )
    yield put(AppActions.emailFailure())
  }
}

export function* passwordRequest(api, action) {
  const {payload, callback} = action
  const response = yield api.postPassword(payload)

  if (response.ok && response.data?.success) {
    Alert.alert('Code3Apps', 'Password updated successfully!', [
      {text: 'Ok', onPress: () => {}},
    ])
    if (action?.callback) yield callback()
    yield put(AppActions.passwordSuccess(response.data))
  } else {
    Alert.alert(
      'Code3Apps',
      response.data?.message
        ? response.data.message
        : 'Password update failed!',
      [{text: 'Ok', onPress: () => {}}],
    )
    yield put(AppActions.passwordFailure())
  }
}

export function* forgotpasswordRequest(api, action) {
  const {payload, callback} = action
  const response = yield api.getForgotPassword(payload.email)
  console.log(response)

  if (response.ok) {
    Alert.alert(
      'Code3Apps',
      'Email sent successfully! Check your email to find reset token',
      [{text: 'Ok', onPress: () => callback.navigate('Reset')}],
    )
    yield put(AppActions.forgotpasswordSuccess(response.data))
  } else {
    Alert.alert('Code3Apps', `Can't find this email!`, [
      {text: 'Ok', onPress: () => {}},
    ])
    yield put(AppActions.forgotpasswordFailure())
  }
}

export function* passwordResetRequest(api, action) {
  const {payload, callback} = action
  const response = yield api.resetPassword(payload)

  if (response.ok) {
    Alert.alert('Code3Apps', 'Password has been reset successfully!', [
      {text: 'Ok', onPress: () => callback.navigate('Login')},
    ])
    yield put(AppActions.passwordResetSuccess(response.data))
  } else {
    Alert.alert(
      'Code3Apps',
      `Failure! Error occured while resetting password.`,
      [{text: 'Ok', onPress: () => callback.navigate('Forgot')}],
    )
    yield put(AppActions.passwordResetFailure())
  }
}
