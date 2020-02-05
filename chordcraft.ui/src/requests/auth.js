import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

// axios.interceptors.request.use(function (request) {
//   const token = sessionStorage.getItem('token');

//   if (token != null) {
//       request.headers.Authorization = `Bearer ${token}`;
//   }

//   return request;
// }, function (err) {
//   return Promise.reject(err);
// });

const getCurrentUserJwt = () => firebase
  .auth()
  .currentUser.getIdToken()
  .then(token => sessionStorage.setItem('token', token));

axios.interceptors.request.use(
  request => getCurrentUserJwt()
    .then(() => {
      const token = sessionStorage.getItem('token');
      if (token != null) {
        // if (token != null && request.url.startsWith('https://localhost:44301')) {
          request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    })
    .catch(error => console.error(error)),
  err => Promise.reject(err),
);

const loginGoogle = () => {
  //sub out whatever auth method firebase provides that you want to use.
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider).then(cred => {
    //get token from firebase
    cred.user.getIdToken()
        //save the token to the session storage
      .then(token => sessionStorage.setItem('token',token));

    //register user
    // registerUser();
  });
};

const logoutUser = () => {
  return firebase.auth().signOut();
};

export default { loginGoogle, logoutUser };
