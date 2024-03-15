import React, {Component} from 'react';
import Header from "./components/Layout/Header";
import {CssBaseline} from "@material-ui/core";
import MainPage from "./components/MainPage";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ImageView from "./components/UI/ImageModal";


class App extends Component {
    render() {
        return (
            <Router>
                <CssBaseline/>
                <Header/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/image/:imageSlug" element={<ImageView/>}/>
                </Routes>
            </Router>
        );
    }
}

export default App;

