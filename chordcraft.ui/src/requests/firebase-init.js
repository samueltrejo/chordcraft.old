import firebase from 'firebase/app';
import firebaseConfig from './config.js';

export default () => {
  firebase.initializeApp(firebaseConfig);
};
