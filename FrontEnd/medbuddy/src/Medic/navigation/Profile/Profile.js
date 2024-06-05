import React, { useState , useEffect} from 'react';
import './Profile.css';
import Footer from '../common-components/Footer';
import Navbar from '../common-components/Navbar';
import Logo from '../common-components/logoB.png';
import Cookies from 'js-cookie';

export default function Profile() {

  //delete account window
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const togglePopupDelete = () => {
    setShowPopupDelete(!showPopupDelete);
  };
  //change password window
  const [showPopupPassword, setShowPopupPassword] = useState(false);

  const togglePopupPassword = () => {
    setShowPopupPassword(!showPopupPassword);
  };
  //edit profile mode
  const [isEditing, setIsEditing] = useState(false);
  //basic account info
  const [userId, setUserId] = useState('');
    const emailFromCookie = Cookies.get("user_email");
    const passwordFromCookie = Cookies.get("user_pass");
  //info for account
    const [name, setName] = useState('My Name');
    const [surname, setSurname] = useState('My Surname');
    const [email, setEmail] = useState('example@example.com');
    const [phone, setPhone] = useState('0000000000');
    const [gender, setGender] = useState(false);
    const [pronoun1, setPronoun1] = useState('....');
    const [pronoun2, setPronoun2] = useState('....');
    const [language, setLanguage] = useState('EN');
    const [birthDate, setBirthDate] = useState('01/01/2000');
    const [country, setCountry] = useState('Country');
    const [city, setCity] = useState('City');
    const [clinic, setClinic] = useState('Clinic');
    const [specialization, setSpecialization] = useState('Specialization');
    const [profilePicture,setProfilePicture]=useState('');
    /////extension IMAGE
    const [imageExtension, setImageExtension]=useState('');


    const [initialName, setInitialName] = useState('My Name');
    const [initialSurname, setInitialSurname] = useState('My Surname');
    const [initialEmail, setInitialEmail] = useState('example@example.com');
    const [initialPhone, setInitialPhone] = useState('0000000000');
    const [initialGender, setInitialGender] = useState(false);
    const [initialPronoun1, setInitialPronoun1] = useState('....');
    const [initialPronoun2, setInitialPronoun2] = useState('....');
    const [initialLanguage, setInitialLanguage] = useState('EN');
    const [initialBirthDate, setInitialBirthDate] = useState('01/01/2000');
    const [initialCountry, setInitialCountry] = useState('Country');
    const [initialCity, setInitialCity] = useState('City');
    const [initialClinic, setInitialClinic] = useState('Clinic');
    const [initialSpecialization, setInitialSpecialization] = useState('Specialization');
    const [initialProfilePicture, setInitialProfilePicture] = useState('');
    

    const [imageUrl, setImageUrl] = useState("");
    const [extension, setExtension] = useState(""); //////////extensie CE

    const authorisation = btoa(`${emailFromCookie}:${passwordFromCookie}`);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //obtinut id user
    useEffect(() =>{
      const fetchuserId = async () => {
          try{
              const response = await fetch(`http://localhost:7264/medbuddy/getuserid/${emailFromCookie}`, {
                  method: 'GET',
                  headers: {
                      'Authorization': `Basic ${authorisation}`
                  }
              });
              console.log("Email: ", emailFromCookie);
              console.log("Parola: ", passwordFromCookie);
              if(response.status !== 200){
                  if(response.status === 418 || response.status === 500){
                      throw new Error('Internal backend error');
                  }
                  else if(response.status === 401){
                      throw new Error('Wrong email and password in the header');
                  }
                  else if(response.status === 400){
                      throw new Error('Typo in the URL or not the right path variable type');
                  }
                  else if(response.status === 404){
                      throw new Error('No user was found');
                  }
                  else{
                      throw new Error('Unknown error');
                  }
              }
              else{
                  console.log('Retrieved ID successfully');
              }

              const data = await response.json();
              setUserId(data.id);
          } catch (error) {
              console.error('Error:', error);
          }
      };
      fetchuserId();
  }, [emailFromCookie]);

  
  //afisare informatii cont
  useEffect(() => {
    const fetchUserData = async () => {
        if(userId) {
            try {
                const response = await fetch(`http://localhost:7264/medbuddy/viewmedicprofile/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Basic ${authorisation}`
                    }
                });

                if(response.status !== 200){
                    if(response.status === 418 || response.status === 500){
                        throw new Error('Internal backend error');
                    }
                    else if(response.status === 401){
                        throw new Error('Wrong email and password in the header');
                    }
                    else if(response.status === 400){
                        throw new Error('Typo in the URL or not the right path variable type');
                    }
                    else if(response.status === 404){
                        throw new Error('No user was found');
                    }
                    else{
                        throw new Error('Unknown error');
                    }
                }
                else{
                    console.log('Retrieved profile successfully');
                }
                const userData = await response.json();
                console.log(userData);
                setEmail(userData.email);
                setSurname(userData.lastName);
                setName(userData.firstName);
                setGender(userData.gender);
                setPronoun1(userData.pronoun1);
                setPronoun2(userData.pronoun2);
                setBirthDate(userData.dateOfBirth);
                console.log('zi nastere '+birthDate);
                setLanguage(userData.language);
                setCity(userData.city);
                setCountry(userData.country);
                setPhone(userData.phoneNumber);
                setSpecialization(userData.typeOfMedic);
                setClinic(userData.clinic); 
                //setClinic('clinic');
                console.log('clinica: '+userData.clinic);
                setProfilePicture(userData.profileImage);
                setExtension(userData.imageExtension);
                


                setInitialEmail(email);
                setInitialSurname(surname);
                setInitialName(name);
                setInitialGender(gender);
                setInitialPronoun1(pronoun1);
                setInitialPronoun2(pronoun2);
                setInitialBirthDate(birthDate);
                setInitialLanguage(language);
                setInitialCountry(country);
                setInitialCity(city);
                setInitialPhone(phone);
                setInitialSpecialization(specialization);
                setInitialClinic(clinic);
                setInitialProfilePicture(profilePicture);
                
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    fetchUserData();
}, [userId]);

useEffect(() => {
    
    setImageUrl(`data:image/${imageExtension};base64,${profilePicture}`);
    console.log(imageUrl);
  }, [profilePicture, imageExtension]);



  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };


  const handleNameChange = (event) => {
    setName(event.target.value);
};

const handleSurnameChange = (event) => {
    setSurname(event.target.value);
};

const handleEmailChange = (event) => {
    setEmail(event.target.value);
};

const handlePhoneChange = (event) => {
    setPhone(event.target.value);
};

const handleCountryChange = (event) => {
    setCountry(event.target.value);
};

const handleCityChange = (event) => {
  setCity(event.target.value);
};

const handleProfilePicChange= (event) =>{
    const file=event.target.files[0];
    const reader=new FileReader();

    reader.onloadend= () =>{
        setProfilePicture(reader.result);

        const fileExtension=file.name.split('.').pop();
        if(!['png', 'jpg', 'jpeg'].includes(fileExtension)){
            alert('Please select a PNG or JPG file.');
            return;
        }
        setImageExtension(fileExtension);
    };

    if(file){
        reader.readAsDataURL(file);
    }
};

const transformDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
};

