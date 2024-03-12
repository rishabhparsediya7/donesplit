import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AddGroups from "./components/AddGroups";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import Groups from "./components/Groups";
import EachGroup from "./components/EachGroup";
import Friends from "./components/Friends";
import { useEffect } from "react";
import CreateExpense from "./components/CreateExpense";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-groups"
          element={
            <ProtectedRoute>
              <AddGroups />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />
        <Route
          path="/group/:groupId"
          element={
            <ProtectedRoute>
              <EachGroup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-expense"
          element={
            <ProtectedRoute>
              <CreateExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
