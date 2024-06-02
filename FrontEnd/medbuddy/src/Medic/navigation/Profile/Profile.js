import React, { useState } from 'react';
import './Profile.css';
import Footer from '../common-components/Footer';
import Navbar from '../common-components/Navbar';
import Logo from '../common-components/logoB.png';

function Profile() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'My Name',
    surname: 'My Surname',
    email: 'example@gmail.com',
    workPhone: '+0000000000',
    city: 'My City',
    country: 'My Country',
    workPlace: 'Hospital/Work Place',
    specialization: 'Specialization'
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Save changes logic here
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Optionally reset changes here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="Profile">
      <div className="body-profile">
        <div className='navbar-container-profile'>
          <Navbar />
        </div>
        <div className="content-profile">
          <div className="left-container-profile">
            <div className="profile-picture-profile">
              <img src={Logo} alt="pfp" />
            </div>
            <div className="buttons-container-profile">
            <button className="button-profile" onClick={handleEditClick}>Edit Profile</button>
              <button className="button-profile">Change Password</button>
              <button className="button-profile" onClick={togglePopup}>Delete Account</button>
            </div>
          </div>
          <div className="general-information-profile">
            <h2>GENERAL INFORMATION</h2>
            <div className='general-information-container-profile'>
              <div className='list-1-profile'>
                <p>Name</p>
                <p>Surname</p>
                <p>Email</p>
                <p>Work Phone</p>
                <p>City</p>
                <p>Country</p>
                <p>Hospital/Work Place</p>
                <p>Specialization</p>
              </div>
              <div className='list-2-profile'>
              {isEditing ? (
                  <>
                    <input class="input_field" type="text" name="name" value={profileData.name} onChange={handleChange} />
                    <input class="input_field" type="text" name="surname" value={profileData.surname} onChange={handleChange} />
                    <input class="input_field" type="email" name="email" value={profileData.email} onChange={handleChange} />
                    <input class="input_field" type="text" name="workPhone" value={profileData.workPhone} onChange={handleChange} />
                    <input class="input_field" type="text" name="city" value={profileData.city} onChange={handleChange} />
                    <input class="input_field" type="text" name="country" value={profileData.country} onChange={handleChange} />
                    <input class="input_field" type="text" name="workPlace" value={profileData.workPlace} onChange={handleChange} />
                    <p>{profileData.specialization}</p>
                  </>
                ) : (
                  <>
                    <p>{profileData.name}</p>
                    <p>{profileData.surname}</p>
                    <p>{profileData.email}</p>
                    <p>{profileData.workPhone}</p>
                    <p>{profileData.city}</p>
                    <p>{profileData.country}</p>
                    <p>{profileData.workPlace}</p>
                    <p>{profileData.specialization}</p>
                  </>
                )}
              </div>
            </div>
            {isEditing && (
              <div className="edit-buttons-container-profile">
                <button className="button-profile" onClick={handleSaveClick}>Save Changes</button>
                <button className="button-profile" onClick={handleCancelClick}>Cancel Changes</button>
              </div>
            )}
          </div>
        </div>
        
        

        {showPopup && (
          <div id="popup" className="popup">
            <div className="popup-content">
              <span className="close" onClick={togglePopup}>&times;</span>
              <h2>Confirm Account Deletion</h2>
              <p>Are you sure you want to delete your account? This action cannot be undone.</p>
              <button id="confirmDelete" className="popup-button">Yes, Delete</button>
              <button id="cancelDelete" className="popup-button" onClick={togglePopup}>Cancel</button>
            </div>
          </div>
        )}

      </div>
      <div className="footer-container-profile"><Footer /></div>
    </div>
  );
}

export default Profile;
