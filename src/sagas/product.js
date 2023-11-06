import {Alert} from 'react-native'
import {put, select, call, delay} from 'redux-saga/effects'
import RNIap from 'react-native-iap'
import _ from 'lodash'
import {slug} from '@config'
import ProductActions from '~/actions/product'
import AppActions from '~/actions/app'
import {
  createCustomer,
  createCharge,
  createToken,
  updateCustomerSource,
} from '~/services/stripe'

export function* getbundlesRequest(api, action) {
  const {id} = action
  const response = yield api.getBundles(id)
  if (response.ok) {
    console.log('****** this is the bundlesrequest ok ******')
    console.log(response.data)
    if (_.isEmpty(response.data.user))
      yield put(AppActions.logoutRequest(null, null))
    console.log('***** get bundles from server and go to success *****')
    yield put(ProductActions.getbundlesSuccess(response.data))
  } else {
    console.log('ERROR - getbundlesRequest')
    yield put(ProductActions.getbundlesFailure())
  }
}

export function* getmodulesRequest(api, action) {
  const {id} = action
  const response = yield api.getModules(id)
  if (response.ok) {
    yield put(ProductActions.getmodulesSuccess(response.data))
  } else {
    console.log('ERROR - getmodulesRequest')
    yield put(ProductActions.getmodulesFailure())
  }
}

export function* getcomprehensiveRequest(api, action) {
  const {id, mode = 'Quiz'} = action
  const response = yield api.getComprehensive(id, mode)

  if (response.ok) {
    const {questions, viewed, bookmarks} = response.data
    yield put(
      ProductActions.getcomprehensiveSuccess({questions, viewed, bookmarks}),
    )
  } else {
    console.log('ERROR - getcomprehensiveRequest')
    yield put(ProductActions.getcomprehensiveFailure())
  }
}

export function* getchapterRequest(api, action) {
  const {id} = action
  const response = yield api.getFeature(id)

  if (response.ok) {
    yield put(ProductActions.getchapterSuccess(response.data))
  } else {
    console.log('ERROR - getchapterRequest', response)
    yield put(ProductActions.getchapterFailure())
  }
}

export function* getbookmarkRequest(api, action) {
  const {id} = action
  const response = yield api.getBookmark(id)

  if (response.ok) {
    const bookmarks = {
      actable_type: response.data.actable_type,
      bookmarked_contents: response.data.bookmarked_contents,
      content_type_ids: response.data.content_type_ids,
    }
    yield put(ProductActions.getbookmarkSuccess(id, bookmarks))
  } else {
    console.log('ERROR - getbookmarkRequest')
    yield put(ProductActions.getbookmarkFailure())
  }
}

export function* getresultRequest(api, action) {
  const {id} = action
  const response = yield api.getResult(id)

  if (response.ok) {
    yield put(ProductActions.getresultSuccess(id, response.data))
  } else {
    console.log('ERROR - getresultRequest')
    yield put(ProductActions.getresultFailure())
  }
}

export function* getresultsRequest(api, action) {
  const {id} = action
  const response = yield api.getResults(id)
  if (response.ok) {
    yield put(ProductActions.getresultsSuccess(id, response.data.results))
  } else {
    console.log('ERROR - getresultsRequest')
    yield put(ProductActions.getresultsFailure())
  }
}

export function* getquizRequest(api, action) {
  const {id} = action
  const response = yield api.getFeature(id)

  if (response.ok) {
    yield put(ProductActions.getquizSuccess(response.data))
  } else {
    console.log('ERROR - getquizRequest')
    yield put(ProductActions.getquizFailure())
  }
}

export function* getFlashcardRequest(api, action) {
  const {id} = action
  const response = yield api.getFeature(id)
  if (response.ok) {
    yield put(ProductActions.getFlashcardSuccess(response.data))
  } else {
    console.log('ERROR - getFlashcardRequest')
    yield put(ProductActions.getFlashcardFailure())
  }
}

