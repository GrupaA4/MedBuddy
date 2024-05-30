//Reminder:  add profile image after backend fix and remove comments at line 416
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import '../../fonts/Bebas_Neue/BebasNeue-Regular.ttf';
import styles from './profile.module.scss';
import Header from '../../_componentsReusable/header/page';
import Footer from '../../_componentsReusable/footer/page';
import profilePic from '../../images/profile.svg';
import Cookies from 'js-cookie';

const getCookieValue = (name) => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for(const cookie of cookies) {
        if(cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export default function Profile(){
    const [userId, setUserId] = useState('');
    const emailFromCookie = getCookieValue('user_email');
    const passwordFromCookie = getCookieValue('user_pass');

    const [name, setName] = useState('My Name');
    const [surname, setSurname] = useState('My Surname');
    const [email, setEmail] = useState('example@example.com');
    const [phone, setPhone] = useState('0000000000');
    const [gender, setGender] = useState(false);
    const [pronoun1, setPronoun1] = useState('....');
    const [pronoun2, setPronoun2] = useState('....');
    const [language, setLanguage] = useState('EN');
    const [birthDate, setBirthDate] = useState('01/01/2000');
    const [homeAdress, setHomeAdress] = useState('City, Country');
    const [profilePicture,setProfilePicture]=useState(null);
    const [profilePicturePreview, setProfilePicturePreview]=useState(null);
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
    const [initialHomeAdress, setInitialHomeAdress] = useState('City, Country');
    const [initialProfilePicture, setInitialProfilePicture] = useState(null);
    const [initialProfilePicturePreview, setinitialProfilePicturePreview]=useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const authorisation = btoa(`${emailFromCookie}:${passwordFromCookie}`);

    useEffect(() =>{
        const fetchuserId = async () => {
            try{
                const response = await fetch(`http://localhost:7264/medbuddy/getuserid/${emailFromCookie}`, {
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

    useEffect(() => {
        const fetchUserData = async () => {
            if(userId) {
                try {
                    const response = await fetch(`http://localhost:7264/medbuddy/viewprofile/${userId}`, {
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
                    setEmail(userData.email);
                    setSurname(userData.lastName);
                    setName(userData.firstName);
                    setGender(userData.gender);
                    setPronoun1(userData.pronoun1);
                    setPronoun2(userData.pronoun2);
                    setBirthDate(userData.dateOfBirth);
                    setLanguage(userData.language);
                    setHomeAdress(userData.city + ', ' + userData.country);
                    setPhone(userData.phoneNumber);
                    //setProfilePicture(userData.profileImage);

                    setInitialEmail(email);
                    setInitialSurname(surname);
                    setInitialName(name);
                    setInitialGender(gender);
                    setInitialPronoun1(pronoun1);
                    setInitialPronoun2(pronoun2);
                    setInitialBirthDate(birthDate);
                    setInitialLanguage(language);
                    setInitialHomeAdress(homeAdress);
                    setInitialPhone(phone);
                    //setInitialProfilePicture(profilePicture);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
        fetchUserData();
    }, [userId]);

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

    const handleGenderChange = (event) => {
        setGender(event.target.value === 'true');
    };

    const handlePronoun1Change = (event) => {
        setPronoun1(event.target.value);
    };

    const handlePronoun2Change = (event) => {
        setPronoun2(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleBirthDateChange = (event) => {
        setBirthDate(event.target.value);
    };

    const handleHomeAdressChange = (event) => {
        setHomeAdress(event.target.value);
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

    const transformDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}.${month}.${year}`;
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    
    const handleSaveChanges = async (event) => {
        event.preventDefault();

        const phoneRegex = /^\d{10}$/;
        const languageRegex = /^[A-Z]{2}$/;
        const textRegex = /^[a-zA-Z]+$/;
        const firstNameRegex = /^[a-zA-Z-]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const homeAddressRegex = /^[a-zA-Z\s,]+$/;


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
       if(!homeAdress.match(homeAddressRegex)){
            window.alert('Home address must contain only letters.The home address is composed of only city and country.They are separated by a comma and a whitespace.');
            return;
       }
       if(!phone.match(phoneRegex)){
            window.alert('Phone number should contain only numbers and be exactly 10 digits long');
            return;
       }

        const addressParts = homeAdress.split(', ');

        if(addressParts.length !== 2){
            window.alert('Address should contain exactly one comma (to separate City and Country)');
            return;
        }
        const transformedDob = transformDate(birthDate);
        const city = addressParts[0];
        const country = addressParts[1];
        const data = {
            email:email,
            password:passwordFromCookie,
            lastName:surname,
            firstName:name,
            gender:gender,
            pronoun1:pronoun1,
            pronoun2:pronoun2,
            dateOfBirth:transformedDob,
            language:language,
            country:country,
            city:city,
            phoneNumber:phone,
            //profileImage:profilePicture,
            //imageExtension:imageExtension,
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
        setHomeAdress(initialHomeAdress);
        //setProfilePicture(initialProfilePicture);
        //setProfilePicturePreview(initialProfilePicturePreview);
        setIsEditing(false);
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
            setInitialHomeAdress(homeAdress)
            //setInitialProfilePicture(profilePicture)
            //setinitialProfilePicturePreview(profilePicturePreview)
        }
    }, [isEditing]);

    const handleDeleteAccount = () => {
        setIsDeleting(true);
    };

    const handleConfirmDelete = async () => {
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
            setIsDeleting(false);
            //window.location.href='/';
        }
    };

    const handleCancelDelete = () => {
        setIsDeleting(false);
    };

    const handleCancelChangePassword = (event) => {
        event.preventDefault();

        setNewPassword(oldPassword);
        setConfirmPassword(oldPassword);
        setIsChangingPassword(false);
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();

        setOldPassword(getCookieValue('user_pass'));
        if(newPassword!==oldPassword && newPassword===confirmPassword){
            const data = {
                email:email,
                password:newPassword,
                lastName:surname,
                firstName:name,
                dateOfBirth:birthDate
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

                setIsChangingPassword(false);
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

    const [isMobileMenu, setIsMobileMenu] = useState(false);

    return (
        <>
            <Header setIsMobileMenu={setIsMobileMenu}/>
            {!isMobileMenu &&
            <>
                <div className={`${styles.container}`}>
                    <div className={`${styles.buttons_container}`}>
                        <br /><br />
                        {isEditing ? (
                            <>

                            </>
                        ) : (
                            <>
                                <img className={`${styles.buttons_container__image}`} src={profilePic} alt='Profile Pic' /><br /><br />
                            </>
                        )}
                        {isEditing ? (
                            <>
                                <button className={`${styles.buttons_container__cancel_changes} ${styles.button}`} onClick={handleCancelChanges}>Cancel Changes</button><br /><br />
                                <button className={`${styles.buttons_container__save_changes} ${styles.button}`} onClick={handleSaveChanges}>Save Changes</button><br /><br />
                            </>
                        ) : (
                            <>
                                <button className={`${styles.buttons_container__edit_profile} ${styles.button}`} onClick={() => setIsEditing(true)}>Edit Profile</button><br /><br />
                            </>
                        )}
                        {isChangingPassword ? (
                            <>
                                <button className={`${styles.buttons_container__cancel_change_password} ${styles.button}`} onClick={handleCancelChangePassword}>Cancel Password Change</button><br /><br />
                            </>
                        ) : (
                            <>
                                <button className={`${styles.buttons_container__change_password} ${styles.button}`} onClick={() => setIsChangingPassword(true)}>Change Password</button><br /><br />
                            </>
                        )}
                        {isDeleting ? (
                            <>
                                <button className={`${styles.buttons_container__cancel_delete} ${styles.button}`} onClick={handleCancelDelete}>Cancel Delete Account</button><br /><br />
                                <button className={`${styles.buttons_container__confirm_delete} ${styles.button}`} onClick={handleConfirmDelete}>Confirm Delete Account</button><br /><br />
                            </>
                        ) : (
                            <>
                                <button className={`${styles.buttons_container__delete_account} ${styles.button}`} onClick={handleDeleteAccount}>Delete Account</button><br /><br />
                            </>
                        )}
                    </div>
                    {isChangingPassword ? (
                        <>
                            <div className={`${styles.form_container}`}>
                                <h2 className={`${styles.form_container__title}`}>Change your password</h2>
                                <form className={`${styles.form_container__form}`} onSubmit={handleChangePassword}>
                                    <div>
                                        <label htmlFor='newpassword'>New password: </label><br />
                                        <input
                                            type='password'
                                            id='newpassword'
                                            value={newPassword}
                                            onChange={handleNewPasswordChange}
                                            placeholder='Enter your new password:'
                                            required
                                        />
                                    </div><br />
                                    <div>
                                        <label htmlFor='confirmpassword'>Confirm password: </label><br />
                                        <input
                                            type='password'
                                            id='confirmpassword'
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            placeholder='Confirm your password:'
                                            required
                                        />
                                    </div><br />
                                    <button className={`${styles.form_container__form__submit} ${styles.button}`} type='submit'>Submit</button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <>
                        <div className={`${styles.general_information_container}`}>
                        <section className={`${styles.general_information_container__section}`}>
                            <h2 className={`${styles.general_information_container__section__title}`}>General Information</h2>
                            {isEditing ? (
                                <div className={`${styles.general_information_container__section__editable_information}`}>
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label htmlFor='name'>Name </label>
                                        <input
                                            type='text'
                                            id='name'
                                            value={name}
                                            onChange={handleNameChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label htmlFor='surname'>Surname </label>
                                        <input
                                            type='text'
                                            id='surname'
                                            value={surname}
                                            onChange={handleSurnameChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label htmlFor='email'>Email </label>
                                        <input
                                            type='email'
                                            id='email'
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label htmlFor='phone'>Phone </label>
                                        <input
                                            type='text'
                                            id='phone'
                                            value={phone}
                                            onChange={handlePhoneChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label>Gender </label>
                                        <div className={`${styles.general_information_container__section__editable_information__gender}`}>
                                            <label className={`${styles.general_information_container__section__editable_information__gender__option}`} htmlFor='male'>
                                                <input
                                                    type='radio'
                                                    id='male'
                                                    name='gender'
                                                    value={false}
                                                    checked={gender === false}
                                                    onChange={handleGenderChange}
                                                />
                                                Male
                                            </label>
                                            <label className={`${styles.general_information_container__section__editable_information__gender__option}`} htmlFor='female'>
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
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label htmlFor='pronoun1'>Pronoun1 </label>
                                        <input
                                            type='text'
                                            id='pronoun1'
                                            value={pronoun1}
                                            onChange={handlePronoun1Change}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label htmlFor='pronoun2'>Pronoun2 </label>
                                        <input
                                            type='text'
                                            id='pronoun2'
                                            value={pronoun2}
                                            onChange={handlePronoun2Change}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label htmlFor='language'>Language </label>
                                        <input
                                            type='text'
                                            id='language'
                                            value={language}
                                            onChange={handleLanguageChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label htmlFor='dob'>Birth Date </label>
                                        <input
                                            type='date'
                                            id='dob'
                                            value={birthDate}
                                            onChange={handleBirthDateChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label htmlFor='adress'>Home Adress(first city then country) </label>
                                        <input
                                            type='text'
                                            id='adress'
                                            value={homeAdress}
                                            onChange={handleHomeAdressChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label htmlFor='profilePicture'>Profile Picture </label>
                                        <input
                                            type='file'
                                            id='profilePicture'
                                            value={profilePicture ? profilePicture.name : ''}
                                            onChange={handleProfilePicChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__picture}`}>
                                        {profilePicture && (
                                            <img src={profilePicturePreview} alt='Profile Picture'/>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className={`${styles.general_information_container__section__non_editable_information}`}>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3>Name </h3>
                                        <p>{name}</p>
                                    </div> 
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3>Surname </h3>
                                        <p>{surname}</p>    
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3>Email </h3>
                                        <p>{email}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3>Phone </h3>
                                        <p>{phone}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3>Gender </h3>
                                        <p>{gender ? 'F' : 'M'}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3>Pronoun1 </h3>
                                        <p>{pronoun1}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3>Pronoun2</h3>
                                        <p>{pronoun2}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3>Language </h3>
                                        <p>{language}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3>Birth Date </h3>
                                        <p>{birthDate}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3>Home Adress </h3>
                                        <p>{homeAdress}</p>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>
                    </>
                    )}
                </div>
            </>
        }
            <Footer/>
        </>
    );
}