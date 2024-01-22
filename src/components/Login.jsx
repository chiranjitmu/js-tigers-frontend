import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <button onClick={() => loginWithRedirect()}>Continue with Log In</button>
    </>
  );
}

export default Login;
