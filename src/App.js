import React, {Component} from 'react';
import Header from "./components/Layout/Header";
import {CssBaseline} from "@material-ui/core";
import MainPage from "./components/MainPage";

class App extends Component {

    render() {
        return (
            <>
                <CssBaseline />
                <Header />
                <MainPage />
            </>
        );
    };
}

export default App;
