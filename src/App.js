import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Footer from './web/components/Footer';
import Filter from './web/components/Filter';
import Main from './web/Main';
import Signin from './web/routes/Signin';
import Signup from './web/routes/Signup';
import Mypage from './web/routes/Mypage';
import Allrecruit from './web/routes/Allrecruit';

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/mypage' element={<Mypage />}/>
                    <Route path='/allrecruit' element={<Allrecruit />}/>
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
