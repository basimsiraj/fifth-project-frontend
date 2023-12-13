import { createContext, useEffect, useState } from "react";
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import "./App.css";
import Nav from "./components/includes/Nav";
import AddRecipie from "./components/screens/AddRecipie";
import Foods from "./components/screens/Foods";
import Login from "./components/screens/Login";
import NoMatch from "./components/screens/NoMatch";
import SignUp from "./components/screens/SignUp";
import SingleFood from "./components/screens/SingleFood";
import UpdateRecipe from "./components/screens/UpdateRecipe";

export const UserContext = createContext();
function App() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const updateUserData = (action) => {
    switch (action.type) {
      case "LOGOUT":
        setUserData(null);
        localStorage.clear();
        break;
      case "LOGIN":
        setUserData(action.payload);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user_data")));
    setLoading(false);
  }, []);
  return (
    <>
      <UserContext.Provider value={{ userData, updateUserData }}>
        <Router>
          <Nav />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/auth/register/" exact element={<SignUp />} />
            <Route exact path="/home" element={<Foods />} />
            <Route exact path="/home/add/" element={<AddRecipie />} />
            <Route exact path="/description/:id"element={<SingleFood />} />
            <Route path="/description/:id/update/:ID" element={<UpdateRecipe />} />
            <Route  path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
