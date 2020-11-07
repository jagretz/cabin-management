import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FirebaseContext } from "components/Firebase";
import { useAuthorization, hasRole } from "hooks/useAuthorization";
import { ADMIN } from "constants/roles";
import { useEmailVerification, VerifyEmail } from "hooks/useEmailVerification";

export default function Admin() {
  // TODO: 2020/10/24 jagretz - it would be annoying to add this hook for every
  // route we want to "protect" from unauthorized use.
  // Let us think of another way to handle this functionality.
  useAuthorization(hasRole(ADMIN));

  const firebase = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const requiresEmailVerfication = useEmailVerification();

  useEffect(() => {
    // add a listener for any changes to the users in our database
    firebase.users().on("value", (snapshot) => {
      const usersSnapshot = snapshot.val();
      const usersList = Object.keys(usersSnapshot).map((key) => ({
        ...usersSnapshot[key],
        uid: key,
      }));

      setUsers(usersList);
      setIsLoading(false);
    });

    // remove the listener
    return () => firebase.users().off();
    // }, [firebase]);
  }, []);

  if (requiresEmailVerfication) {
    return <VerifyEmail />;
  }

  return (
    <div>
      <h1>Admin</h1>

      {isLoading && <p>Loading users...</p>}

      <UserList users={users} />
    </div>
  );
}

function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
        </li>
      ))}
    </ul>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      //
    })
  ).isRequired,
};
