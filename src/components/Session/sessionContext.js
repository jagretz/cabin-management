import React from "react";
import propTypes from "prop-types";

const SessionContext = React.createContext({ authUser: null });
export { SessionContext };

export function SessionProvider({ value, children }) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

SessionProvider.propTypes = {
  value: propTypes.any,
  children: propTypes.any,
};
