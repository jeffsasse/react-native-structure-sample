import {createReducer} from 'reduxsauce'
import {produce} from 'immer'
import {AppTypes} from '~/actions/app'

const initialState = {
  status: 'done', // done, pending, error
  access_token: '',
  user: {},
}

const loginRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const loginSuccess = produce((draft, action) => {
  draft.status = 'done'
  draft.access_token = action.response.auth_token
  draft.user = action.response.user
})
const loginFailure = produce((draft, action) => {
  draft.status = 'error'
})

const logoutRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const logoutSuccess = produce((draft, action) => {
  draft.status = 'done'
  draft.access_token = ''
})
const logoutFailure = produce((draft, action) => {
  draft.status = 'error'
})

const registerRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const registerSuccess = produce((draft, action) => {
  draft.status = 'done'
})
const registerFailure = produce((draft, action) => {
  draft.status = 'error'
})

const emailRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const emailSuccess = produce((draft, action) => {
  draft.status = 'done'
})
const emailFailure = produce((draft, action) => {
  draft.status = 'error'
})

const passwordRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const passwordSuccess = produce((draft, action) => {
  draft.status = 'done'
})
const passwordFailure = produce((draft, action) => {
  draft.status = 'error'
})

const forgotpasswordRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const forgotpasswordSuccess = produce((draft, action) => {
  draft.status = 'done'
})
const forgotpasswordFailure = produce((draft, action) => {
  draft.status = 'error'
})

const passwordResetRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const passwordResetSuccess = produce((draft, action) => {
  draft.status = 'done'
})
const passwordResetFailure = produce((draft, action) => {
  draft.status = 'error'
})

const clearRequest = produce((draft, action) => (draft = initialState))

export const reducer = createReducer(initialState, {
  [AppTypes.LOGIN_REQUEST]: loginRequest,
  [AppTypes.LOGIN_SUCCESS]: loginSuccess,
  [AppTypes.LOGIN_FAILURE]: loginFailure,

  [AppTypes.LOGOUT_REQUEST]: logoutRequest,
  [AppTypes.LOGOUT_SUCCESS]: logoutSuccess,
  [AppTypes.LOGOUT_FAILURE]: logoutFailure,

  [AppTypes.REGISTER_REQUEST]: registerRequest,
  [AppTypes.REGISTER_SUCCESS]: registerSuccess,
  [AppTypes.REGISTER_FAILURE]: registerFailure,

  [AppTypes.EMAIL_REQUEST]: emailRequest,
  [AppTypes.EMAIL_SUCCESS]: emailSuccess,
  [AppTypes.EMAIL_FAILURE]: emailFailure,

  [AppTypes.PASSWORD_REQUEST]: passwordRequest,
  [AppTypes.PASSWORD_SUCCESS]: passwordSuccess,
  [AppTypes.PASSWORD_FAILURE]: passwordFailure,

  [AppTypes.FORGOTPASSWORD_REQUEST]: forgotpasswordRequest,
  [AppTypes.FORGOTPASSWORD_SUCCESS]: forgotpasswordSuccess,
  [AppTypes.FORGOTPASSWORD_FAILURE]: forgotpasswordFailure,

  [AppTypes.PASSWORD_RESET_REQUEST]: passwordResetRequest,
  [AppTypes.PASSWORD_RESET_SUCCESS]: passwordResetSuccess,
  [AppTypes.PASSWORD_RESET_FAILURE]: passwordResetFailure,

  [AppTypes.CLEAR_REQUEST]: clearRequest,
})
