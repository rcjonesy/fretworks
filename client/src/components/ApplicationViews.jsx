import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./Home";
import { CustomerHome } from "./CustomerHome";
import { Welcome } from "./Welcome";
import { NewRepair } from "./NewRepair";
import { EditRepair } from "./EditRepair";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Welcome />} />
        <Route
          path="admin"
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <Home loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }></Route>
        <Route
          path="customer/:userId"
          element={<CustomerHome setLoggedInUser={setLoggedInUser} />}
        />

        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="newrepair"
          element={<NewRepair loggedInUser={loggedInUser} />}
        />
        <Route path="editrepair/:repairId"
          element={<EditRepair loggedInUser={loggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
