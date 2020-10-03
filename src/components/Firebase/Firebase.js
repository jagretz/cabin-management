import app from "firebase/app";

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

export default class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
  }
}
