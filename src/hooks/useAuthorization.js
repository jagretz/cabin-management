/**
 * @module hooks/useAuthorization
 * @description firebase authorization (auth-z)... description TBD.
 */
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "components/Session";
import { SIGN_IN } from "constants/routes";
// import { FirebaseContext } from "components/Firebase";

// _Extremely_ broad authz check... it's basically just a null check
const authCondition = (user) => !!user;

export const hasRole = (role) => (user) => !!user?.roles[role];

/*
Auth using firebase event listeners
*/

/*
TODO: 2020/10/31 jagretz - docs
- Get the authenticated user from context
- Route user based first on if they are authenticated and second, their user/authz roles
*/
// export function useAuthorization(condition = authCondition) {
//   /*
//   Not much here yet, but in the future, you can add more complex authz,
//   route-based authz or however you want to handle the complexity base on the
//   needs of the application.
//   */

//   const history = useHistory();
//   // const user = useContext(SessionContext);
//   const firebase = useContext(FirebaseContext);

//   useEffect(() => {
//     firebase.onAuthUserListener(
//       (user) => {
//         if (!condition(user)) {
//           // redirect if not authorized
//           history.push(SIGN_IN);
//         }
//       },
//       () => {
//         history.push(SIGN_IN);
//       }
//     );

//     // otherwise, the user is authorized and may stay on the page
//   }, [firebase, condition]);
// }

/*
Auth using context
*/

export function useAuthorization(condition = authCondition) {
  const user = useContext(SessionContext);
  const history = useHistory();

  useEffect(() => {
    if (!condition(user)) {
      // redirect if not authorized
      history.push(SIGN_IN);
    }

    // otherwise, the user is authorized and may stay on the page
  }, [user]);
}
