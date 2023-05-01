// @ts-ignore
import React, {useState} from "react";
// @ts-ignore
import {Login} from "./components/Login/Login.tsx";
// @ts-ignore
import {Signup} from "./components/SignUp/Signup.tsx";
// @ts-ignore
import {Toolbar} from "./components/Toolbar/Toolbar.tsx";
// @ts-ignore
import {AuthPage} from "./components/AuthPage/AuthPage.tsx";
// @ts-ignore
import {HomePage} from "./components/HomePage/HomePage.tsx";
// @ts-ignore
import {useAppContext} from "./context/AppContext.tsx";

export const App = () => {
  const {currentEmployee} = useAppContext();

  return (
    <>
      {!currentEmployee
        ? <AuthPage/>
        : (
          <>
            <Toolbar/>
            <HomePage/>
          </>
        )
      }
    </>
  )
};
