import {createReducer} from 'reduxsauce'
import {produce} from 'immer'
import _ from 'lodash'
import {ProductTypes} from '~/actions/product'

const initialState = {
  status: 'done', // done, pending, error

  bundle: {
    allow_single_product_subscription: true,
    app_store_bundle_id: 'com.code3apps.fireexamprep',
    app_store_iaps: [],
    created_at: '2020-02-19T04:13:47.000Z',
    description: 'Fire and EMS study guides for promotion or certification',
    id: 6,
    price: 0.0,
    products: [],
    slug: 'fire-exam-prep',
    subscribed: [], // data
    title: 'Fire Exam Prep',
    unsubscribed: [], // data
    updated_at: '2020-09-28T00:54:27.000Z',
  },

  bookmarkIds: [],

  startover: false,

  courses: {
    45: {
      app_store_iaps: [],
      background: '',
      configurations: {
        allow_comprehensive_flashcards: false,
        allow_comprehensive_quizzes: false,
        auditable: false,
        auditable_flashcards_limit: null,
        auditable_htmls_limit: null,
        auditable_media_limit: null,
        auditable_questions_limit: null,
        background_type: null,
        colors: [],
        comprehensive_questions_limit: null,
        has_bookmarks: false,
        shuffle: false,
        skippable: false,
        startover: false,
        study_mode: false,
        view_type: null,
      },
      created_at: '2020-02-17T19:14:58.000Z',
      description:
        'Flash Fire is an exam preparation app that will help fire service personnel prepare for written tests based on IFSTA Hazardous Materials for First Responders, 5th Edition.  This app includes a test bank with over 1050 multiple-choice questions based on the IFSTA textbook.  Each question is page-referenced to the text.This app mirrors the organization of the IFSTA text (see the paragraph titled Book Organization on page 2 of the introduction in the book):· Chapters 1 through 3 are Awareness-level· Chapters 4 through 7 are Operations- Core Competencies· Chapters 8 through 14 are Operations- Mission Specific CompetenciesFlash Fire allows you to take a comprehensive exam, study questions from a specific chapter of the book, or even build your own exam based on the chapters you wish to study.  Our app allows you to bookmark questions you would like to review, and will even save all questions you answered incorrectly on any test so you can go back and look at them again.As always, don’t hesitate to contact us if you have any questions or comments at:  flashfireapps@gmail.com This app will be updated regularly based on user feedback.Study hard and stay safe out there!Note:  Flash Fire is not directly associated with IFSTA, however our content is designed to aid those studying their materials.',
      frequency: null,
      icon: null,
      id: 45,
      image: 'http://23.20.37.229//images/placeholder.png',
      is_subscribed: true,
      modules: [], // data
      price: '9.99',
      pricing_model: null,
      slug: 'hazmat-exam-prep-5th-ed',
      tagline: null,
      tags: [],
      title: 'HazMat Exam Prep 5th Ed.',
      updated_at: '2020-09-28T00:46:58.000Z',
      visibility: 'All',
    },
  },

  chapters: {
    1296: {
      actable_id: 78,
      actable_type: 'Modulee',
      ancestry: null,
      children: [], // data
      created_at: '2020-02-17T19:27:17.000Z',
      description: null,
      id: 1296,
      parent_id: null,
      product_id: 45,
      row_order: -1221844073,
      time: null,
      title: 'Chapter Quizzes',
      updated_at: '2020-09-08T20:13:35.000Z',
      view_count: null,
    },
  },

  quizes: {
    1359: {
      actable_id: 743,
      actable_type: 'Quiz',
      ancestry: '1296',
      bookmarks: [], // data
      created_at: '2020-02-19T04:11:14.000Z',
      description: 'One-liner description what the quiz is all about.',
      id: 1359,
      parent_id: null,
      product_id: 45,
      questions: [], // data
      row_order: -1209502212,
      time_limit: null,
      title: 'Introduction',
      updated_at: '2020-02-19T04:11:14.000Z',
      view_count: null,
      viewed: null, // data
    },
  },

  flashcards: {},

  html: {},

  questions: {
    45: [],
  },

  timeLeft: null,

  bookmarks: {
    1296: {
      actable_type: 'Module',
      bookmarked_contents: [
        {content_id: 1360, contents: [], title: 'Recognizing and Identifying'},
      ],
      content_type_ids: [41059],
    },
  },

  attempts: {
    1296: {
      comprehensive: {},
      contents: [
        {
          attempts: 2,
          id: 1361,
          last_attempt: '2020-08-08T15:04:59.000Z',
          title: 'Awareness-Level Actions',
        },
      ],
    },
  },

  results: {
    1361: [
      {
        correct_answers: 1,
        id: 576,
        incorrect_answers: 0,
        unattempted_answers: 0,
        viewed_at: '2020-08-08T15:04:59.000Z',
      },
    ],
  },

  details: {
    576: [
      {
        correct: 'Directing victims to move to a safe area',
        explanation: 'HM5 pg 129',
        id: 41191,
        is_bookmarked: false,
        options: [],
        question:
          'Which rescue tactic is most appropriate for Awareness level personnel at a terrorist incident?',
        selected: '0',
        status: 'Correct',
      },
    ],
  },

  progress: {},
  paymentStatus: '',
  paymentProcessing: false,
  paymentErrorRaised: false,
  paymentError: '',
}

