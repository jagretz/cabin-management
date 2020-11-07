import React, { useContext, useState } from "react";
import { FirebaseContext } from "components/Firebase";
import { SessionContext } from "components/Session";

// checks if the authenticated user has a verified
// email and an email/password sign in on associated with it.
// If the user has only social logins, it doesn’t matter if the email is not verified.
const needsEmailVerification = (user) =>
  user &&
  !user.emailVerified &&
  user.providerData.map((provider) => provider.providerId).includes("password");

export const useEmailVerification = (/* props */) => {
  const user = useContext(SessionContext);

  return needsEmailVerification(user);
};

export function VerifyEmail(/* props */) {
  const firebase = useContext(FirebaseContext);
  const [isSendingVerificationEmail, setIsSendingVerificationEmail] = useState(
    false
  );

  const messageContent = isSendingVerificationEmail ? (
    <p>
      E-Mail confirmation sent: Check you E-Mail inbox (and spam folder) for a
      confirmation E-Mail.
    </p>
  ) : (
    <p>
      Please verify your E-Mail: Check your E-Mail inbox (and spam folder) for a
      confirmation E-Mail.
    </p>
  );

  return (
    <div>
      {messageContent}

      <button
        type="button"
        disabled={isSendingVerificationEmail}
        onClick={() => {
          setIsSendingVerificationEmail(true);
          firebase.doSendEmailVerification();
        }}
      >
        Resend confirmation E-Mail
      </button>
    </div>
  );
}
