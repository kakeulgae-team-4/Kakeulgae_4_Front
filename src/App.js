import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Footer from './web/components/Footer';
import Main from './web/Main';
import Signin from './web/routes/Signin';
import Signup from './web/routes/Signup';
import Mypage from './web/components/Mypage';

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/mypage' element={<Mypage />}/>
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App