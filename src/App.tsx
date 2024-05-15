import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Container from 'layouts/container';

function App() {
    return (
        <Routes>
            <Route element={<Container />}>
                <Route path='*' element={<h1>404 Not Found</h1>} />
            </Route>
        </Routes>
    );
}

export default App;