export function* getHtmlRequest(api, action) {
  const {id} = action
  const response = yield api.getFeature(id)
  if (response.ok) {
    yield put(ProductActions.getHtmlSuccess(response.data))
  } else {
    console.log('ERROR - getHtmlRequest')
    yield put(ProductActions.getHtmlFailure())
  }
}

export function* getquizattemptRequest(api, action) {
  const {id} = action
  const response = yield api.getQuizAttempt(id)

  if (response.ok) {
    yield put(ProductActions.getquizattemptSuccess(id, response.data.attempts))
    if (response.data.attempts.comprehensive) {
      yield put(
        ProductActions.getresultsRequest(
          response.data.attempts.comprehensive.id,
        ),
      )
    }
    if (response.data.attempts.contents.length > 0) {
      for (item of response.data.attempts.contents) {
        yield put(ProductActions.getresultsRequest(item.id))
      }
    }
  } else {
    console.log('ERROR - getquizattemptRequest')
    yield put(ProductActions.getquizattemptFailure())
  }
}

export function* postbookmarkRequest(api, action) {
  const {id, payload, sync} = action
  const response = yield api.postBookmarks(id, payload)

  if (response.ok) {
    yield put(ProductActions.postbookmarkSuccess(id, response.data))
    if (sync) yield put(ProductActions.getbookmarkRequest(sync))
  } else {
    console.log('ERROR - postbookmarkRequest')
    yield put(ProductActions.postbookmarkFailure())
  }
}

export function* postviewquizRequest(api, action) {
  const {id, payload} = action
  const response = yield api.postViewQuiz(id, payload)

  if (response.ok) {
    yield put(ProductActions.postviewquizSuccess(response.data))
  } else {
    console.log('ERROR - postviewquizRequest')
    yield put(ProductActions.postviewquizFailure())
  }
}

export function* getprogressRequest(api, action) {
  try {
    const bundle = yield select((state) => state.product.bundle)
    const unsubscribed = bundle.unsubscribed || []
    const subscribed = bundle.subscribed || []
    const progress = {}

    for (item of unsubscribed) {
      const modules = yield api.getModules(item.slug)
      progress[item.slug] = {
        title: item.title,
        hasProgress: false,
        hasBookmark: false,
      }
      if (modules.ok) {
        const mds =
          modules.data?.product?.modules ||
          modules.data?.product?.auditable_modules ||
          []
        for (md of mds) {
          progress[item.slug][md.module.id] = {}
          progress[item.slug][md.module.id].module = md.module
          const attempts = yield api.getQuizAttempt(md.module?.id)
          if (attempts.ok) {
            progress[item.slug][md.module.id].attempts = attempts.data.attempts
            progress[item.slug][md.module.id].results = {
              comprehensive: {},
              contents: {},
            }
            if (attempts.data.attempts?.comprehensive) {
              progress[item.slug].hasProgress = true
              const results = yield api.getResults(
                attempts.data.attempts?.comprehensive.id,
              )
              if (results.ok) {
                progress[item.slug][md.module.id].results.comprehensive =
                  results.data.results
              }
            }
            if (attempts.data.attempts.contents.length > 0) {
              progress[item.slug].hasProgress = true
              for (attempt of attempts.data.attempts.contents) {
                const results = yield api.getResults(attempt.id)
                if (results.ok) {
                  progress[item.slug][md.module.id].results.contents[
                    attempt.id
                  ] = results.data.results
                }
              }
            }
          }
        }
      }
    }

    for (item of subscribed) {
      const modules = yield api.getModules(item.slug)
      progress[item.slug] = {
        title: item.title,
        hasProgress: false,
        hasBookmark: true,
      }
      if (modules.ok) {
        // progress[item.slug].hasBookmark =
        //   modules.data.product.configurations?.has_bookmarks
        const mds =
          modules.data?.product?.modules ||
          modules.data?.product?.auditable_modules ||
          []
        for (md of mds) {
          progress[item.slug][md.module.id] = {}
          progress[item.slug][md.module.id].module = md.module
          const attempts = yield api.getQuizAttempt(md.module?.id)
          if (attempts.ok) {
            progress[item.slug][md.module.id].attempts = attempts.data.attempts
            progress[item.slug][md.module.id].results = {
              comprehensive: {},
              contents: {},
            }
            if (attempts.data.attempts?.comprehensive) {
              progress[item.slug].hasProgress = true
              const results = yield api.getResults(
                attempts.data.attempts?.comprehensive.id,
              )
              if (results.ok) {
                progress[item.slug][md.module.id].results.comprehensive =
                  results.data.results
              }
            }
            if (attempts.data.attempts.contents.length > 0) {
              progress[item.slug].hasProgress = true
              for (attempt of attempts.data.attempts.contents) {
                const results = yield api.getResults(attempt.id)
                if (results.ok) {
                  progress[item.slug][md.module.id].results.contents[
                    attempt.id
                  ] = results.data.results
                }
              }
            }
          }
        }
      }
    }

    yield put(ProductActions.getprogressSuccess(progress))
  } catch (e) {
    console.log('ERROR - getprogressFailure')
    yield put(ProductActions.getprogressFailure())
  }
}

