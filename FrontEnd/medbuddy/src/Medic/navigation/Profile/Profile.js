import './Profile.css';
import Footer from '../common-components/Footer';
import Navbar from '../common-components/Navbar';
import Logo from '../common-components/logoB.png';
import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: 'My FirstName',
    lastName: 'My LastName',
    email: 'example@example.com',
    gender: 'M/F',
    pronoun1: 'they',
    pronoun2: 'them',
    dateOfBirth: '01/01/1001',
    language: 'ex',
    country: 'example',
    city: 'example',
    phoneNumber: '0700000000',
    profileImage: '...',
    typeOfMedic: 'example',
    clinic: 'example',
    certificateImage: '...',
  });

  const [initialProfileData, setInitialProfileData] = useState(profileData);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (isEditing) {
      setInitialProfileData(profileData);
    }
  }, [isEditing, profileData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancelChanges = (event) => {
    event.preventDefault();
    setProfileData(initialProfileData);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    setIsDeleting(true);
  };

  const handleConfirmDelete = () => {
    console.log('Account deleted!');
    setIsDeleting(false);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancelChangePassword = (event) => {
    event.preventDefault();
    setPasswords({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsChangingPassword(false);
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    if (passwords.newPassword !== passwords.oldPassword && passwords.newPassword === passwords.confirmPassword) {
      console.log({
        password: passwords.newPassword,
      });
      setPasswords({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="Profile">
      <div className="body">
        <div className='navbar-container'>
          <Navbar />
        </div>
        <div className="content">
          <div className="left-container">
            <div className="profile-picture">
              <img src={Logo} alt="pfp" />
            </div>
            <div className="buttons-container">
              <button onClick={() => setIsEditing(true)} className="button">Edit Profile</button>
              <button onClick={() => setIsChangingPassword(true)} className="button">Change Password</button>
              <button onClick={handleDeleteAccount} className="button">Delete Account</button>
            </div>
          </div>
          <div className="general-information">
            <h2>GENERAL INFORMATION</h2>
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
                <p>{profileData.firstName}</p>
                <p>{profileData.lastName}</p>
                <p>{profileData.email}</p>
                <p>{profileData.phoneNumber}</p>
                <p>{profileData.city}</p>
                <p>{profileData.country}</p>
                <p>{profileData.clinic}</p>
                <p>{profileData.typeOfMedic}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}



// -------------------------------------------------------------------------------------------------------------






// import './Profile.css';
// import Footer from '../common-components/Footer' ;
// import Navbar from '../common-components/Navbar' ;
// import Logo from '../common-components/logoB.png';
// import React, {useState, useEffect} from 'react';


// export default function Profile() {

//   const [profileData, setProfileData] = useState({
//     firstName: 'My FirstName',
//     lastName: 'My LastName',
//     email: 'example@example.com',
//     gender: 'M/F',
//     pronoun1: 'they',
//     pronoun2: 'them',
//     dateOfBirth: '01/01/1001',
//     language: 'ex',
//     country: 'example',
//     city: 'example',
//     phoneNumber: '0700000000',
//     profileImage: '...',
//     typeOfMedic: 'example',
//     clinic: 'example',
//     certificateImage: '...',
//   });

//   const [firstName, setFirstName]=useState('My FirstName');
//   const [lastName, setLastName]=useState('My LastName');
//   const [email, setEmail]=useState('example@example.com');
//   const [gender, setGender]=useState('M/F');
//   const [pronoun1, setPronoun1]=useState('they');
//   const [pronoun2, setPronoun2]=useState('them');
//   const [dateOfBirth, setDateOfBirth]=useState('01/01/1001');
//   const [language, setLanguage]=useState('ex');
//   const [country, setCountry]=useState('example');
//   const [city, setCity]=useState('example');
//   const [phoneNumber, setPhoneNumber]=useState('0700000000');
//   const [profileImage, setProfileImage]=useState('...');
//   const [typeOfMedic, setTypeOfMedic]=useState('example');
//   const [clinic, setClinic]=useState('example');
//   const [certificateImage, setCertificateImage]=useState('...');


//   const [initialFirstName, setInitialFirstName]=useState('My FirstName');
//   const [initialLastName, setInitialLastName]=useState('My LastName');
//   const [initialEmail, setInitialEmail]=useState('example@example.com');
//   const [initialGender, setInitialGender]=useState('M/F');
//   const [initialPronoun1, setInitialPronoun1]=useState('they');
//   const [initialPronoun2, setInitialPronoun2]=useState('them');
//   const [initialDateOfBirth, setInitialDateOfBirth]=useState('01/01/1001');
//   const [initialLanguage, setInitialLanguage]=useState('ex');
//   const [initialCountry, setInitialCountry]=useState('example');
//   const [initialCity, setInitialCity]=useState('example');
//   const [initialPhoneNumber, setInitialPhoneNumber]=useState('0700000000');
//   const [initialProfileImage, setInitialProfileImage]=useState('...');
//   const [initialTypeOfMedic, setInitialTypeOfMedic]=useState('example');
//   const [initialClinic, setInitialClinic]=useState('example');
//   const [initialCertificateImage, setInitialCertificateImage]=useState('...');

//   const [isEditing, setIsEditing] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isChangingPassword, setIsChangingPassword] = useState(false);

//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [initialProfileData, setInitialProfileData] = useState(profileData);

//   useEffect(() => {
//     if (isEditing) {
//       setInitialProfileData(profileData);
//     }
//   }, [isEditing, profileData]);

//   const handleFirstNameChange = (event) => {
//     setFirstName(event.target.value);
//   };

//   const handleLastNameChange = (event) => {
//     setLastName(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleGenderChange = (event) => {
//     setGender(event.target.value);
//   };

//   const handlePronoun1Change = (event) => {
//     setPronoun1(event.target.value);
//   };

//   const handlePronoun2Change = (event) => {
//     setPronoun2(event.target.value);
//   };

//   const handleDateOfBirthChange = (event) => {
//     setDateOfBirth(event.target.value);
//   };

//   const handleLanguageChange = (event) => {
//     setLanguage(event.target.value);
//   };

//   const handleCountryChange = (event) => {
//     setCountry(event.target.value);
//   };

//   const handleCityChange = (event) => {
//     setCity(event.target.value);
//   };

//   const handlePhoneNumberChange = (event) => {
//     setPhoneNumber(event.target.value);
//   };

//   const handleProfileImageChange = (event) => {
//     setProfileImage(event.target.value);
//   };

//   const handleTypeOfMedicChange = (event) => {
//     setTypeOfMedic(event.target.value);
//   };

//   const handleClinicChange = (event) => {
//     setClinic(event.target.value);
//   };

//   const handleCertificateImage = (event) => {
//     setCertificateImage(event.target.value);
//   };

//   console.log({
//     firstName:firstName,
//     lastName:lastName,
//     email:email,
//     gender:gender,
//     pronoun1:pronoun1,
//     pronoun2:pronoun2,
//     dateOfBirth:dateOfBirth,
//     language:language,
//     country:country,
//     city:city,
//     phoneNumber:phoneNumber,
//     profileImage:profileImage,
//     typeOfMedic:typeOfMedic,
//     clinic:clinic,
//     certificateImage:certificateImage
//   });
//   setIsEditing(false);

//   const handleCancelChanges = (event) => {
//     event.preventDefault();
    
//     setFirstName(initialFirstName);
//     setLastName(initialLastName);
//     setEmail(initialEmail);
//     setGender(initialGender);
//     setPronoun1(initialPronoun1);
//     setPronoun2(initialPronoun2);
//     setDateOfBirth(initialDateOfBirth);
//     setLanguage(initialLanguage);
//     setCountry(initialCountry);
//     setCity(initialCity);  
//     setPhoneNumber(initialPhoneNumber);
//     setProfileImage(initialProfileImage);
//     setTypeOfMedic(initialTypeOfMedic);
//     setClinic(initialClinic);
//     setCertificateImage(initialCertificateImage);

//     setIsEditing(false);
// };

// useEffect(() => {
//   if(isEditing) {
//       setInitialFirstName(firstName)
//       setInitialLastName(lastName)
//       setInitialEmail(email)
//       setInitialGender(gender)
//       setInitialPronoun1(pronoun1)
//       setInitialPronoun2(pronoun2)
//       setInitialDateOfBirth(dateOfBirth)
//       setInitialLanguage(language)
//       setInitialCountry(country)
//       setInitialCity(city)
//       setInitialPhoneNumber(phoneNumber)
//       setInitialProfileImage(profileImage)
//       setInitialTypeOfMedic(typeOfMedic)
//       setInitialClinic(clinic)
//       setInitialCertificateImage(certificateImage)
//       }
// }, [isEditing]);

// const handleDeleteAccount = () => {
//   setIsDeleting(true);
// };

// const handleConfirmDelete = () => {
//   console.log('Account deleted!')
// };

// const handleCancelDelete = () => {
//   setIsDeleting(false);
// };

//   const handleNewPasswordChange = (event) => {
//     setNewPassword(event.target.value);
// };

// const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
// };

//   const handleCancelChangePassword = (event) => {
//     event.preventDefault();

//     setNewPassword(oldPassword);
//     setConfirmPassword(oldPassword);
//     setIsChangingPassword(false);
// };

// const handleChangePassword = (event) => {
//   event.preventDefault();

//   setOldPassword('Future API call');
//   if(newPassword!==oldPassword && newPassword===confirmPassword){
//       console.log({
//           password:newPassword
//       });
//   }

//   setNewPassword(oldPassword);
//   setConfirmPassword(oldPassword);
//   setIsChangingPassword(false);
// };

// const [isMobileMenu, setIsMobileMenu] = useState(false);

//   return (

//     <div className="Profile">
//       <div className="body">
//       <div className='navbar-container'>
//         <Navbar/>
//       </div>

//         <div className="content">
//           <div className="left-container">
//           <div className="profile-picture">
//         <img src={Logo} alt="pfp" />
//         </div>
//         <div className="buttons-container">
//         <a href="#" className="button">Edit Profile</a>
//         <a href="#" className="button">Change Password</a>
//         <a href="#" className="button">Delete Account</a>
//         </div>
    
//           </div>
          
//           <div className="general-information">
//             <h2>
//               GENERAL INFORMATION
//             </h2>
//             <div className='general-information-container'>
//               <div className='list-1'>
//                 <p>Name</p>
//                 <p>Surname</p>
//                 <p>Email</p>
//                 <p>Work Phone</p>
//                 <p>City</p>
//                 <p>Country</p>
//                 <p>Hospital/Work Place</p>
//                 <p>Specialization</p>
//               </div>
//               <div className='list-2'>
//               {/* <p>My Name</p>
//                 <p>My Surname</p>
//                 <p>example@gmail.com</p>
//                 <p>+0000000000</p>
//                 <p>My City</p>
//                 <p>My Country</p>
//                 <p>Hospital/Work Place</p>
//                 <p>Specialization</p> */}
//                  <p>{profileData.firstName}</p>
//                 <p>{profileData.lastName}</p>
//                 <p>{profileData.email}</p>
//                 <p>{profileData.phoneNumber}</p>
//                 <p>{profileData.city}</p>
//                 <p>{profileData.country}</p>
//                 <p>{profileData.clinic}</p>
//                 <p>{profileData.typeOfMedic}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         </div>
//         <div className="footer-container"><Footer/></div>
        
        



//     </div>
//   );
// }

// //export default Profile;
