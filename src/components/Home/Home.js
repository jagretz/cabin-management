import React from "react";
import { useAuthorization } from "hooks/useAuthorization";

export default function Home() {
  // TODO: 2020/10/24 jagretz - it would be annoying to add this hook for every
  // route we want to "protect" from unauthorized use.
  // Let us think of another way to handle this functionality.
  useAuthorization();

  return (
    <div>
      <h1>Home</h1>
      <p>The Home Page is accessible by every signed in user.</p>
    </div>
  );
}