export function* subscribeiosRequest(api, action) {
  const {payload, callback} = action

  try {
    const result = yield RNIap.initConnection()
    if (result) {
      const products = yield RNIap.getProducts(payload.iapProductIDs)
      if (products.length === 0) {
        Alert.alert('Code3Apps', `Couldn't find the product.`, [
          {text: 'Ok', onPress: () => {}},
        ])
        yield put(ProductActions.subscribeiosFailure())
        return
      }

      // TODO: Replace hard-coded product ID
      const purchase = yield RNIap.requestPurchase(
        'com.code3apps.fireExamPrep1and2_7thEd',
      )
      if (!purchase) {
        Alert.alert('Code3Apps', 'Purchase failed.', [
          {text: 'Ok', onPress: () => {}},
        ])
        yield put(ProductActions.subscribeiosFailure())
        return
      }

      const purchaseInfo = {
        receipt_data: purchase.transactionReceipt,
        transaction_id: purchase.transactionId,
      }

      const response = yield api.postSubscribe(payload.productID, purchaseInfo)
      if (response.ok) {
        yield callback()
        yield put(ProductActions.subscribeiosSuccess())
        return
      } else {
        yield put(ProductActions.subscribeiosFailure())
      }
    } else {
      Alert.alert('Code3Apps', `Couldn't instantiate the connection.`, [
        {text: 'Ok', onPress: () => {}},
      ])
      yield put(ProductActions.subscribeiosFailure())
    }
  } catch (e) {
    // Alert.alert('Code3Apps', 'Subscription has failed. Please try again.', [
    //   {text: 'Ok', onPress: () => {}},
    // ])
    Alert.alert('Code3Apps', e + ' ' + payload.productId, [
      {text: 'Ok', onPress: () => {}},
    ])
    yield put(ProductActions.subscribeiosFailure())
  }
}

export function* subscribeardRequest(api, action) {
  const {payload} = action
  // const result = yield RNIap.initConnection()
  // yield RNIap.consumeAllItemsAndroid()
  yield put(ProductActions.subscribeardSuccess())
}

export function* getallcontentsRequest(api, action) {
  const {id} = action
  const response = yield api.getAllContents(id)
  if (response.ok) {
    yield put(ProductActions.getallcontentsSuccess(response.data))
  } else {
    yield put(ProductActions.getallcontentsFailure())
  }
}

export function* getallquestionsRequest(api, action) {
  const {id} = action
  const response = yield api.getComprehensive(id, 'Quiz')
  if (response.ok) {
    yield put(ProductActions.getallquestionsSuccess(id, response.data))
  } else {
    yield put(ProductActions.getallquestionsFailure())
  }
}

export function* getAllFlashcardsRequest(api, action) {
  const {id} = action
  const response = yield api.getComprehensive(id, 'Flashcard')
  if (response.ok) {
    yield put(ProductActions.getAllFlashcardsSuccess(id, response.data))
  } else {
    console.log('ERROR - getAllFlashcardsRequest')
    yield put(ProductActions.getAllFlashcardsFailure())
  }
}

