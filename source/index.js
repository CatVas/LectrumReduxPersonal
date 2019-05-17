// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './model';

// Instruments
import './theme/init';

// App
import App from './pages/App';

const renderApp = (
    <Provider store = { store }>
        <App />
    </Provider>
);

render(
    renderApp,
    document.getElementById('app')
);
