import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Superheroes from "./screens/Superheroes/Superheroes";
import Error from "./screens/Error/Error";
import HeroInfo from './screens/HeroInfo/HeroInfo';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/heroes/:heroSlug" element={<HeroInfo/>} />
                <Route path="/" element={<Superheroes/>}/>
                <Route path="*" element={<Error/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App