const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
};

const handleSaveChanges = async (event) => {
  event.preventDefault();

  const phoneRegex = /^\d{10}$/;
  const languageRegex = /^[A-Z]{2}$/;
  const textRegex = /^[a-zA-Z ]+$/;
  const firstNameRegex = /^[a-zA-Z-]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  

  if(!email.match(emailRegex)){
      window.alert('Please enter a valid email address');
      return;
  }
  if(!surname.match(textRegex)){
      window.alert('Last name should contain only letters');
      return;
 }
 if(!name.match(firstNameRegex)){
      window.alert('First name should contain only letters');
      return;
 }
//  if(!pronoun1.match(textRegex)){
//       window.alert('Pronoun 1 should contain only letters');
//       return;
//  }
//  if(!pronoun2.match(textRegex)){
//       window.alert('Pronoun 2 should contain only letters');
//       return;
//  }
//  if(!language.match(languageRegex)){
//       window.alert('Language should contain only 2 capital letters');
//       return;
//  }
 if(!country.match(textRegex)){
      window.alert('Country must contain only letters');
 }

 if(!city.match(textRegex)){
  window.alert('City must contain only letters');
}
 if(!phone.match(phoneRegex)){
      window.alert('Phone number should contain only numbers and be exactly 10 digits long');
      return;
 }

 
  const transformedDob = transformDate(birthDate);
  const data = {
      email:email,
      password:passwordFromCookie,
      lastName:surname,
      firstName:name,
      gender:gender,
      pronoun1:pronoun1,
      pronoun2:pronoun2,
      dateOfBirth:birthDate,
      language:language,
      country:country,
      city:city,
      phoneNumber:phone,
      profileImage:profilePicture,
      imageExtension:imageExtension,
      admin:false
  };

  console.log('Data to be sent:', data);

  try {
      const response = await fetch(`http://localhost:7264/medbuddy/changeprofile/${userId}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${authorisation}`
          },
          body: JSON.stringify(data)
      });

      if(response.status !== 200){
          if(response.status === 418 || response.status === 500){
              throw new Error('Internal backend error');
          }
          else if(response.status === 401){
              throw new Error('Wrong email and password in the header');
          }
          else if(response.status === 400){
              throw new Error('Typo in the URL or not the right path variable type');
          }
          else if(response.status === 404){
              throw new Error('No user was found');
          }
          else{
              throw new Error('Unknown error');
          }
      }
      else{
          console.log('Updated profile successfully');
      }

      setIsEditing(false);
  } catch (error) {
      console.error('Error:', error);
      window.alert('An error occured.Please try again later.');
  }
};

