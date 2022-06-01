import React from 'react';
import './index.css';
import App from './App'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root')
const root = createRoot(container);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed, error:', err);
        });
}

root.render(
    <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </ChakraProvider>
);