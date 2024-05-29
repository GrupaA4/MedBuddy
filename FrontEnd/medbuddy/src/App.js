import './App.css';
import Home from './Patient/pages/home/page';
import ChatPage from './Patient/pages/chat/page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Diagnoses from './Patient/pages/diagnoses/page';
import Register from './Patient/pages/register/register';
import Profile from './Patient/pages/profile/profile';
import Contact from './Patient/pages/contact/page';
import About from './Patient/pages/about/page';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/diagnoses" element={<Diagnoses />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
