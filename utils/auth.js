import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/checkUser/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } if (resp.status === 404) {
      // User not found
        return false;
      }
      return console.warn('error');
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const registerUser = (userInfo) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/register`, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        return resolve(null); // or reject an error, depending on how you want to handle it
      }
      return resolve(resp.json());
    })
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    const { user } = result;
    const userInfo = {
      id: user.uid,
      firstName: user.displayName.split(' ')[0],
      lastName: user.displayName.split(' ')[1] || '',
      email: user.email,
      seller: false,
    };

    checkUser(user.uid).then((backendUser) => {
      console.warn('backend user response', backendUser);
      if (!backendUser) {
        console.warn(userInfo);
        registerUser(userInfo).then(() => {
          console.warn('User registered in backend');
        }).catch((err) => console.error('Error registering user:', err));
      } else {
        console.warn('user already exists in backend');
      }
    }).catch((err) => console.error('error checking user:', err));
  }).catch((err) => console.error('error signing in:', err));
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, //
  signOut,
  checkUser,
  registerUser,
};
