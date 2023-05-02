// @ts-ignore
import React, {StrictMode} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore
import {App} from './App.tsx';
// @ts-ignore
import {AppContextProvider} from "./context/AppContext.tsx";
import {createRoot} from 'react-dom/client';

const withStrictModeAndContext = () => (
    <StrictMode>
        <AppContextProvider>
            <App/>
        </AppContextProvider>
    </StrictMode>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(withStrictModeAndContext());
