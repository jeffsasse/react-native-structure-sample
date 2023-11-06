import apisauce from 'apisauce'
import {store} from '~/reducers'
import AppActions from '~/actions/app'

// const Config = {API_URL: 'https://6b9fdef5dbdc.ngrok.io/api/v1/'}
// const Config = {API_URL: 'https://c3suite-dev.herokuapp.com/api/v1'}
const Config = {API_URL: 'http://23.20.37.229/api/v1'}

const authenticated = (api) => {
  window.token =
    window.token === ''
      ? 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNTgsImV4cCI6MTYxMDEzNzg4OX0.Dml3t0BH1ZBTvoIpEX6oZASgcYCBRPNp_0BsyK7ydyU'
      : window.token
  api.setHeader('Authorization', 'Bearer ' + window.token)
  return api
}

const navigator = (response) => {
  if (
    response.status === 401 &&
    response.config.url !== 'users/token' &&
    response.config.url !== 'users/change_email' &&
    response.config.url !== 'users/change_password'
  ) {
    store.dispatch(
      AppActions.logoutRequest({
        msg: "You've been logged out. Please log back in.",
      }),
    )
    console.log('Your token has been expired.')
  }
}

const create = (baseURL = Config.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 500000,
  })

  api.addMonitor(navigator)

  const login = (payload) => api.post('users/token', payload)
  const register = (payload) => api.post('users', payload)
  const resetPassword = (payload) => api.post('users/reset_password', payload)
  const postEmail = (payload) =>
    authenticated(api).post('users/change_email', payload)
  const postPassword = (payload) =>
    authenticated(api).post('users/change_password', payload)
  const getForgotPassword = (email) =>
    authenticated(api).get(`users/forgot_password?email=${email}`)
  const getBundles = (id = 'fire-exam-prep') =>
    authenticated(api).get(`bundles/${id}`)
  const getModules = (id = 'fire-exam-prep') =>
    authenticated(api).get(`products/${id}`)
  const getComprehensive = (id = 1262, type = 'Quiz') =>
    authenticated(api).get(`contents/${id}/comprehensive${type}`)
  const getBookmark = (id = 'fire-exam-prep') =>
    authenticated(api).get(`contents/${id}/modulee_bookmarks`)
  const getResult = (id = 'fire-exam-prep') =>
    authenticated(api).get(`contents/${id}/result`)
  const getResults = (id = 'fire-exam-prep') =>
    authenticated(api).get(`contents/${id}/results`)
  const getFeature = (id = 'fire-exam-prep') =>
    authenticated(api).get(`contents/${id}`)
  const getQuizAttempt = (id = 'fire-exam-prep') =>
    authenticated(api).get(`contents/${id}/quiz_attempts`)
  const postBookmarks = (id, payload) =>
    authenticated(api).get(`contents/${id}/bookmark`, payload)
  const postSubscribe = (id = 'fire-exam-prep', payload) =>
    authenticated(api).get(`products/${id}/app_store_subscription`, payload)
  const getAllContents = (id) =>
    authenticated(api).get(`products/${id}/contents`)
  const getAllQuestions = (id) =>
    authenticated(api).get(`contents/${id}/questions`)
  const startover = (id) => authenticated(api).get(`contents/${id}/startover`)
  const saveSubscription = (id) =>
    authenticated(api).get(`products/${id}/subscribe`)
  /**
   *
   * @param {*} id
   * @param {*} payload
   * index: Selected Option
   * question: Content Type ID
   * completed: Quiz completed or not
   * time_left:
   * order:
   */
  const postViewQuiz = (id, payload) =>
    authenticated(api).get(`contents/${id}/viewed_contents`, payload)

  return {
    login,
    register,
    resetPassword,
    postEmail,
    postPassword,
    getForgotPassword,
    getBundles,
    getModules,
    getComprehensive,
    getBookmark,
    getResult,
    getResults,
    getFeature,
    getQuizAttempt,
    postBookmarks,
    postViewQuiz,
    postSubscribe,
    getAllContents,
    getAllQuestions,
    startover,
    saveSubscription,
  }
}

export default {
  create,
}
