import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

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
    this.db = app.database();
  }

  /*
   * AuthN API *
   */

  // TODO: 2020/10/03 jagretz - for each method, implement error handling

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

  /*
   * Merge Auth and DB User API *
   */

  /*
  TODO: 2020/10/31 jagretz - docs
  @description
  Provides two callback functions to this new method, which are executed
  based on whether the user is authenticated or not

  @param {function} next - callback to be invoked for authorized users
  @param {function} fallback - callback to be invoked for non-authorized users
  */
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            const updatedUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(updatedUser);
          });
      } else {
        fallback();
      }
    });

  /*
  * User API *

  Notes:
  - paths in the ref() method match the location where entities (users)
    are stored in Firebase's realtime database API.

  Refer to [realtime database setup for the Web](https://firebase.google.com/docs/database/web/start)
  Read [Choose a database solution](https://firebase.google.com/docs/database/rtdb-vs-firestore#key_considerations)
  */

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");
}
