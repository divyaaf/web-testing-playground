import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UiElements from "./pages/UiElements";
import DynamicElements from "./pages/DynamicElements";
import ComplexForm from "./pages/ComplexForm";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="ui-elements" element={<UiElements />} />
        <Route path="dynamic-elements" element={<DynamicElements />} />
        <Route path="complex-form" element={<ComplexForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
