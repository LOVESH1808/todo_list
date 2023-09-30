import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ToDo from "../ToDo";
import '../index.css';
const LoginButton = () => {
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();

  if(!isAuthenticated)
  return (

  <div className="loginA">
    <h1>ToDo List using Local Storage</h1>
    <button onClick={() => loginWithRedirect()}>Log In</button>
  </div>
  )
  else
  return (
    <><ToDo /></>
  );
};

export default LoginButton;