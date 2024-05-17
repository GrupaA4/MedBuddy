import './App.css';
import Header from './Patient/_componentsReusable/header/page.jsx';
import Footer from './Patient/_componentsReusable/footer/page.jsx';
import Home from './Patient/pages/home/page.jsx'; 
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
