
import Home from "./components/home/Home";
import Landing from "./components/landing/Landing"
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";

import React from "react";
import { Routes, Route } from "react-router-dom";


import './App.css'

const App = () => {
  return (
  <div>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/activity" element={<Form />}/>
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
