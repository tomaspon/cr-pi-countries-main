import Home from "./components/home/Home";
import Landing from "./components/landing/Landing"
import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'

const App = () => {
  return (
  <div>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}
export default App
