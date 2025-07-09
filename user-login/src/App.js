
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './login';
import ResetPassword from './ResetPassword';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
