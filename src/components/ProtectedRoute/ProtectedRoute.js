import {Navigate} from "react-router-dom";

export default function ProtectedRoute({loggedIn, element : Component, ...props}){
  return (
    loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
  );
}