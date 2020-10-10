/**
 * @module hooks/useSession
 * @description firebase session... description TBD.
 */
import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "components/Firebase";

export function useSession() {
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const authEventListener = firebase.auth.onAuthStateChanged((authUser) => {
      // eslint-disable-next-line no-unused-expressions
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });

    // removes the firebase auth event listener when the component unmounts.
    return () => authEventListener();
    /*
    Call useEffect with no-args or the #authUser.
    This is important. If anything changes with the authenticated user,
    The app should react appropriately.
    */
  }, [authUser]);

  return authUser;
}
