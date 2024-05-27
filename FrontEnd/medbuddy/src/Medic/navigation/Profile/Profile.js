
import './Profile.css';
import Footer from '../common-components/Footer' ;
import Navbar from '../common-components/Navbar' ;
import Logo from '../common-components/logoB.png';


function Profile() {
  return (

    <div className="Profile">
      <div className="body">
      <div className='navbar-container'>
        <Navbar/>
      </div>

        <div className="content">
          <div className="left-container">
          <div className="profile-picture">
        <img src={Logo} alt="pfp" />
        </div>
        <div className="buttons-container">
        <a href="#" className="button">Edit Profile</a>
        <a href="#" className="button">Change Password</a>
        <a href="#" className="button">Delete Account</a>
        </div>
    
          </div>
          
          <div className="general-information">
            <h2 className="general-information-title">
              GENERAL INFORMATION
            </h2>
            <div className='general-information-container'>
              <div className='list-1'>
                <p>Name</p>
                <p>Surname</p>
                <p>Email</p>
                <p>Work Phone</p>
                <p>City</p>
                <p>Country</p>
                <p>Hospital/Work Place</p>
                <p>Specialization</p>
              </div>
              <div className='list-2'>
              <p>My Name</p>
                <p>My Surname</p>
                <p>example@gmail.com</p>
                <p>+0000000000</p>
                <p>My City</p>
                <p>My Country</p>
                <p>Hospital/Work Place</p>
                <p>Specialization</p>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="footer-container"><Footer/></div>
        
        



    </div>
  );
}

export default Profile;
