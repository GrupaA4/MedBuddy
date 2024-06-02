import "./List.css";
import Avatar from './avatar.png';
import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function List() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const itemsPerPage = 3;
  const email = 'user@example.com'; // Înlocuiește cu emailul cunoscut

  useEffect(() => {
    const fetchUserIdAndNotifications = async () => {
      try {
        // Prima cerere: obține userId pe baza emailului
        const userIdResponse = await fetch(`http://localhost:7264/medbuddy/getuserid/${email}`, {
          method: 'GET',
        });
        if (!userIdResponse.ok) {
          throw new Error('Network response was not ok for userId fetch');
        }
        const userIdData = await userIdResponse.json();
        const userId = userIdData.id;

        // A doua cerere: obține notificările pe baza userId-ului
        const notificationsResponse = await fetch(`https://27f5a2a1-0f07-4e31-9c2d-7e6b3f3131a1.mock.pstmn.io/medbuddy/getallnotifications/${userId}`, {
          method: 'GET',
        });
        if (!notificationsResponse.ok) {
          throw new Error('Network response was not ok for notifications fetch');
        }
        const notificationsData = await notificationsResponse.json();
        setNotifications(notificationsData.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchUserIdAndNotifications();
  }, []);

  console.log('NOTIFICATIONS: ')
  console.log(notifications);

  const filteredNotifications = notifications.filter(notification =>
    `${notification.firstName} ${notification.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayNotifications = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredNotifications.slice(startIndex, endIndex).map(notification => (
      <div key={notification.id} className="item-conv">
        <img src={Avatar} alt="" />
        <div className="texts-conv">
          <span><span className="userName-conv">{notification.firstName} {notification.lastName}</span> wants to contact you at: </span>
          <a href={`mailto:${notification.email}`} className="emailLink-conv"> <div className="userEmail-conv"><p>{notification.email}</p></div></a>
        </div>
        <div className="diagnoses-conv">See diagnoses</div>
      </div>
    ));
  };

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetăm pagina la 1 când se face o căutare nouă
  };

  return (
    <div className="List">
      <div className="search-conv">
        <div className="searchBar-conv">
          <div className="searchIcon-conv">
            <SearchIcon />
          </div>
          <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
        </div>
      </div>
      <div className="items-conv">
        {displayNotifications()}
      </div>
      <div className="buttons-container-conv">
        <button onClick={previousPage} disabled={currentPage === 1} className="pre&nextpage-button-conv">
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage * itemsPerPage >= filteredNotifications.length} className="pre&nextpage-button">
          Next
        </button>
      </div>
    </div>
  );
}

export default List;
