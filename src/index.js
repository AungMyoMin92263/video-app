import React from 'react';
import './index.css';
import App from './App'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root')
const root = createRoot(container);
root.render(
    <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </ChakraProvider>
);