export function* startover(api, action) {
  const {id} = action
  const response = yield api.startover(id)
  if (response.ok) {
    if (action?.callback) {
      yield action.callback()
    }
  }
}

export function* subscribe(api, action) {
  const EMAIL_REGX = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
  const payload = action && action.payload ? action.payload : ''
  const user = payload.currentUser
  const id = payload.identifier
  isValidEmail = (email) => {
    emailPattern = EMAIL_REGX
    return !emailPattern.test(email) ? false : true
  }

  try {
    apiCall = async () => {
      if (payload && payload.email && payload.amount && payload.currency) {
        return await createToken({
          number: payload.number,
          expMonth: payload.month,
          expYear: payload.year,
          cvc: payload.cvc,
        })
      } else {
        throw 'Email or Credit Card info is missing.'
      }
    }

    createCustomerCall = async (tokenId) => {
      if (this.isValidEmail(payload.email) && payload.isSubscriptionInfoValid)
        return createCustomer({email: payload.email, source: tokenId})
      else throw 'Email or Credit Card info is not valid'
    }
    // All API requests expect amounts to be provided in a currency’s smallest unit. For example, to charge $10 USD, provide an amount value of 1000 (i.e, 1000 cents).
    createChargeCall = async (customerId) => {
      if (payload && payload.isSubscriptionInfoValid && customerId)
        return createCharge({
          customer: customerId,
          amount: Math.floor(payload.amount) * 100,
          currency: payload.currency,
          description: payload.title,
        })
      else throw 'Missing required parameters to charge OR Customer not found.'
    }

    updateCustomerSourceCall = (token, customerId) => {
      if (token) {
        return updateCustomerSource(customerId, {
          source: token,
        })
      } else throw 'Missing token to update source.'
    }

    saveSubscription = (charge, customer) => {
      if (payload && payload.identifier)
        return api.saveSubscription(id, {
          identifier: payload.identifier,
          charge: charge,
          customer: customer,
        })
      else
        throw 'Error while loading required product configurations OR Identifier not found.'
    }

    yield put(
      ProductActions.subscriptionSuccess({
        paymentStatus: 'Setting up your account ...',
        paymentProcessing: true,
      }),
    )

    let customer = null
    let charge = null
    if (payload.amount && parseFloat(payload.amount) >= 1) {
      const token = yield call(apiCall)
      if (_.isEmpty(user) || _.isEmpty(user.stripe_customer_id)) {
        customer = yield call(createCustomerCall, token.tokenId)
      } else {
        customer = yield call(
          updateCustomerSourceCall,
          token.tokenId,
          user.stripe_customer_id,
        )
      }

      if (customer !== undefined && customer.id) {
        yield put(
          ProductActions.subscriptionSuccess({
            paymentStatus: 'Charging your account ...',
            paymentProcessing: true,
          }),
        )
      } else
        throw customer ? customer : 'Problem occurred while creating customer'

      charge = yield call(createChargeCall, customer.id)
      if (charge && charge.id) {
        yield put(
          ProductActions.subscriptionSuccess({
            paymentStatus: 'Charge processed successfully ...',
            paymentProcessing: true,
          }),
        )
      } else throw charge ? charge : 'Problem occurred while charging user'
    }
    response = yield call(
      saveSubscription,
      charge ? charge.id : charge,
      _.isEmpty(user) || _.isEmpty(user.stripe_customer_id) ? customer.id : '',
    )

    if (response.ok && response.data.success) {
      yield delay(1000)
      yield put(
        ProductActions.subscriptionSuccess({
          paymentStatus: 'Completed',
          paymentProcessing: false,
        }),
      )
      yield put(ProductActions.getbundlesRequest(slug))
      yield put(ProductActions.getmodulesRequest(id))
    } else
      throw response && response.message
        ? response.message
        : 'Problem occurred during subscription'
  } catch (error) {
    console.log('Error: ' + error)
    // ToastAndroid.show(error, ToastAndroid.LONG)
    // Sentry.captureException('Error Saga-Subscription-> Subscription: ' + error)
    yield put(ProductActions.subscriptionFailure({message: error}))
  }
}
