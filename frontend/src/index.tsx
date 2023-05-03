import {StrictMode} from 'react';
import {App} from './App';
import {AppContextProvider} from "./context/AppContext";
import {createRoot} from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';

const withStrictModeAndContext = () => (
  <StrictMode>
    <AppContextProvider>
      <App/>
    </AppContextProvider>
  </StrictMode>
);

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(withStrictModeAndContext());
