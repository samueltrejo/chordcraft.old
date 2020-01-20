import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

import userData from '../data/user-data';

axios.interceptors.request.use(function (request) {
  const token = sessionStorage.getItem('token');

  if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, function (err) {
  return Promise.reject(err);
});

const registerUser = (cred) => {
  //check if user exists
  userData.getByUid(cred.user.uid)
    .then(response => {
      let user;
      if (!response.data) user = {  email: cred.user.email }
      else user = response.data;
      userData.register(user);
    })
    .catch(error => console.error(error));
};

const loginGoogle = () => {
  //sub out whatever auth method firebase provides that you want to use.
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider).then(cred => {
    //get token from firebase
    cred.user.getIdToken()
        //save the token to the session storage
      .then(token => sessionStorage.setItem('token',token));

    //register user
    registerUser(cred);
  });
};

const logoutUser = () => {
  return firebase.auth().signOut();
};

export default { loginGoogle, logoutUser };
