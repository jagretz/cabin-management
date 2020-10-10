import React from "react";
import { PasswordForgetForm } from "components/PasswordForget/PasswordForget";
import PasswordChangeForm from "components/PasswordChange/PasswordChange";

// The Account page serves as the central place a users to manage their account.
// FIXME: 2020/10/10 jagretz - this page should only be accessible to authenticated users.
export default function Account() {
  return (
    <div>
      <h1>Account</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );
}
