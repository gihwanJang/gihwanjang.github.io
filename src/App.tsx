import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Container from 'layouts/container';
import { MAIN_PATH, POST_PATH } from 'constant';
import Post from 'views/post';
import Home from 'views/home';

function App() {
    return (
        <Routes>
            <Route element={<Container />}>
            <Route path={MAIN_PATH()} element={<Home />} />
                <Route path={POST_PATH()} element={<Post />} />
                <Route path='*' element={<h1>404 Not Found</h1>} />
            </Route>
        </Routes>
    );
}

export default App;
