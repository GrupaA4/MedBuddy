import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './admin_user_page.module.css';
import Logo from '../assets/MedBuddy.png';
import checklist from '../assets/checklist.png'



const UserPage = () => {
  const [medics, setMedics] = useState([]);
  const navigate = useNavigate();

  const redirectTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const getCookieValue = (name) => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const emailFromCookie = getCookieValue("user_email");
  const passwordFromCookie = getCookieValue("user_pass");
  const authorisation = btoa(`${emailFromCookie}:${passwordFromCookie}`);


 
  
  useEffect(() => {
    const fetchMedics = async () => {
      try {
        const response = await fetch('http://localhost:7264/medbuddy/seerequestingmedics',{
          method:'GET',
          headers: {
            Authorization: `Basic ${authorisation}`,
          },
        });
        if (response.status == 200) {
          const data = await response.json();
          const medicDetailsPromises = data.medics.map(async (medicId) => {
            const medicResponse = await fetch(`http://localhost:7264/medbuddy/viewmedicprofile/${medicId}`, {
              method: 'GET',
              headers: {
                Authorization: `Basic ${authorisation}`,
              },
            });
            
            if (medicResponse.ok) {
              return medicResponse.json();
            }
            return null;
          });

          const medicDetails = await Promise.all(medicDetailsPromises);
          setMedics(medicDetails.filter(medic => medic !== null));
        } else {
          console.error('Failed to fetch medics');
        }
      } catch (error) {
        console.error('Error fetching medics:', error);
      }
    };

   
    fetchMedics();
  }, [authorisation]);

  const handleAccept = async (medicId) => {
    console.log(`Accepting medic with ID: ${medicId}`); // Debugging log
    try {
      const response = await fetch(`http://localhost:7264/medbuddy/allowmedic/${medicId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Basic ${authorisation}`,
        },
      });

      if (response.ok) {
        setMedics((prevMedics) => prevMedics.filter((medic) => medic.medicId !== medicId));
      } else {
        console.error('Failed to accept medic');
      }
    } catch (error) {
      console.error('Error accepting medic:', error);
    }
  };

  const handleDeny = async (medicId) => {
    console.log(`Denying medic with ID: ${medicId}`); // Debugging log
    try {
      const response = await fetch(`http://localhost:7264/medbuddy/softdeleteuser/${medicId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Basic ${authorisation}`,
        },
      });

      if (response.ok) {
        setMedics((prevMedics) => prevMedics.filter((medic) => medic.medicId !== medicId));
      } else {
        console.error('Failed to deny medic account');
      }
    } catch (error) {
      console.error('Error denying medic:', error);
    }
  };


  return (
    <div className={styles.body_admin_user_page}>
      <div className={styles.admin_user_page_header}>
        <img src={Logo} className={styles.admin_user_page_header__image} alt="Logo" />
        <div className={styles.admin_user_page_header__paragraph}>
          <a
            className={styles.admin_user_page_header__paragraph__part}
            onClick={() => navigate('/admin')}
          >
            Home
          </a>
          <a
            className={styles.admin_user_page_header__paragraph__part}
            onClick={() => navigate('/report')}
          >
            Report
          </a>
          <a
            className={styles.admin_user_page_header__paragraph__part}
            onClick={redirectTop}
            style={{ textDecoration: 'underline', textDecorationColor: '#369986' }}
          >
            Manage Accounts
          </a>
        </div>
      </div>

      <div className={styles.admin_user_page_container1} id="current_users">
        <div className={styles.admin_user_page_container1__header}>
          <p className={styles.admin_user_page_container1__header__text}>Unverified accounts</p>
          <div className={styles.admin_user_page_container1__buttons}>
          <button className={styles.admin_user_page_container1__before } /*onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}*/>&#8678;</button>
            <button className={styles.admin_user_page_container1__next} /*onClick={() => paginate(currentPage + 1)}
          disabled={currentMedics.length < medicsPerPage}*/>&#8680;</button>
          </div>
        </div>

        {medics.map((medic) => (
          <div key={medic.medicId} className={styles.admin_user_page_container1__square}>
            <div className={styles.admin_user_page_container1__square__icon_and_data}>
              <div className={styles.admin_user_page_container1__square__icon}>
                <p>PHOTO</p>
              </div>
              <div className={styles.admin_user_page_container1__square__data}>
                <div className={styles.admin_user_page_container1__square__data__info}>NAME: <span className={styles.name}>{medic.lastName} {medic.firstName}</span></div>
                <div className={styles.admin_user_page_container1__square__data__info}> EMAIL: <span className={styles.email}>{medic.email}</span></div>
                <div className={styles.admin_user_page_container1__square__data__info}>MEDICAL LICENSE: <span className={styles.medicalLicense}>{medic.medicalLicense}</span></div>
              </div>
            </div>
            <div className={styles.admin_user_page_container1__square__data__buttons}>
              <button className={styles.admin_user_page_container1__button1} type="button" onClick={() => handleAccept(medic.medicId)}>Accept</button>
              <button className={styles.admin_user_page_container1__button2} type="button" onClick={() => handleDeny(medic.medicIdid)}>Deny</button>
              <button className={styles.admin_user_page_container1__button3} type="button">Check License</button>
            </div>
          </div>
        ))}
      </div>


      <div className={styles.admin_user_page_container2}>
      
        <img src={checklist} className={styles.admin_user_page_container2_checklistPhoto}  alt="Checklist" ></img>
        <div className={styles.admin_user_page_container2_upperText}>Handle today's requests!</div>
      </div>
    </div>
  );
};

export default UserPage;