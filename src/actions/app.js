import {createActions} from 'reduxsauce'

const {Types, Creators} = createActions({
  loginRequest: ['payload', 'message'],
  loginSuccess: ['response'],
  loginFailure: null,

  logoutRequest: ['payload', 'callback'],
  logoutSuccess: null,
  logoutFailure: null,

  registerRequest: ['payload'],
  registerSuccess: ['response'],
  registerFailure: null,

  emailRequest: ['payload', 'callback'],
  emailSuccess: ['response'],
  emailFailure: null,

  passwordRequest: ['payload', 'callback'],
  passwordSuccess: ['response'],
  passwordFailure: null,

  forgotpasswordRequest: ['payload', 'callback'],
  forgotpasswordSuccess: ['response'],
  forgotpasswordFailure: null,

  passwordResetRequest: ['payload', 'callback'],
  passwordResetSuccess: ['response'],
  passwordResetFailure: null,

  clearRequest: null,
})

export const AppTypes = Types
export default Creators
