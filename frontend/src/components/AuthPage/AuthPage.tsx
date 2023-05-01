// @ts-ignore
import React, {FC, useEffect, useState} from "react";
// @ts-ignore
import {Login} from "../Login/Login.tsx";
// @ts-ignore
import {Signup} from "../SignUp/Signup.tsx";

export enum AuthView {
  Login,
  Signup,
}

export const AuthPage: FC = () => {
  const [
    currentAuthView,
    setCurrentAuthView,
  ] = useState<AuthView>(AuthView.Login);

  const handleSwitchAuthView = () => {
    if (currentAuthView === AuthView.Login) {
      setCurrentAuthView(AuthView.Signup);
    } else {
      setCurrentAuthView(AuthView.Login);
    }
  };

  switch (currentAuthView) {
    case AuthView.Login:
      return <Login onSwitchAuthView={handleSwitchAuthView}/>
    case AuthView.Signup:
    default:
      return <Signup onSwitchAuthView={handleSwitchAuthView}/>
  }
}