useEffect(() => {
  if(isEditing) {
      setInitialName(name)
      setInitialSurname(surname)
      setInitialEmail(email)
      setInitialPhone(phone)
      setInitialGender(gender)
      setInitialPronoun1(pronoun1)
      setInitialPronoun2(pronoun2)
      setInitialLanguage(language)
      setInitialBirthDate(birthDate)
      setInitialCountry(country)
      setInitialCity(city)
      setInitialClinic(clinic)
      setInitialSpecialization(specialization)
      setInitialProfilePicture(profilePicture)
      ;
  }
}, [isEditing]);

const handleCancelChanges = (event) => {
  event.preventDefault();
  
  setName(initialName);
  setSurname(initialSurname);
  setEmail(initialEmail);
  setPhone(initialPhone);
  setGender(initialGender);
  setPronoun1(initialPronoun1);
  setPronoun2(initialPronoun2);
  setLanguage(initialLanguage);
  setBirthDate(initialBirthDate);
  setCountry(initialCountry);
  setCity(initialCity);
  setClinic(initialClinic);
  setSpecialization(initialSpecialization);
  setProfilePicture(initialProfilePicture);
  setIsEditing(false);
};

const handleLogout = async () => {
    window.location.href='/';
}
const handleDeleteAccount = async () => {
  try{
      const response= await fetch(`http://localhost:7264/medbuddy/harddeleteuser/${userId}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Basic ${authorisation}`
          }
      });

      if(response.status !== 200){
          if(response.status === 418 || response.status === 500){
              throw new Error('Internal backend error');
          }
          else if(response.status === 401){
              throw new Error('Wrong email and password in the header');
          }
          else if(response.status === 400){
              throw new Error('Typo in the URL or not the right path variable type');
          }
          else if(response.status === 404){
              throw new Error('No user was found');
          }
          else{
              throw new Error('Unknown error');
          }
      }
      else{
          console.log('Profile deleted successfully');
      }

  } catch (error) {
      console.error('Error deleting account:', error);
      window.alert('An error occured.Please try again later.');
  } finally {
      window.location.href='/';
  }
};

const handleNewPasswordChange = (event) => {
  setNewPassword(event.target.value);
};

const handleConfirmPasswordChange = (event) => {
  setConfirmPassword(event.target.value);
};

