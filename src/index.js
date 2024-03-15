import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@material-ui/core";
import App from './App';

const theme = createTheme();

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Router>
            <App />
        </Router>
    </ThemeProvider>,
    document.getElementById('root')
);

