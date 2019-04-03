import 'whatwg-fetch';

export function userSignUpRequest(userData) {
  return dispatch => {
    return fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword
      }),
    })
  }
}

export function getAuthors(authorData) {
  return dispatch => {
    return fetch('/api/account/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: authorData.email,
        additionalEmails: authorData.additionalEmails,
        usernames: authorData.usernames,
        fname: authorData.fname,
        lname: authorData.lname
      }),
    })
}
}