const handleChangePassword = async (event) => {
  event.preventDefault();

  const lastTimeLoggedOn = getCurrentDate();

  setOldPassword(Cookies.get("user_pass"));
  if(newPassword!==oldPassword && newPassword===confirmPassword){
      const data = {
            email:email,
            password:newPassword,
            lastName:surname,
            firstName:name,
            gender:gender,
            pronoun1:pronoun1,
            pronoun2:pronoun2,
            dateOfBirth:birthDate,
            language:language,
            country:country,
            city:city,
            phoneNumber:phone,
            profileImage:profilePicture,
            imageExtension:imageExtension,
            admin:false,
            lastTimeLoggedOn:lastTimeLoggedOn
      };

      console.log('Data to be sent:', data);

      try {
          const response = await fetch(`http://localhost:7264/medbuddy/changeprofile/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authorisation}`
            },
            body: JSON.stringify(data)
          });

          if(response.status !== 200){
              if(response.status === 418 || response.status === 500){
                  throw new Error('Internal backend error');
              }
              else if(response.status === 401){
                  throw new Error('Wrong email and password in the header');
              }
              else if(response.status === 400){
                  throw new Error('Typo in the URL or not the right path variable type');
              }
              else if(response.status === 404){
                  throw new Error('No user was found');
              }
              else{
                  throw new Error('Unknown error');
              }
          }
          else{
              console.log('Changed password successfully');
              Cookies.set('user_pass', newPassword);
          }

      } catch (error) {
          console.error('Error:', error);
          window.alert('An error occured.Please try again later.');
      }
  } else{
      setNewPassword(oldPassword);
      setConfirmPassword(oldPassword);
      window.alert('Inputed password matches the old password or confirm password doesn\'t match the new password');
  }
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
              <img className="pfp" src={imageUrl ? imageUrl : Logo} alt='Profile Picture' />
            </div>
            <div className="buttons-container-profile">
                <button className="button-profile" onClick={handleEditClick}>Edit Profile</button>
                <button className="button-profile" onClick={togglePopupPassword}>Change Password</button>
                <button className="button-profile" onClick={togglePopupDelete}>Delete Account</button>
                <button className="button-profile" onClick={handleLogout}>Log out</button>
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
                    <input className="input_field" type="text" name="name" value={name} onChange={handleNameChange} />
                    <input className="input_field" type="text" name="surname" value={surname} onChange={handleSurnameChange} />
                    <input className="input_field" type="email" name="email" value={email} onChange={handleEmailChange} />
                    <input className="input_field" type="text" name="workPhone" value={phone} onChange={handlePhoneChange} />
                    <input className="input_field" type="text" name="city" value={city} onChange={handleCityChange} />
                    <input className="input_field" type="text" name="country" value={country} onChange={handleCountryChange} />
                    <p>{clinic}</p>
                    <p>{specialization}</p>

                    
                                         <input
                                            className="input_field"
                                            type='file'
                                            id='profilePicture'
                                            accept="image/png, image/jpg, image/jpeg"
                                            value={profilePicture ? profilePicture.name : ''}
                                            onChange={handleProfilePicChange}
                                        />
                                    
                  </>
                ) : (
                  <>
                    <p>{name}</p>
                    <p>{surname}</p>
                    <p>{email}</p>
                    <p>{phone}</p>
                    <p>{city}</p>
                    <p>{country}</p>
                    <p>{clinic}</p>
                    <p>{specialization}</p>
                  </>
                )}
              </div>
            </div>
            {isEditing && (
              <div className="edit-buttons-container-profile">
                <button className="button-profile" onClick={handleSaveChanges}>Save Changes</button>
                <button className="button-profile" onClick={handleCancelChanges}>Cancel Changes</button>
              </div>
            )}
          </div>
        </div>
        
        

        {showPopupDelete && (
          <div id="popupDelete" className="popupDelete">
            <div className="popupDelete-content">
              <span className="close" onClick={togglePopupDelete}>&times;</span>
              <h2>Confirm Account Deletion</h2>
              <p>Are you sure you want to delete your account? This action cannot be undone.</p>
              <button id="confirmDelete" className="popupDelete-button" onClick={handleDeleteAccount}>Yes, Delete</button>
              <button id="cancelDelete" className="popupDelete-button" onClick={togglePopupDelete}>Cancel</button>
            </div>
          </div>
        )}


        {showPopupPassword && (
          <div id="popupPassword" className="popupPassword">
            <div className="popupPassword-content">
              <span className="closePassword" onClick={togglePopupPassword}>&times;</span>
              <h2>Change your Password</h2>
              <div className="password-fields">
              <div className="password-section">
                <label className="newPassword">New Password:</label>
                <input className="inputPassword" type='password' id='newpassword' value={newPassword}
                 onChange={handleNewPasswordChange}  placeholder='Enter your new password:'  required/>
              </div>

              <div className="password-section">
              <label className="newPasswordConfirm">Retype Password:</label>
              <input className="inputPassword" type='password' id='confirmpassword' value={confirmPassword}
               onChange={handleConfirmPasswordChange}  placeholder='Enter your new password:'  required/>
              </div>
              </div>
              <button id="confirmChange" className="popupPassword-button" onClick={handleChangePassword}>Change</button>
              <button id="cancelChange" className="popupPassword-button" onClick={togglePopupPassword}>Cancel</button>
            </div>
          </div>
        )}

      </div>
      <div className="footer-container-profile"><Footer /></div>
    </div>
  );
}


