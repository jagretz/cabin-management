/**
 * @module hooks/useAuthentication
 * @description firebase authentication (auth-n)... description TBD.
 */
import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "components/Firebase";

/*
TODO: 2020/10/31 jagretz - docs
- the authenticated user can be provided via React’s Context API.
  - The user object is a merge of the firebase authUser and the database user.
*/
export function useAuthentication() {
  const [user, setUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const authEventListener = firebase.onAuthUserListener(
      (authUser) => setUser(authUser),
      () => setUser(null)
    );

    // removes the firebase auth event listener when the component unmounts.
    return () => authEventListener();
    /*
    Call useEffect with args the "to-be authenticated" user.
    This is important. If anything changes with the authenticated user,
    The app should react appropriately.
    */
    // }, [user, firebase]);
  }, [firebase]);

  return user;
}
