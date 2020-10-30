import React from "react";
import PropTypes from "prop-types";

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
  value: PropTypes.any,
  children: PropTypes.any,
};
