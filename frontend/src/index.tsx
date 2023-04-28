import React, {StrictMode} from 'react';
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
