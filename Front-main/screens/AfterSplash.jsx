import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import Main from "./Main";

export default function AfterSplash() {
  const [isSigned, setIsSigned] = useState(false);
  const user = useSelector((state) => state["userReducer"]["email"]);

  useEffect(() => {
    if (user) {
      setIsSigned(true);
    }
  }, [user]);

  return (
    <>
      {/* {isSigned ? (
        <Main setIsSigned={setIsSigned} />
      ) : (
        <Login setIsSigned={setIsSigned} />
      )} */}
      <Main setIsSigned={setIsSigned} />
    </>
  );
}
