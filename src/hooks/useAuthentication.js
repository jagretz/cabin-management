/**
 * @module hooks/useAuthentication
 * @description firebase authentication (auth-n)... description TBD.
 */
import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "components/Firebase";

const AUTH_USER = "authUser";

/*
TODO: 2020/10/31 jagretz - docs
- the authenticated user can be provided via React’s Context API.
  - The user object is a merge of the firebase authUser and the database user.
*/
export function useAuthentication() {
  // TODO: 2020/11/03 jagretz - create or install a useSessionStorage hook to
  // handle error and corner cases and all the use cases.
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const authEventListener = firebase.onAuthUserListener(
      (authUser) => {
        // add JSON.stringify safety check
        localStorage.setItem(AUTH_USER, JSON.stringify(authUser));
        setUser(authUser);
      },
      () => {
        localStorage.removeItem(AUTH_USER);
        setUser(null);
      }
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
