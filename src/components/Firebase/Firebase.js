import app from "firebase/app";
import "firebase/auth";

/**
 * The `REACT_APP_` env-variable prefix is required for apps bootstropped
 * with create-react-app.
 */
const firebaseConfig = Object.freeze({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

// firebase interface
// implements firebase Auth API
export default class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
  }

  // TODO: 2020/10/03 jagretz - needs to be resolved later on - for each method
  // TODO: 2020/10/03 jagretz - implement error handling - for each method

  // is asynchronous
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // is asynchronous
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // is asynchronous
  doSignOut = () => this.auth.signOut();

  // is asynchronous
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // is asynchronous
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
}
