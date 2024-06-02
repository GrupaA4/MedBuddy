
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './admin_main_page.module.css';
import Logo from './Logo.png';
import Admin from './Admin.png';

const getCookieValue = (name) => {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  for(const cookie of cookies) {
      if(cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1);
      }
  }
  return null;
}

const emailFromCookie = getCookieValue('user_email');
const passwordFromCookie = getCookieValue('user_pass');

const AdminMainPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); 
  const [userToStartFrom, setUserToStartFrom] = useState(null);
  const [userToEndLoad, setUserToEndLoad] = useState(null);
  const authorisation = btoa(`${emailFromCookie}:${passwordFromCookie}`);

  useEffect(() => {
    const titleElement = document.querySelector(`.${styles.container2__admin__main__page__title}`);
    const texts = ["Welcome back,", "     Admin!"];
    let index = 0;
    let textIndex = 0;
    let finalText = ''; // Variable to hold the final text

    function writeText() {
      let currentText = texts[textIndex];
      if (index < currentText.length) {
        finalText += currentText[index];
        titleElement.innerHTML = finalText;
        index++;
        setTimeout(writeText, 100);
      } else {
        index = 0;
        textIndex++;
        if (textIndex < texts.length) {
          finalText += '<br>';
          finalText += ' ';
          setTimeout(writeText, 100); 
        }
      }
    }

    setTimeout(writeText, 800);
  }, []);

  const redirectTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shiftNews = (direction) => {
    const container = document.querySelector(`.${styles.container1}`);
    const scrollAmount = 200; // Adjust this value to control scroll speed

    if (direction === 'prev') {
      container.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'next') {
      container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const start=1;
        const end=10;
        const responseIds = await fetch(`http://localhost:7264/medbuddy/getoldestusers/${start}/${end}`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${authorisation}`
          }
        });

        if (responseIds.ok) {
          const data = await responseIds.json();
          const userIds = data.users;

          const userDetailsPromises = userIds.map(async (userId) => {
            const userResponse = await fetch(`http://localhost:7264/medbuddy/viewprofile/${userId}`, {
              method: 'GET',
              headers: {
                'Authorization': `Basic ${authorisation}`
              }
            });

            if (userResponse.ok) {
              const userInfo = await userResponse.json();
              return {
                Id: userId,
                userFirstName: userInfo.firstName,
                userLastName: userInfo.lastName,
                userEmail: userInfo.email,
                userPhone: userInfo.phoneNumber,
              };
            }
            return null;
          });

          const userDetails = await Promise.all(userDetailsPromises);
          setUsers(userDetails.filter((user) => user !== null));
        } else {
          console.error('Failed to fetch users information');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [authorisation, userToStartFrom, userToEndLoad]);

  const handleReportClick = () => {
    navigate('/report');
  };

  const handleManageAccountsClick = () => {
    navigate('/user');
  };

  return (
    <div className={styles.body__admin__main__page}>
      <div className={styles.header__admin__main__page}>
        <img src={Logo} className={styles.header__image__admin__main__page} alt="Logo" />
        <div className={styles.header__paragraph__admin__main__page}>
          <a onClick={redirectTop} className={styles.header__paragraph__admin__main__page__part}>Home</a>
          <a onClick={handleReportClick} className={styles.header__paragraph__admin__main__page__part}>Report</a>
          <a onClick={handleManageAccountsClick} className={styles.header__paragraph__admin__main__page__part}>Manage Accounts</a>
        </div>
      </div>

      <div className={styles.container1__admin__main__page} id="current_users">
        <div className={styles.container1__header__admin__main__page}>
          <p className={styles.container1__header__admin__main__text}>CURRENT USERS</p>
        </div>

       
        {/* {[...Array(10).keys()].map(i => (  */}
          {users.map((user, i) => (
          <div key={i} className={styles.container1__admin__main__page__square}>
            <div className={styles.container1__admin__main__page__square__icon}>
              <p>PHOTO</p>
            </div>
            <p className={styles.container1__admin__main__page__square__data}>
              NAME: <span>{user.userLastName} {user.userFirstName}</span><br />
              EMAIL: <span>{user.userEmail}</span><br />
              PHONE: <span>{user.userPhone}</span>
            </p>
          </div>
        ))}
      </div>

      <div className={styles.container2__admin__main__page}>
        <p className={styles.container2__admin__main__page__title}></p>
        <img src={Admin} className={styles.conatiner2__admin__main__page__image} alt="Admin"/>
        <button className={styles.container2__admin__main__page__button1} type="button" onClick={handleReportClick}>REPORT</button><br /><br />
        <button className={styles.container2__admin__main__page__button2} type="button" onClick={handleManageAccountsClick}>MANAGE ACCOUNTS</button>
      </div>
    </div>
  );
};

export default AdminMainPage;