import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./components/Contacts";
export default function App() {
  return (
    <BrowserRouter basename="/Chat-App">
      <Routes>
      <Route path="/" element={<Contacts />} />
      <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        
      </Routes>
    </BrowserRouter>
  );
}
