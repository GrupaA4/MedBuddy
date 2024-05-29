//Reminder: add profile image after backend fix and remove comments at line 208
import React, {useState} from 'react';

import '../../fonts/Bebas_Neue/BebasNeue-Regular.ttf';
import SigninPic from '../../images/signup-picture.png';
import MedBuddyLogo from '../../images/MedBuddyLogo2.png';
import styles from './register.module.scss';
import Header from '../../_componentsReusable/header/page';
import Footer from '../../_componentsReusable/footer/page';
import Cookies from 'js-cookie';

export default function SignIn(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [lastName,setLastName]=useState('');
    const [firstName,setFirstName]=useState('');
    const [gender,setGender]=useState(false);
    const [pronoun1,setPronoun1]=useState('');
    const [pronoun2,setPronoun2]=useState('');
    const [dob,setDoB]=useState('');
    const [language,setLanguage]=useState('');
    const [country,setCountry]=useState('');
    const [city,setCity]=useState('');
    const [phone,setPhone]=useState('');
    const [profilePicture,setProfilePicture]=useState(null);
    const [profilePicturePreview, setProfilePicturePreview]=useState(null);
    const [imageExtension, setImageExtension]=useState('');

    const handleEmailChange= (event) =>{
        setEmail(event.target.value);
    };

    const handlePasswordChange= (event) =>{
        setPassword(event.target.value);
    };

    const handleLastNameChange= (event) =>{
        setLastName(event.target.value);
    };

    const handleFirstNameChange= (event) =>{
        setFirstName(event.target.value);
    };

    const handleGenderChange= (event) =>{
        setGender(event.target.value === 'true');
    };

    const handlePronoun1Change= (event) =>{
        setPronoun1(event.target.value);
    };

    const handlePronoun2Change= (event) =>{
        setPronoun2(event.target.value);
    };

    const handleDoBChange= (event) =>{
        setDoB(event.target.value);
    };

    const handleLanguageChange= (event) =>{
        setLanguage(event.target.value);
    };

    const handleCountryChange= (event) =>{
        setCountry(event.target.value);
    };

    const handleCityChange= (event) =>{
        setCity(event.target.value);
    };

    const handlePhoneChange= (event) =>{
        setPhone(event.target.value);
    };

    const handleProfilePicChange= (event) =>{
        const file=event.target.files[0];
        const reader=new FileReader();

        reader.onloadend= () =>{
            setProfilePicture(new Uint8Array(reader.result));
            setProfilePicturePreview(URL.createObjectURL(file));

            const fileExtension=file.name.split('.').pop();
            setImageExtension(fileExtension);
        };

        if(file){
            reader.readAsArrayBuffer(file);
        }
    };

    const handleSubmit= async (event) =>{
        event.preventDefault();

        const phoneRegex = /^\d{10}$/;
        const languageRegex = /^[A-Z]{2}$/;
        const textRegex = /^[a-zA-Z]+$/;
        const firstNameRegex = /^[a-zA-Z-]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if(!email.match(emailRegex)){
            window.alert('Please enter a valid email address');
            return;
        }
        if(!lastName.match(textRegex)){
            window.alert('Last name should contain only letters');
            return;
       }
       if(!firstName.match(firstNameRegex)){
            window.alert('First name should contain only letters');
            return;
       }
       if(!pronoun1.match(textRegex)){
            window.alert('Pronoun 1 should contain only letters');
            return;
       }
       if(!pronoun2.match(textRegex)){
            window.alert('Pronoun 2 should contain only letters');
            return;
       }
       if(!language.match(languageRegex)){
            window.alert('Language should contain only 2 capital letters');
            return;
       }
       if(!country.match(textRegex)){
            window.alert('Country should contain only letters');
            return;
       }
       if(!city.match(textRegex)){
            window.alert('City should contain only letters');
            return;
       }
       if(!phone.match(phoneRegex)){
            window.alert('Phone number should contain only numbers and be exactly 10 digits long');
            return;
       }

        const data = {
            email:email,
            password:password,
            lastName:lastName,
            firstName:firstName,
            gender:gender,
            pronoun1:pronoun1,
            pronoun2:pronoun2,
            dateOfBirth:dob,
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
            const response = await fetch('http://localhost:7264/medbuddy/signup', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': null
                },
                body: JSON.stringify(data),
            });

            if(response.status !== 201){
                if(response.status === 418 || response.status === 500){
                    throw new Error('Internal backend error');
                }
                else if(response.status === 401){
                    throw new Error('Wrong email and password in the header');
                }
                else if(response.status === 400){
                    throw new Error('Typo in the URL or not the right path variable type');
                }
                else if(response.status === 403){
                    throw new Error('Another user with this email exists');
                }
                else{
                    throw new Error('Unknown error');
                }
            }
            else{
                console.log('Successfull authentification');
            }

            Cookies.set(`user_email`, email, {expires: 7});
            Cookies.set(`user_pass`, password, {expires: 7});
            setEmail('');
            setPassword('');
            setLastName('');
            setFirstName('');
            setGender(false);
            setPronoun1('');
            setPronoun2('');
            setDoB('');
            setLanguage('');
            setCountry('');
            setCity('');
            setPhone('');
            setProfilePicture(null);
            setProfilePicturePreview(null);

            //window.location.href='/';
        } catch (error) {
            console.error('Error',error);
            window.alert('An error occured.Please try again later.');
        }
    };

    const [isMobileMenu, setIsMobileMenu] = useState(false);

    return (
        <>
            <Header setIsMobileMenu={setIsMobileMenu}/>
            {!isMobileMenu &&
            <>
            <div className={`${styles.container}`}>
                <div className={`${styles.images_container}`}>
                    <img className={`${styles.images_container__image1}`} src={MedBuddyLogo} alt='Med Buddy'/>
                    <img className={`${styles.images_container__image2}`} src={SigninPic} alt='signup pic'/>
                </div>

                <div className={`${styles.form_container}`}>
                    <h2 className={`${styles.form_container__title}`}>Register</h2>
                    <form className={`${styles.form_container__form}`} onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email'>Email: </label><br />
                            <input
                                type='email'
                                id='email'
                                value={email}
                                onChange={handleEmailChange}
                                placeholder='Enter your email:'
                                required
                            />
                        </div><br />
                        <div>
                            <label htmlFor='password'>Password: </label><br />
                            <input
                                type='password'
                                id='password'
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder='Enter your password:'
                                required
                            />
                        </div><br />
                        <div>
                            <label htmlFor='lastName'>Last Name: </label><br />
                            <input
                                type='text'
                                id='lastName'
                                value={lastName}
                                onChange={handleLastNameChange}
                                placeholder='Enter your last name:'
                                required
                            />
                        </div><br />
                        <div>
                            <label htmlFor='firstName'>First Name: </label><br />
                            <input
                                type='text'
                                id='firstName'
                                value={firstName}
                                onChange={handleFirstNameChange}
                                placeholder='Enter your first name:'
                                required
                            />
                        </div><br />
                        <div>
                            <label>Gender: </label>
                            <div className={`${styles.form_container__form__gender}`}>
                                <label className={`${styles.form_container__form__gender__option}`} htmlFor='male'>
                                    <input 
                                        type='radio'
                                        id='male'
                                        name='gender'
                                        value={false}
                                        checked={gender === false}
                                        onChange={handleGenderChange}
                                        required
                                    />
                                    Male
                                </label>
                                <label className={`${styles.form_container__form__gender__option}`} htmlFor='female'>
                                    <input
                                        type='radio'
                                        id='female'
                                        name='gender'
                                        value={true}
                                        checked={gender === true}
                                        onChange={handleGenderChange}
                                    />
                                    Female
                                </label>
                            </div>
                        </div><br />
                        <div>
                            <label htmlFor='pronoun1'>Pronoun 1: </label><br />
                            <input
                                type='text'
                                id='pronoun1'
                                value={pronoun1}
                                onChange={handlePronoun1Change}
                                placeholder='Enter your first pronoun:'
                            />
                        </div><br />
                        <div>
                            <label htmlFor='pronoun2'>Pronoun 2: </label><br />
                            <input
                                type='text'
                                id='pronoun2'
                                value={pronoun2}
                                onChange={handlePronoun2Change}
                                placeholder='Enter your second pronoun:'
                            />
                        </div><br />
                        <div>
                            <label htmlFor='dob'>Date of birth: </label><br />
                            <input
                                type='date'
                                id='dob'
                                value={dob}
                                onChange={handleDoBChange}
                                required
                            />
                        </div><br />
                        <div>
                            <label htmlFor='language'>Language: </label><br />
                            <input
                                type='text'
                                id='language'
                                value={language}
                                onChange={handleLanguageChange}
                                placeholder='Enter your language:'
                                required
                            />
                        </div><br />
                        <div>
                            <label htmlFor='country'>Country: </label><br />
                            <input
                                type='text'
                                id='country'
                                value={country}
                                onChange={handleCountryChange}
                                placeholder='Enter your country:'
                                required
                            />
                        </div><br />
                        <div>
                            <label htmlFor='city'>City: </label><br />
                            <input
                                type='text'
                                id='city'
                                value={city}
                                onChange={handleCityChange}
                                placeholder='Enter your city:'
                                required
                            />
                        </div><br />
                        <div>
                            <label htmlFor='phone'>Phone number: </label><br />
                            <input
                                type='text'
                                id='phone'
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder='Enter your phone number:'
                                required
                            />
                        </div><br />
                        <div>
                            <label htmlFor='profilePicture'>Profile picture: </label><br />
                            <input
                                type='file'
                                id='profilePicture'
                                value={profilePicture ? profilePicture.name : ''}
                                onChange={handleProfilePicChange}
                                //required
                            />
                        </div><br />
                        <div className={`${styles.form_container__profile_pic}`}>
                            {profilePicture && (
                                <img src={profilePicturePreview} alt='Profile Picture'/>
                            )}
                        </div><br />
                        <button className={`${styles.form_container__form__submit}`} type='submit'>Register</button>
                    </form>
                </div>
            </div>
        </>
    }
            <Footer />
        </>
    );
}