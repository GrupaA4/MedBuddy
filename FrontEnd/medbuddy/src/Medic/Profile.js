
import './Profile.css';
import Footer from './Footer' ;
import Navbar from './Navbar' ;
import Logo from './logo.png';


function Profile() {
  return (

    <div className="Profile">
      
      <div className='navbar-container'>
        <Navbar/>
      </div>

        <div className="content">
          <div className="left-container">
          <div className="profile-picture">p
          </div>
        <div className="buttons-container">
        <a href="#" className="button">Edit Profile</a>
        <a href="#" className="button">Change Password</a>
        <a href="#" className="button">Delete Account</a>
        </div>
      
          </div>
          <div className="general-information"></div>
        </div>

        <div className="footer-container"><Footer/>
        </div>

        



    </div>
  );
}

export default Profile;