const getbundlesRequest = produce((draft, action) => {
  draft.status = 'pending-bundles'
  draft.paymentError = ''
  draft.paymentErrorRaised = false
})
const getbundlesSuccess = produce((draft, action) => {
  draft.status = 'done'
  draft.bundle = action.response.bundle
})
const getbundlesFailure = produce((draft, action) => {
  draft.status = 'done'
  draft.bundle = {}
})

const getmodulesRequest = produce((draft, action) => {
  draft.status = 'pending'
  draft.paymentProcessing = false
  draft.paymentStatus = ''
})
const getmodulesSuccess = produce((draft, action) => {
  draft.status = 'done'
  const product = action.response.product
  draft.courses[product.slug] = product
})
const getmodulesFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getcomprehensiveRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getcomprehensiveSuccess = produce((draft, action) => {
  draft.status = 'done'
  // draft.quiz = {...draft.quiz, ...action.response}
})
const getcomprehensiveFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getchapterRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getchapterSuccess = produce((draft, action) => {
  draft.status = 'done'
  draft.chapters[action.response.contents.id] = action.response.contents
})
const getchapterFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getbookmarkRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getbookmarkSuccess = produce((draft, action) => {
  draft.status = 'done'
  const {id, response} = action
  draft.bookmarks[id] = response
})
const getbookmarkFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getresultRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getresultSuccess = produce((draft, action) => {
  const {id, response} = action
  draft.details[id] = response?.result
  draft.bookmarkIds = response?.bookmarks
  draft.status = 'done'
})
const getresultFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getresultsRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getresultsSuccess = produce((draft, action) => {
  const {id, response} = action
  draft.status = 'done'
  draft.results[id] = response
})
const getresultsFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getquizRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getquizSuccess = produce((draft, action) => {
  const {bookmarks, id, ancestry, viewed} = action.response.contents
  draft.bookmarkIds = bookmarks
  const chapter = _.filter(draft.chapters[ancestry].children, (item) => {
    return item.id == id
  })[0]
  draft.quizes[id] = action.response.contents
  draft.quizes[id].time_limit = viewed?.remaining_time
    ? viewed?.remaining_time
    : chapter?.configurations?.time_limit
  draft.status = 'done'
})
const getquizFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getquizattemptRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getquizattemptSuccess = produce((draft, action) => {
  const {id, response} = action
  draft.attempts[id] = response
  draft.status = 'done'
})
const getquizattemptFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getFlashcardRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getFlashcardSuccess = produce((draft, action) => {
  draft.status = 'done'
  draft.bookmarkIds = action.response.contents.bookmarks
  draft.flashcards[action.response.contents.id] = action.response.contents
})
const getFlashcardFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getHtmlRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getHtmlSuccess = produce((draft, action) => {
  draft.status = 'done'
  draft.bookmarkIds = action.response.contents.bookmarks
  draft.html[action.response.contents.id] = action.response.contents
})
const getHtmlFailure = produce((draft, action) => {
  draft.status = 'error'
})

