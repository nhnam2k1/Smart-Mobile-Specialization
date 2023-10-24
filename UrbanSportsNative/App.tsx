import * as React from "react";
import MainContainer from "./navigation/mainContainer";
import Login from "./navigation/Screens/Login";
import { useState } from "react";

export default function App() {
  const [openPopup, setLoggedInStatus] = useState(false);

  return openPopup ? (
    <MainContainer />
  ) : (
    <Login setLoggedInStatus={setLoggedInStatus} />
  );
}