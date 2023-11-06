import {takeEvery, takeLatest, all} from 'redux-saga/effects'
import {AppTypes} from '~/actions/app'
import {ProductTypes} from '~/actions/product'
import API from '~/services/api'
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  emailRequest,
  passwordRequest,
  forgotpasswordRequest,
  passwordResetRequest,
} from './app'

import {
  getbundlesRequest,
  getmodulesRequest,
  getcomprehensiveRequest,
  getchapterRequest,
  getbookmarkRequest,
  getresultRequest,
  getresultsRequest,
  getquizRequest,
  getFlashcardRequest,
  getHtmlRequest,
  getquizattemptRequest,
  postbookmarkRequest,
  postviewquizRequest,
  getprogressRequest,
  subscribeiosRequest,
  subscribeardRequest,
  getallcontentsRequest,
  getallquestionsRequest,
  getAllFlashcardsRequest,
  startover,
  subscribe,
} from './product'

const api = API.create()

/**
 * Connect Types to Sagas
 */
export default function* root() {
  yield all([
    // some sagas receive extra parameters in addition to an action
    // App
    takeLatest(AppTypes.LOGIN_REQUEST, loginRequest, api),
    takeLatest(AppTypes.LOGOUT_REQUEST, logoutRequest, api),
    takeLatest(AppTypes.REGISTER_REQUEST, registerRequest, api),
    takeLatest(AppTypes.EMAIL_REQUEST, emailRequest, api),
    takeLatest(AppTypes.PASSWORD_REQUEST, passwordRequest, api),
    takeLatest(AppTypes.FORGOTPASSWORD_REQUEST, forgotpasswordRequest, api),
    takeLatest(AppTypes.PASSWORD_RESET_REQUEST, passwordResetRequest, api),

    takeLatest(ProductTypes.GETBUNDLES_REQUEST, getbundlesRequest, api),
    takeLatest(ProductTypes.GETMODULES_REQUEST, getmodulesRequest, api),
    takeLatest(
      ProductTypes.GETCOMPREHENSIVE_REQUEST,
      getcomprehensiveRequest,
      api,
    ),
    takeLatest(ProductTypes.GETCHAPTER_REQUEST, getchapterRequest, api),
    takeLatest(ProductTypes.GETBOOKMARK_REQUEST, getbookmarkRequest, api),
    takeLatest(ProductTypes.GETRESULT_REQUEST, getresultRequest, api),
    takeEvery(ProductTypes.GETRESULTS_REQUEST, getresultsRequest, api),
    takeLatest(ProductTypes.GETQUIZ_REQUEST, getquizRequest, api),
    takeLatest(ProductTypes.GETQUIZATTEMPT_REQUEST, getquizattemptRequest, api),
    takeLatest(ProductTypes.GET_FLASHCARD_REQUEST, getFlashcardRequest, api),
    takeLatest(ProductTypes.GET_HTML_REQUEST, getHtmlRequest, api),
    takeLatest(ProductTypes.POSTBOOKMARK_REQUEST, postbookmarkRequest, api),
    takeEvery(ProductTypes.POSTVIEWQUIZ_REQUEST, postviewquizRequest, api),
    takeLatest(ProductTypes.GETPROGRESS_REQUEST, getprogressRequest, api),
    takeLatest(ProductTypes.SUBSCRIBEIOS_REQUEST, subscribeiosRequest, api),
    takeLatest(ProductTypes.SUBSCRIBEARD_REQUEST, subscribeardRequest, api),
    takeLatest(ProductTypes.GETALLCONTENTS_REQUEST, getallcontentsRequest, api),
    takeLatest(
      ProductTypes.GETALLQUESTIONS_REQUEST,
      getallquestionsRequest,
      api,
    ),
    takeLatest(
      ProductTypes.GET_ALL_FLASHCARDS_REQUEST,
      getAllFlashcardsRequest,
      api,
    ),
    takeLatest(ProductTypes.STARTOVER, startover, api),
    takeLatest(ProductTypes.SUBSCRIBE, subscribe, api),
  ])
}