const postbookmarkRequest = produce((draft, action) => {
  // draft.status = 'pending'
})
const postbookmarkSuccess = produce((draft, action) => {
  const {id, response} = action
  draft.status = 'done'
  draft.bookmarkIds = response.content_type_ids
})
const postbookmarkFailure = produce((draft, action) => {
  draft.status = 'error'
})

const postviewquizRequest = produce((draft, action) => {
  // draft.status = 'pending'
})

const startover = produce((draft, action) => {
  draft.quizes[action.id] = {}
})

const postviewquizSuccess = produce((draft, action) => {
  draft.status = 'done'
})
const postviewquizFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getprogressRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getprogressSuccess = produce((draft, action) => {
  draft.status = 'done'
  draft.progress = action.response
})
const getprogressFailure = produce((draft, action) => {
  draft.status = 'error'
})

const subscribeiosRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const subscribeiosSuccess = produce((draft, action) => {
  draft.status = 'done'
})
const subscribeiosFailure = produce((draft, action) => {
  draft.status = 'error'
})

const subscribeardRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const subscribeardSuccess = produce((draft, action) => {
  draft.status = 'done'
})
const subscribeardFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getallcontentsRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getallcontentsSuccess = produce((draft, action) => {
  draft.status = 'done'
})
const getallcontentsFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getallquestionsRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getallquestionsSuccess = produce((draft, action) => {
  draft.status = 'done'
  draft.quizes[action.id] = action.response
  draft.bookmarkIds = action.response.bookmarks
})
const getallquestionsFailure = produce((draft, action) => {
  draft.status = 'error'
})

const getAllFlashcardsRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getAllFlashcardsSuccess = produce((draft, action) => {
  draft.status = 'done'
  draft.flashcards[action.id] = action.response
  draft.bookmarkIds = action.response.bookmarks
})
const getAllFlashcardsFailure = produce((draft, action) => {
  draft.status = 'error'
})

const setTimeLeft = produce((draft, action) => {
  draft.timeLeft = action.payload.timeLeft
})

const clearQuizState = produce((draft, action) => {
  draft.quizes[action.id] = {}
})

const subscriptionSuccess = produce((draft, action) => {
  draft.paymentStatus = action.response.paymentStatus
  draft.paymentProcessing = action.response.paymentProcessing
  draft.paymentErrorRaised = false
  draft.paymentError = ''
})

const subscriptionFailure = produce((draft, action) => {
  draft.paymentStatus = ''
  draft.paymentProcessing = false
  draft.paymentErrorRaised = true
  draft.paymentError = action.response.message
})

const clearRequest = produce((draft, action) => (draft = initialState))

