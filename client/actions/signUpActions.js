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
        // .then(res => res.json())
        //   .then(json => {
        //     console.log('json', json);
        //     if (json.success) {
        //       this.setState({
        //         signUpError: json.message,
        //         isLoading: false,
        //         signUpEmail: '',
        //         signUpPassword: '',
        //       });
        //     } else {
        //       this.setState({
        //         signUpError: json.message,
        //         isLoading: false,
        //       });
        //     }
        //   });
    }
}