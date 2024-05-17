import "./List.css"
import Avatar from '../../images/avatar.png';
import React, {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';


function List(){

    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 

  const conversations = [
    { id: 1, user: 'Jane Doe', message: 'Hello' },
    { id: 2, user: 'John Smith', message: 'Hi there' },
    { id: 3, user: 'Alice', message: 'Hey' },
    { id: 4, user: 'Bob', message: 'Good morning' },
    { id: 5, user: 'Eve', message: 'Good evening' },
    { id: 6, user: '1', message: 'Hello' },
    { id: 7, user: '2', message: 'Hi there' },
    { id: 8, user: '3', message: 'Hey' },
    { id: 9, user: '4', message: 'Good morning' },
    { id: 10, user: '5', message: 'Good evening' },
   
  ];


  const displayConversations = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return conversations.slice(startIndex, endIndex).map(conversation => (
      <div className="item" key={conversation.id}>
        <img src={Avatar} alt="" />
        <div className="texts">
          <span>{conversation.user}</span>
          <p>{conversation.message}</p>
        </div>
      </div>
    ));
  };

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (

    <div className="List">
      

    <div className="search">
        <div className="searchBar">
        <div className="searchIcon">
        <SearchIcon/>
        </div>
        <input type="text" placeholder="Search"/>
        </div>
    </div>
    <div className="items">
        {displayConversations()}
    </div>

    <div className="buttons-container">
        <button onClick={previousPage} disabled={currentPage === 1} className="pre&nextpage-button">
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage * itemsPerPage >= conversations.length} className="pre&nextpage-button">
          Next
        </button>
      </div>
    
    
    </div>
  );
}

export default List;