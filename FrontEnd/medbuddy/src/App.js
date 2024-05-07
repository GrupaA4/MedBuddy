import './App.css';
import Header from './_componentsReusable/header/page.jsx';
import Footer from './_componentsReusable/footer/page.jsx';
import Home from './pages/home/page.jsx'; 
import { useState } from 'react';
function App() {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  return (
    <>
    <Header setIsMobileMenu={setIsMobileMenu}/>
      {!isMobileMenu &&
       <>
      <Home />
      <Footer />
      </>}
    </>
  );
}

export default App;
