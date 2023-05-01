// @ts-ignore
import React, {StrictMode} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {render} from 'react-dom';
// @ts-ignore
import {App} from './App.tsx';
// @ts-ignore
import {AppContextProvider} from "./context/AppContext.tsx";

const withStrictModeAndContext = () => (
  <StrictMode>
    <AppContextProvider>
      <App/>
    </AppContextProvider>
  </StrictMode>
);

const root = document.getElementById('root');

render(withStrictModeAndContext(), root);
