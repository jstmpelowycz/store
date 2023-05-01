// @ts-ignore
import React, {FC, useEffect, useState} from "react";
// @ts-ignore
import {Login} from "../Login/Login.tsx";
// @ts-ignore
import {Signup} from "../SignUp/Signup.tsx";

const CURR_AUTH_VIEW_LS_KEY = 'currentAuthView';

enum AuthView {
  Login = 'login',
  Signup = 'signup',
}


export const AuthPage: FC = () => {
  const [currentAuthView, setCurrentAuthView] = useState(() => {
    const storedAuthView = localStorage.getItem(CURR_AUTH_VIEW_LS_KEY);

    if (storedAuthView === AuthView.Login || storedAuthView === AuthView.Signup) {
      return storedAuthView;
    }

    return AuthView.Signup;
  });

  const handleSwitchAuthView = () => {
    if (currentAuthView === AuthView.Login) {
      setCurrentAuthView(AuthView.Signup);
    } else {
      setCurrentAuthView(AuthView.Login);
    }
  };

  useEffect(() => {
    localStorage.setItem(CURR_AUTH_VIEW_LS_KEY, currentAuthView);
  }, [currentAuthView]);

  switch (currentAuthView) {
    case AuthView.Login:
      return <Login onSwitchAuthView={handleSwitchAuthView}/>
    case AuthView.Signup:
    default:
      return <Signup onSwitchAuthView={handleSwitchAuthView}/>
  }
}
