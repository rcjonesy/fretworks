import { useEffect, useState } from "react";
import { tryGetLoggedInUser } from "./managers/authManager";
import { Spinner } from "reactstrap";
import NavBar from "./components/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    // user will be null if not authenticated
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);

  // wait to get a definite logged-in state before rendering
  if (loggedInUser === undefined) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <ApplicationViews
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
    </>
  );
}

export default App;

// -In app.js the logged in user state is set up (intially empty)
// -useeffect runs on intital render only.
// if logged in user is undefined the spinner will be returned
// -ON INTIAL RENDER still-In app.js if the logged in user state isn't null (like they are logged in and manually refreshed the page) the TryGetLoggedInUSer function in the useeffect runs and fetches all the loggedInUsers info. (name, address, roles etc...)
// -in login.js the user enters their credentials. upon submission the login request is sent checking to see if that person exists in the database.
// -If that person exists the loggedInUser state is updated to that person via the setloggedinuser() passed a a prop from app.jsx (the useeffect will NOT run again in app.jsx)
// -Once that is in place the logged in user is passd to the NavBar and into Application Views.
// -roles if any are passed to authorized route as an array ["admin", "x", "y" etc]
// -Children are component(s) are rendered if authorized