export const reducer = createReducer(initialState, {
  [ProductTypes.GETBUNDLES_REQUEST]: getbundlesRequest,
  [ProductTypes.GETBUNDLES_SUCCESS]: getbundlesSuccess,
  [ProductTypes.GETBUNDLES_FAILURE]: getbundlesFailure,

  [ProductTypes.GETMODULES_REQUEST]: getmodulesRequest,
  [ProductTypes.GETMODULES_SUCCESS]: getmodulesSuccess,
  [ProductTypes.GETMODULES_FAILURE]: getmodulesFailure,

  [ProductTypes.GETCOMPREHENSIVE_REQUEST]: getcomprehensiveRequest,
  [ProductTypes.GETCOMPREHENSIVE_SUCCESS]: getcomprehensiveSuccess,
  [ProductTypes.GETCOMPREHENSIVE_FAILURE]: getcomprehensiveFailure,

  [ProductTypes.GETCHAPTER_REQUEST]: getchapterRequest,
  [ProductTypes.GETCHAPTER_SUCCESS]: getchapterSuccess,
  [ProductTypes.GETCHAPTER_FAILURE]: getchapterFailure,

  [ProductTypes.GETBOOKMARK_REQUEST]: getbookmarkRequest,
  [ProductTypes.GETBOOKMARK_SUCCESS]: getbookmarkSuccess,
  [ProductTypes.GETBOOKMARK_FAILURE]: getbookmarkFailure,

  [ProductTypes.GETRESULT_REQUEST]: getresultRequest,
  [ProductTypes.GETRESULT_SUCCESS]: getresultSuccess,
  [ProductTypes.GETRESULT_FAILURE]: getresultFailure,

  [ProductTypes.GETRESULTS_REQUEST]: getresultsRequest,
  [ProductTypes.GETRESULTS_SUCCESS]: getresultsSuccess,
  [ProductTypes.GETRESULTS_FAILURE]: getresultsFailure,

  [ProductTypes.GETQUIZ_REQUEST]: getquizRequest,
  [ProductTypes.GETQUIZ_SUCCESS]: getquizSuccess,
  [ProductTypes.GETQUIZ_FAILURE]: getquizFailure,

  [ProductTypes.GETQUIZATTEMPT_REQUEST]: getquizattemptRequest,
  [ProductTypes.GETQUIZATTEMPT_SUCCESS]: getquizattemptSuccess,
  [ProductTypes.GETQUIZATTEMPT_FAILURE]: getquizattemptFailure,

  [ProductTypes.GET_FLASHCARD_REQUEST]: getFlashcardRequest,
  [ProductTypes.GET_FLASHCARD_SUCCESS]: getFlashcardSuccess,
  [ProductTypes.GET_FLASHCARD_FAILURE]: getFlashcardFailure,

  [ProductTypes.GET_HTML_REQUEST]: getHtmlRequest,
  [ProductTypes.GET_HTML_SUCCESS]: getHtmlSuccess,
  [ProductTypes.GET_HTML_FAILURE]: getHtmlFailure,

  [ProductTypes.POSTBOOKMARK_REQUEST]: postbookmarkRequest,
  [ProductTypes.POSTBOOKMARK_SUCCESS]: postbookmarkSuccess,
  [ProductTypes.POSTBOOKMARK_FAILURE]: postbookmarkFailure,

  [ProductTypes.POSTVIEWQUIZ_REQUEST]: postviewquizRequest,
  [ProductTypes.POSTVIEWQUIZ_SUCCESS]: postviewquizSuccess,
  [ProductTypes.POSTVIEWQUIZ_FAILURE]: postviewquizFailure,

  [ProductTypes.GETPROGRESS_REQUEST]: getprogressRequest,
  [ProductTypes.GETPROGRESS_SUCCESS]: getprogressSuccess,
  [ProductTypes.GETPROGRESS_FAILURE]: getprogressFailure,

  [ProductTypes.SUBSCRIBEIOS_REQUEST]: subscribeiosRequest,
  [ProductTypes.SUBSCRIBEIOS_SUCCESS]: subscribeiosSuccess,
  [ProductTypes.SUBSCRIBEIOS_FAILURE]: subscribeiosFailure,

  [ProductTypes.SUBSCRIBEARD_REQUEST]: subscribeardRequest,
  [ProductTypes.SUBSCRIBEARD_SUCCESS]: subscribeardSuccess,
  [ProductTypes.SUBSCRIBEARD_FAILURE]: subscribeardFailure,

  [ProductTypes.GETALLCONTENTS_REQUEST]: getallcontentsRequest,
  [ProductTypes.GETALLCONTENTS_SUCCESS]: getallcontentsSuccess,
  [ProductTypes.GETALLCONTENTS_FAILURE]: getallcontentsFailure,

  [ProductTypes.GETALLQUESTIONS_REQUEST]: getallquestionsRequest,
  [ProductTypes.GETALLQUESTIONS_SUCCESS]: getallquestionsSuccess,
  [ProductTypes.GETALLQUESTIONS_FAILURE]: getallquestionsFailure,

  [ProductTypes.GET_ALL_FLASHCARDS_REQUEST]: getAllFlashcardsRequest,
  [ProductTypes.GET_ALL_FLASHCARDS_SUCCESS]: getAllFlashcardsSuccess,
  [ProductTypes.GET_ALL_FLASHCARDS_FAILURE]: getAllFlashcardsFailure,

  [ProductTypes.CLEAR_REQUEST]: clearRequest,
  [ProductTypes.CLEAR_QUIZ_STATE]: clearQuizState,
  [ProductTypes.SET_TIME_LEFT]: setTimeLeft,
  [ProductTypes.STARTOVER]: startover,

  [ProductTypes.SUBSCRIPTION_SUCCESS]: subscriptionSuccess,
  [ProductTypes.SUBSCRIPTION_FAILURE]: subscriptionFailure,
})
