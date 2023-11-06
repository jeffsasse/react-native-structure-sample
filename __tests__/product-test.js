/* 
created on Jan, 12th 2021 by jaywjohnson
*/

import apisauce from 'apisauce'
import * as app from '@config'

const baseURL = 'http://23.20.37.229/api/v1'

// crease base api using sauce
const api = apisauce.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 500000,
})

// define the test account
const payload = {email: 'test@jest.com', password: 'aaaaaa'}

/// jest test function
/// check the sign in, sign up, get subscription products and unsubscrption products list
describe('Product Api test function', () => {
  // sign in test for getting token
  test('ready for token test', async () => {
    const input = await api.post('users/token', payload)

    console.log(input)

    const output = {result: true, email: payload.email}

    // global token varibal set value once the get result is ok
    if (input.ok) {
      token = input.data.auth_token
    }

    // equal of sign in result
    expect(input.ok).toEqual(output.result)
    // equal of sign in email accont
    expect(input.data.user.email).toEqual(output.email)
  })

  // subscription and unsubscription products lists test
  test('Product lists test', async () => {
    // add token for using the getbundles api
    api.setHeader('Authorization', 'Bearer ' + token)

    const input = await api.get(`bundles/${app.slug}`)

    // output the value
    // unsub is the unsubscrption production lists
    // in here, set value 11 based on the current api results
    // sub is the subscription production lists
    // in here, set value 10 based on the current api resutls
    // once the products are changed in the backend, need to changed the value of unsub and sub
    const output = {result: true, unsub: 11, sub: 10}

    console.log(input)

    console.log(input.data.bundle.unsubscribed.length)
    console.log(input.data.bundle.app_store_iaps.length)

    // product list getting result
    expect(input.ok).toEqual(output.result)

    // product list unsubscribed length equal
    expect(input.data.bundle.unsubscribed.length).toEqual(output.unsub)

    // product list subscripbed length equal
    expect(input.data.bundle.app_store_iaps.length).toEqual(output.sub)
  })
})
