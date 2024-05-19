import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import '../../fonts/Bebas_Neue/BebasNeue-Regular.ttf';
import styles from './profile.module.scss';
import Header from '../../_componentsReusable/header/page';
import Footer from '../../_componentsReusable/footer/page';
import profilePic from '../../images/profile.svg';

export default function Profile(){
    const [name, setName] = useState('My Name');
    const [surname, setSurname] = useState('My Surname');
    const [email, setEmail] = useState('example@example.com');
    const [phone, setPhone] = useState('+0000000000');
    const [gender, setGender] = useState('M/F');
    const [pronoun1, setPronoun1] = useState('....');
    const [pronoun2, setPronoun2] = useState('....');
    const [language, setLanguage] = useState('English');
    const [birthDate, setBirthDate] = useState('01/01/2000');
    const [homeAdress, setHomeAdress] = useState('House Nr. 00 Str. Example, City, Country');
    const [profilePicture,setProfilePicture]=useState(null);
    const [profilePicturePreview, setProfilePicturePreview]=useState(null);

    const [initialName, setInitialName] = useState('My Name');
    const [initialSurname, setInitialSurname] = useState('My Surname');
    const [initialEmail, setInitialEmail] = useState('example@example.com');
    const [initialPhone, setInitialPhone] = useState('+0000000000');
    const [initialGender, setInitialGender] = useState('M/F');
    const [initialPronoun1, setInitialPronoun1] = useState('....');
    const [initialPronoun2, setInitialPronoun2] = useState('....');
    const [initialLanguage, setInitialLanguage] = useState('English');
    const [initialBirthDate, setInitialBirthDate] = useState('01/01/2000');
    const [initialHomeAdress, setInitialHomeAdress] = useState('House Nr. 00 Str. Example, City, Country');
    const [initialProfilePicture, setInitialProfilePicture] = useState(null);
    const [initialProfilePicturePreview, setinitialProfilePicturePreview]=useState(null);

    const [bloodGroup, setBloodGroup] = useState('00 Rh+');
    const [alergies, setAlergies] = useState('None');

    const [initialBloodGroup, setInitialBloodGroup] = useState('00 Rh+');
    const [initialAlergies, setInitialAlergies] = useState('None');

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
        setGender(event.target.value);
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

    const handleBloodGroupChange = (event) => {
        setBloodGroup(event.target.value);
    };

    const handleAlergiesChange = (event) => {
        setAlergies(event.target.value);
    };

    const handleProfilePicChange= (event) =>{
        const file=event.target.files[0];
        const reader=new FileReader();

        reader.onloadend= () =>{
            setProfilePicture(new Uint8Array(reader.result));
            setProfilePicturePreview(URL.createObjectURL(file));
        };

        if(file){
            reader.readAsArrayBuffer(file);
        }
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    
    const handleSaveChanges = async (event) => {
        event.preventDefault();

        const data = {
            email:email,
            name:name,
            surname:surname,
            gender:gender,
            pronoun1:pronoun1,
            pronoun2:pronoun2,
            birthDate:birthDate,
            language:language,
            //eliminare homeAdress, inlocuire cu country si city(parsare homeAdress)
            //homeAdress:homeAdress,
            phone:phone,
            profileImage:profilePicture,
            //blood_group:bloodGroup,
            //alergies:alergies
        };

        console.log('Data to be sent:', data);

        try {
            const response = await fetch('/medbuddy/changeprofile/${userId}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if(!response.ok){
                throw new Error('Error sending new data');
            }

            const result= await response.json();
            console.log('Success:', result);

            setIsEditing(false);
        } catch (error) {
            console.error('Error:', error);
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
        setProfilePicturePreview(initialProfilePicturePreview);
        setBloodGroup(initialBloodGroup);
        setAlergies(initialAlergies);
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
            setInitialProfilePicture(profilePicture)
            setinitialProfilePicturePreview(profilePicturePreview)
            setInitialBloodGroup(bloodGroup)
            setInitialAlergies(alergies)
        }
    }, [isEditing]);

    const handleDeleteAccount = () => {
        setIsDeleting(true);
    };

    const handleConfirmDelete = async () => {
        try{
            const response= await fetch('/medbuddy/harddeleteuser/${userId}', {
                method: 'DELETE'
            });

            if(response.ok) {
                console.log('Account deleted!');
            } else{
                console.error('Failed to delete account');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
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

        setOldPassword('access cookie/global variable');
        if(newPassword!==oldPassword && newPassword===confirmPassword){
            const data = {
                password:newPassword
            };

            console.log('Data to be sent:', data);

            try {
                const response = await fetch('medbuddy/changepassword(not real API name)', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if(!response.ok){
                    throw new Error('Error sending password');
                }

                const result= await response.json();
                console.log('Success:', result);

                setIsChangingPassword(false);
            } catch (error) {
                console.error('Error:', error);
            }
        } else{
            setNewPassword(oldPassword);
            setConfirmPassword(oldPassword);
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
                                                    value={gender}
                                                    onChange={handleGenderChange}
                                                />
                                                Male
                                            </label>
                                            <label className={`${styles.general_information_container__section__editable_information__gender__option}`} htmlFor='female'>
                                                <input
                                                    type='radio'
                                                    id='female'
                                                    name='gender'
                                                    value={gender}
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
                                        <label htmlFor='adress'>Home Adress </label>
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
                                        <p>{gender}</p>
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
                    <div className={`${styles.medical_data_container}`}>
                        <section className={`${styles.medical_data_container_container__section}`}>
                            <h2 className={`${styles.medical_data_container__section__title}`}>Medical Data</h2>
                            {isEditing ? (
                                <div className={`${styles.medical_data_container__section__editable_information}`}>
                                    <div className={`${styles.medical_data_container__section__editable_information__div}`}>
                                        <label htmlFor='blood_group'>Blood Group </label>
                                        <input
                                            type='text'
                                            id='blood_group'
                                            value={bloodGroup}
                                            onChange={handleBloodGroupChange}
                                        />
                                    </div><br />
                                    <div className={`${styles.medical_data_container__section__editable_information__div}`}>
                                        <label htmlFor='alergies'>Alergies </label>
                                        <input
                                            type='text'
                                            id='alergies'
                                            value={alergies}
                                            onChange={handleAlergiesChange}
                                        />
                                    </div>
                                </div>
                            ) : (
                               <div className={`${styles.medical_data_container__section__non_editable_information}`}>
                                    <div className={`${styles.medical_data_container__section__non_editable_information__div}`}>
                                        <h3>Blood Group </h3>
                                        <p>{bloodGroup}</p>
                                    </div>
                                    <div className={`${styles.medical_data_container__section__non_editable_information__div}`}>
                                        <h3>Alergies </h3>
                                        <p>{alergies}</p>
                                    </div>
                                    <Link className={`${styles.medical_data_container__section__non_editable_information__diagnostics_link}`} to="/diagnoses">
                                        My Diagnoses
                                    </Link>
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