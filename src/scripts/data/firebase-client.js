/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA4VyRINy0Dc1rmnaH-IQv4aotgtadIhcc',
  authDomain: 'farm-fresh-d8e1b.firebaseapp.com',
  databaseURL: 'https://farm-fresh-d8e1b-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'farm-fresh-d8e1b',
  storageBucket: 'farm-fresh-d8e1b.appspot.com',
  messagingSenderId: '463276082923',
  appId: '1:463276082923:web:078e7f6efe52bdf99360ae',
  measurementId: 'G-S4W9PQ4073',
};

const app = initializeApp(firebaseConfig);

export default app;
