/*import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './admin_main_page.module.css';
import Logo from '../assets/MedBuddy.png';

const AdminMainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const titleElement = document.querySelector(`.${styles.container2__title}`);
    const texts = ["Welcome back,", "Admin!"];
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

  const handleReportClick = () => {
    navigate('/report');
  };

  const handleManageAccountsClick = () => {
    navigate('/user');
  };

  return (
    <div className={styles.body_admin_main_page}>
      <div className={styles.header}>
        <img src={Logo} className={styles.header__image} alt="Logo" />
        <div className={styles.header__paragraph}>
          <a onClick={redirectTop} className={styles.header__paragraph__part}>Home</a>
          <a className={styles.header__paragraph__part}>Report</a>
          <a className={styles.header__paragraph__part}>Manage Accounts</a>
        </div>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.container1} id="current_users">
          <div className={styles.upArrow} onClick={() => shiftNews('prev')}>&#8679;</div>
          <div className={styles.container1__header}>
            <p className={styles.container1__header__text}> CURRENT USERS </p>
          </div>
          {[...Array(10).keys()].map(i => (
            <div key={i} className={`${styles.container1__square} ${styles[`userSquare${i + 1}`]}`}>
              <div className={styles.container1__square__icon}>
                <p> PHOTO </p>
              </div>
              <p className={styles.container1__square__data} id={`ok_${i + 1}`}>
                NAME: <br />
                EMAIL: <br />
                PHONE:
              </p>
            </div>
          ))}
          <div className={`${styles.downArrow}`} onClick={() => shiftNews('next')}>&#8681;</div>
        </div>

        <div className={styles.container2}>
          <p className={styles.container2__title}></p>
          <button className={styles.container2__button1} type="button" id="report" onClick={handleReportClick}> REPORT </button><br /><br />
          <button className={styles.container2__button2} type="button" id="manageAccounts" onClick={handleManageAccountsClick}> MANAGE ACCOUNTS </button>
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage; */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './admin_main_page.module.css';
import Logo from './Logo.png';

const AdminMainPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); 
  const [userToStartFrom, setUserToStartFrom] = useState(null);
  const [userToEndLoad, setUserToEndLoad] = useState(null);
  let userIdsArray = [];
  let usersAllArray = [];

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

  /* useEffect(() => {
    const fetchAllUsers = async () => {
      try{
        const responseAll = fetch(`http://localhost:7264/medbuddy/getoldestusers`,{
          method:'GET'});

          if(responseAll.ok){
            const dataAll = await responseAll.json();
            const userIds = dataAll.users;
            usersAllArray = userIds;

          }
      } catch (error){
        console.error('Error fetching all users:', error);
      };
      
    }
    fetchAllUsers();
  }, []); */
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseIds = await fetch(`http://localhost:7264/medbuddy/getoldestusers/${userToStartFrom}/${userToEndLoad}`,{
          method:'GET', 
        });

        if (responseIds.ok) {
          const data = await responseIds.json();
          const userIds = data.users;
          userIdsArray = userIds;

          const startIndex = userIdsArray.indexOf(userToStartFrom);
          const endIndex = userIdsArray.indexOf(userToEndLoad);

          if (startIndex === -1 || endIndex === -1) {
            throw new Error("The given ids aren't valid");
          }
          
          if (startIndex > endIndex) {
            let aux = startIndex;
            startIndex = endIndex;
            endIndex = aux;
          }

          let userMainDetailsPromises;
          for(let i = startIndex; i <= endIndex; i++){
            let userId = userIdsArray[i];
            /* const responseUsers = await fetch(`http://localhost:7264/medbuddy/viewprofile/${userId}`,
            {method:'GET'});

            if(!responseUsers.ok){
              throw new Error("Could not fetch the user information");
            } */

            const userMainDetailsPromises = data.users.map(
              async (userId) => {
                const userMainResponse = await fetch(`http://localhost:7264/medbuddy/viewprofile/${userId}`,
                {method:'GET'})

                if(userMainResponse.ok){
                  const userInfo = await userMainResponse.json();

                  return{
                    Id: userId,
                    userFirstName: userInfo.firstName,
                    userLastName: userInfo.lastName,
                    userEmail: userInfo.email,
                    userPhone: userInfo.phoneNumber, 
                  };
                }
                return null;
              }
            );
          }

          const userDetails = await Promise.all(
            userMainDetailsPromises
          );

          setUsers(userDetails.filter((Id) => Id !== null));
        } else {
          console.error('Failed to fetch users information');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

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

        {[...Array(10).keys()].map(i => (
          <div key={i} className={styles.container1__admin__main__page__square}>
            <div className={styles.container1__admin__main__page__square__icon}>
              <p>PHOTO</p>
            </div>
            <p className={styles.container1__admin__main__page__square__data}>
              NAME: <span className={styles.name}></span><br />
              EMAIL: <span className={styles.email}></span><br />
              PHONE: <span className={styles.phone}></span>
            </p>
          </div>
        ))}
      </div>

      <div className={styles.container2__admin__main__page}>
        <p className={styles.container2__admin__main__page__title}></p>
        <button className={styles.container2__admin__main__page__button1} type="button" onClick={handleReportClick}>REPORT</button><br /><br />
        <button className={styles.container2__admin__main__page__button2} type="button" onClick={handleManageAccountsClick}>MANAGE ACCOUNTS</button>
      </div>
    </div>
  );
};

export default AdminMainPage;