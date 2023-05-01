// @ts-ignore
import React, {StrictMode} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {render} from 'react-dom';

// @ts-ignore
import {App} from './App.tsx';

const withStrictMode = () => (
  <StrictMode>
    <App/>
  </StrictMode>
);

const root = document.getElementById('root');

render(withStrictMode(), root);
