import React from "react";
import { PasswordForgetForm } from "components/PasswordForget/PasswordForget";
import PasswordChangeForm from "components/PasswordChange/PasswordChange";
import { useAuthorization } from "hooks/useAuthorization";
import { useEmailVerification, VerifyEmail } from "hooks/useEmailVerification";

// The Account page serves as the central place a users to manage their account.
// FIXME: 2020/10/10 jagretz - this page should only be accessible to authenticated users.
export default function Account() {
  // TODO: 2020/10/24 jagretz - it would be annoying to add this hook for every
  // route we want to "protect" from unauthorized use.
  // Let us think of another way to handle this functionality.
  useAuthorization();
  const requiresEmailVerfication = useEmailVerification();

  if (requiresEmailVerfication) {
    return <VerifyEmail />;
  }

  return (
    <div>
      <h1>Account</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );
}
