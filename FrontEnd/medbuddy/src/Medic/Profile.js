import logo from './logo.png';
import './Profile.css';
import Footer from './Footer' ;



function Profile() {
  return (

    <div className="Profile">
      
      <div className="navbar">
      <img src={logo} className="logo" alt="logo"  />
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Settings</a></li>
            </ul>

        </div>

        <div className="content">

        </div>

        <div className="footer-container"><Footer/>
        </div>

        



    </div>
  );
}

export default Profile;
