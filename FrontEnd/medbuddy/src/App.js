import './App.css';
import Home from './Patient/pages/home/page';
import ChatPage from './Patient/pages/chat/page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Diagnostic from './Patient/pages/diagnoses/page';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/diagnostics" element={<Diagnostic />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
