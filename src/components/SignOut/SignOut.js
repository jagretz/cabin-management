import React, { useContext } from "react";
import { FirebaseContext } from "components/Firebase";

export default function SignOut() {
  const firebase = useContext(FirebaseContext);

  return (
    <button type="button" onClick={() => firebase.doSignOut()}>
      Sign Out
    </button>
  );
}
