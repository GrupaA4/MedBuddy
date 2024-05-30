import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './admin_user_page.module.css';
import Logo from '../assets/MedBuddy.png';



const UserPage = () => {
  const[medics,setMedics]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [medicsPerPage] = useState(5);
  const [selectedMedic, setSelectedMedic] = useState(null);
  const navigate = useNavigate();

  const redirectTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

 
  
  useEffect(() => {
    const fetchMedics = async () => {
      try {
        const response = await fetch('http://localhost:7264/medbuddy/seerequestingmedics',{
          method:'GET'
        });
        if (response.ok) {
          const data = await response.json();
          const medicDetailsPromises = data.medics.map(async (medicId) => {
            const medicResponse = await fetch(`http://localhost:7264/medbuddy/viewmedicprofile/${medicId}`,
              {method:'GET'}
            );
            
            if (medicResponse.ok) {
              const medic = await medicResponse.json();
            
              return {
                id: medicId,
                firstName: medic.firstName,
                lastName: medic.lastName,
                email: medic.email,
                medicalLicense: medic.medicalLicense
            }
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
  }, []);

  const handleAccept = async (medicId) => {
    try {
      const response = await fetch(`http://localhost:7264/medbuddy/allowmedic/${medicId}`, {
        method: 'PATCH',
      });

      if (response.ok) {
        setMedics((prevMedics) => prevMedics.filter((medic) => medic !== medicId));
      } else {
        console.error('Failed to accept medic');
      }
    } catch (error) {
      console.error('Error accepting medic:', error);
    }
  };

  const handleDeny = async(medicId) => {
    try{
      const response=await fetch('http://localhost:7264/medbuddy/softdeleteuser/:${medicId}', {
        method:'PATCH',
      });
  
      if(response.ok){
        setMedics((prevMedics) => prevMedics.filter((medic) => medic.id !== medicId));
      }else{
        console.error('Failed to deny medic account');
      }
    }catch(error){
      console.error('Error denying medic:',error);
    }
    
  };

  //ASTA NU MERGE INCA
  const handleLicenseCheck = async (medicId) => {
    try {
      const response = await fetch(`http://localhost:7264/medbuddy/viewmedicprofile/${medicId}`,{
        method:'GET'
      });
      if (response.ok) {
        const medicProfile = await response.json();
        setSelectedMedic(medicProfile);
      } else {
        console.error('Failed to fetch medic profile');
      }
    } catch (error) {
      console.error('Error fetching medic profile:', error);
    }
  };


  const indexOfLastMedic = currentPage * medicsPerPage;
  const indexOfFirstMedic = indexOfLastMedic - medicsPerPage;
  const currentMedics = medics.slice(indexOfFirstMedic, indexOfLastMedic);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
          <button className={styles.admin_user_page_container1__before } onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}>&#8678;</button>
            <button className={styles.admin_user_page_container1__next}onClick={() => paginate(currentPage + 1)}
          disabled={currentMedics.length < medicsPerPage}>&#8680;</button>
          </div>
        </div>

        {medics.map((medic, i)=> (
          <div className={styles.admin_user_page_container1__square}>
            <div className={styles.admin_user_page_container1__square__icon_and_data}>
            <div className={styles.admin_user_page_container1__square__icon}>
              <p>PHOTO</p>
            </div>
            <div className={styles.admin_user_page_container1__square__data}>
            <div className={styles.admin_user_page_container1__square__data__info}>NAME: <span className={styles.name}>{medic.firstName} {medic.lastName}</span></div>
                <div className={styles.admin_user_page_container1__square__data__info}> EMAIL: <span className={styles.email}>{medic.email}</span></div>
                <div className={styles.admin_user_page_container1__square__data__info}>MEDICAL LICENSE: <span className={styles.medicalLicense}>{medic.medicalLicense}</span></div>
            </div>
            </div>
             <div className={styles.admin_user_page_container1__square__data__buttons}>
              <button className={styles.admin_user_page_container1__button1} type="button" onClick={() => handleAccept(medic.id)}>Accept</button>
              <button className={styles.admin_user_page_container1__button2} type="button" onClick={() => handleDeny(medic.id)}>Deny</button>
              <button className={styles.admin_user_page_container1__button3} type="button" onClick={() => handleLicenseCheck(medic.id)}>Check License</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.admin_user_page_container2}>
        <div className={styles.admin_user_page_container2_icon__and__text}>
          <div className={styles.admin_user_page_container2__square1__icon}>
            <p>PHOTO</p>
          </div>
          <div className={styles.admin_user_page_container2__text1}>Hey Admin!</div>
          <div className={styles.admin_user_page_container2__text2}>Do one of the following actions below:</div>
          
        </div>
        <button className={styles.admin_user_page_container2__button1} type="button">Accept</button>
        <button className={styles.admin_user_page_container2__button2} type="button">Deny</button>
        <button className={styles.admin_user_page_container2__button3} type="button">Verify License</button>
      </div>
    </div>
  );
};

export default UserPage;
