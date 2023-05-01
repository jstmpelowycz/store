// @ts-ignore
import React, {useCallback, useState} from "react";
// @ts-ignore
import {Login} from "./components/Login/Login.tsx";
// @ts-ignore
import {Signup} from "./components/SignUp/Signup.tsx";
// @ts-ignore
import {Toolbar} from "./components/Toolbar/Toolbar.tsx";
// @ts-ignore
import {AuthPage} from "./components/AuthPage/AuthPage.tsx";
import {AnyFunction, CreateEmployeeFields, Employee, Throwable} from "./typedefs";

export const useSignup = async (
  fields: CreateEmployeeFields,
  onSuccess: AnyFunction
): Promise<Throwable<Employee>> => {
  const response = await fetch('/employee/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fields),
  });

  if (!response.ok) {
    throw new Error('Failed to sign up employee');
  }

  onSuccess();

  return response.json();
}

export const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAuthorize = (shouldAuthorize: boolean) => {
    setIsAuthorized(shouldAuthorize);
  }

  return <AuthPage onAuthorize={handleAuthorize}/>
};
