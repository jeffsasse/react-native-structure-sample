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
describe('Sign Up Api test function', () => {
  // sign up test
  test('Sign Up test', async () => {
    const input = await api.post('users', payload)

    console.log(input)

    const output = true

    expect(input.ok).toEqual(output)
  })
})
