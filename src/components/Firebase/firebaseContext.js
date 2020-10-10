import React from "react";
import propTypes from "prop-types";

const FirebaseContext = React.createContext(null);
export { FirebaseContext };

export function FirebaseProvider({ value, children }) {
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

FirebaseProvider.propTypes = {
  value: propTypes.any,
  children: propTypes.any,
};
