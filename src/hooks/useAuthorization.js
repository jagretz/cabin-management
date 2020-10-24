/**
 * @module hooks/useAuthorization
 * @description firebase authorization (auth-z)... description TBD.
 */
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "components/Session";
import { SIGN_IN } from "constants/routes";

// _Extremely_ broad authz check... it's basically just a null check
const authCondition = (authSubject) => !!authSubject;

export function useAuthorization(condition = authCondition) {
  /*
  Not much here yet, but in the future, you can add more complex authz,
  route-based authz or however you want to handle the complexity base on the
  needs of the application.
  */

  const history = useHistory();
  const authUser = useContext(SessionContext);

  if (!condition(authUser)) {
    history.push(SIGN_IN);
  }
}
