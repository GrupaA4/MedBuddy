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
    const [emailFromCookie, setEmailFromCookie] = useState('');
    const [passwordFromCookie, setPasswordFromCookie] = useState('');

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

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [imageUrl, setImageUrl] = useState("");
    const [extension, setExtension] = useState("");

    const authorisation = btoa(`${emailFromCookie}:${passwordFromCookie}`);
    const [mailFlag, setEmailFlag] = useState(false);

    useEffect(() =>{
        setEmailFromCookie(getCookieValue('user_email'));
        setPasswordFromCookie(getCookieValue('user_pass'));
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
                    setInitialHomeAdress(homeAdress);
                    setInitialPhone(phone);
                    setInitialProfilePicture(profilePicture);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
        fetchUserData();
    }, [userId]);

    useEffect(() => {
        setImageUrl(`data:image/${extension};base64,${profilePicture}`);
      }, [profilePicture, extension]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailFlag(true);
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
            profileImage:profilePicture,
            imageExtension:imageExtension,
            admin:false
        };

        console.log('Data to be sent:', data);
        if(mailFlag === true){
            Cookies.set('user_email', email);
            setEmailFromCookie(email);
        }

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
                setEmailFlag(false);
                console.log('Updated profile successfully');
            }

            setIsEditing(false);
        } catch (error) {
            console.error('Error:', error);
            window.alert('An error occured.Please try again later.');
            setEmailFlag(false);
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
        setProfilePicture(initialProfilePicture);
        setIsEditing(false);
        setEmailFlag(false);
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
            setInitialProfilePicture(profilePicture)
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
            window.location.href='/';
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

        const lastTimeLoggedOn = getCurrentDate();
        const addressParts = homeAdress.split(', ');
        const city = addressParts[0];
        const country = addressParts[1];

        setOldPassword(getCookieValue('user_pass'));
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
                    setPasswordFromCookie(newPassword);
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

    const handleLogout = async (event) => {
        event.preventDefault();

        Cookies.remove('user_pass');
        Cookies.remove('user_email');
        window.location.href='/';
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
                                <img className={`${styles.buttons_container__image}`} src={imageUrl ? imageUrl : profilePic} alt='Profile Picture' /><br /><br />
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
                        <button className={`${styles.buttons_container__logout} ${styles.button}`} onClick={handleLogout}>Logout</button><br /><br />
                    </div>
                    {isChangingPassword ? (
                        <>
                            <div className={`${styles.form_container}`}>
                                <h2 className={`${styles.form_container__title}`}>Change your password</h2>
                                <form className={`${styles.form_container__form}`} onSubmit={handleChangePassword}>
                                    <div>
                                        <label 
                                            className={`${styles.form_container__form__label}`}
                                            htmlFor='newpassword'>New password: </label><br />
                                        <input
                                            className={`${styles.form_container__form__input}`}
                                            type='password'
                                            id='newpassword'
                                            value={newPassword}
                                            onChange={handleNewPasswordChange}
                                            placeholder='Enter your new password:'
                                            required
                                        />
                                    </div><br />
                                    <div>
                                        <label 
                                            className={`${styles.form_container__form__label}`}
                                            htmlFor='confirmpassword'>Confirm password: </label><br />
                                        <input
                                            className={`${styles.form_container__form__input}`}
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
                                        <label 
                                            className={`${styles.general_information_container__section__editable_information__div__label}`}
                                            htmlFor='name'>Name </label>
                                        <input
                                            className={`${styles.general_information_container__section__editable_information__div__input}`}
                                            type='text'
                                            id='name'
                                            value={name}
                                            onChange={handleNameChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label 
                                            className={`${styles.general_information_container__section__editable_information__div__label}`}
                                            htmlFor='surname'>Surname </label>
                                        <input
                                            className={`${styles.general_information_container__section__editable_information__div__input}`}
                                            type='text'
                                            id='surname'
                                            value={surname}
                                            onChange={handleSurnameChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label 
                                            className={`${styles.general_information_container__section__editable_information__div__label}`}
                                            htmlFor='email'>Email </label>
                                        <input
                                            className={`${styles.general_information_container__section__editable_information__div__input}`}
                                            type='email'
                                            id='email'
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label 
                                            className={`${styles.general_information_container__section__editable_information__div__label}`}
                                            htmlFor='phone'>Phone </label>
                                        <input
                                            className={`${styles.general_information_container__section__editable_information__div__input}`}
                                            type='text'
                                            id='phone'
                                            value={phone}
                                            onChange={handlePhoneChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label className={`${styles.general_information_container__section__editable_information__div__label}`}>Gender </label>
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
                                            <label 
                                                className={`${styles.general_information_container__section__editable_information__gender__option}`} 
                                                htmlFor='female'>
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
                                        <label 
                                            className={`${styles.general_information_container__section__editable_information__div__label}`}
                                            htmlFor='pronoun1'>Pronoun1 </label>
                                        <input
                                            className={`${styles.general_information_container__section__editable_information__div__input}`}
                                            type='text'
                                            id='pronoun1'
                                            value={pronoun1}
                                            onChange={handlePronoun1Change}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label 
                                            className={`${styles.general_information_container__section__editable_information__div__label}`}
                                            htmlFor='pronoun2'>Pronoun2 </label>
                                        <input
                                            className={`${styles.general_information_container__section__editable_information__div__input}`}
                                            type='text'
                                            id='pronoun2'
                                            value={pronoun2}
                                            onChange={handlePronoun2Change}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label 
                                            className={`${styles.general_information_container__section__editable_information__div__label}`}
                                            htmlFor='language'>Language </label>
                                        <input
                                            className={`${styles.general_information_container__section__editable_information__div__input}`}
                                            type='text'
                                            id='language'
                                            value={language}
                                            onChange={handleLanguageChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label 
                                            className={`${styles.general_information_container__section__editable_information__div__label}`}
                                            htmlFor='dob'>Birth Date </label>
                                        <input
                                            className={`${styles.general_information_container__section__editable_information__div__input__dob}`}
                                            type='date'
                                            id='dob'
                                            value={birthDate}
                                            onChange={handleBirthDateChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.general_information_container__section__editable_information__div}`}>
                                        <label 
                                            className={`${styles.general_information_container__section__editable_information__div__label}`}
                                            htmlFor='adress'>Home Adress(first city then country) </label>
                                        <input
                                            className={`${styles.general_information_container__section__editable_information__div__input}`}
                                            type='text'
                                            id='adress'
                                            value={homeAdress}
                                            onChange={handleHomeAdressChange}
                                        />
                                    </div><br />
                                </div>
                            ) : (
                                <div className={`${styles.general_information_container__section__non_editable_information}`}>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3 className={`${styles.general_information_container__section__non_editable_information__div__h3}`}>Name </h3>
                                        <p className={`${styles.general_information_container__section__non_editable_information__div__p}`}>{name}</p>
                                    </div> 
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3 className={`${styles.general_information_container__section__non_editable_information__div__h3}`}>Surname </h3>
                                        <p className={`${styles.general_information_container__section__non_editable_information__div__p}`}>{surname}</p>    
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3 className={`${styles.general_information_container__section__non_editable_information__div__h3}`}>Email </h3>
                                        <p className={`${styles.general_information_container__section__non_editable_information__div__p}`}>{email}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3 className={`${styles.general_information_container__section__non_editable_information__div__h3}`}>Phone </h3>
                                        <p className={`${styles.general_information_container__section__non_editable_information__div__p}`}>{phone}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3 className={`${styles.general_information_container__section__non_editable_information__div__h3}`}>Gender </h3>
                                        <p className={`${styles.general_information_container__section__non_editable_information__div__p}`}>{gender ? 'F' : 'M'}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3 className={`${styles.general_information_container__section__non_editable_information__div__h3}`}>Pronoun1 </h3>
                                        <p className={`${styles.general_information_container__section__non_editable_information__div__p}`}>{pronoun1}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3 className={`${styles.general_information_container__section__non_editable_information__div__h3}`}>Pronoun2</h3>
                                        <p className={`${styles.general_information_container__section__non_editable_information__div__p}`}>{pronoun2}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3 className={`${styles.general_information_container__section__non_editable_information__div__h3}`}>Language </h3>
                                        <p className={`${styles.general_information_container__section__non_editable_information__div__p}`}>{language}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3 className={`${styles.general_information_container__section__non_editable_information__div__h3}`}>Birth Date </h3>
                                        <p className={`${styles.general_information_container__section__non_editable_information__div__p}`}>{birthDate}</p>
                                    </div>
                                    <div className={`${styles.general_information_container__section__non_editable_information__div}`}>
                                        <h3 className={`${styles.general_information_container__section__non_editable_information__div__h3}`}>Home Adress </h3>
                                        <p className={`${styles.general_information_container__section__non_editable_information__div__p}`}>{homeAdress}</p>
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