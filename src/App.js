import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from './web/components/Header';
import Footer from './web/components/Footer';
import Main from './web/Main';
import Signin from './web/routes/Signin';
import Signup from './web/routes/Signup';

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                {/* <Header /> */}
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App