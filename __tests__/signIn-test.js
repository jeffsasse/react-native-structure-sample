/* 
created on Jan, 12th 2021 by jaywjohnson
*/

import apisauce from 'apisauce'

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
describe('Sign In Api test function', () => {
  // sign in test
  test('Sign In test', async () => {
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
})
