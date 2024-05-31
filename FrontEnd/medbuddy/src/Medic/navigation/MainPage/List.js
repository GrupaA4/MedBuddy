import "./List.css"
import Avatar from './avatar.png';
import React, {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';


function List(){

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
     const itemsPerPage = 3; 

  const conversations = [
    { id: 1, user: 'Jane Doe', message: 'burcaalina348@gmail.com' },
    { id: 2, user: 'John Smith', message: 'user@gmail.com' },
    { id: 3, user: 'Alice', message: 'user@gmail.com' },
    { id: 4, user: 'Bob', message: 'user@gmail.com' },
    { id: 5, user: 'Eve', message:'user@gmail.com' },
    { id: 6, user: '1', message: 'user@gmail.com' },
    { id: 7, user: '2', message: 'user@gmail.com' },
    { id: 8, user: '3', message: 'user@gmail.com' },
    { id: 9, user: '4', message: 'user@gmail.com' },
    { id: 10, user: '5', message: 'user@gmail.com' },
   
  ];
  const filteredConversations = conversations.filter(conversation =>
    conversation.user.toLowerCase().includes(searchTerm.toLowerCase())
);

  const displayConversations = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // return conversations.slice(startIndex, endIndex).map(conversation => (
      return filteredConversations.slice(startIndex, endIndex).map(conversation => (
        <div key={conversation.id} className="item-conv">
        <img src={Avatar} alt="" />
        <div className="texts-conv">
            <span><span className="userName-conv">{conversation.user}</span> wants to contact you at: </span>
            <a href={`mailto:${conversation.message}`} className="emailLink-conv"> <div className="userEmail-conv"><p>{conversation.message}</p></div></a>
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
        <SearchIcon/>
        </div>
        <input type="text" placeholder="Search-conv" value={searchTerm} onChange={handleSearchChange}/>
        </div>
    </div>
    <div className="items-conv">
        {displayConversations()}
    </div>

    <div className="buttons-container-conv">
        <button onClick={previousPage} disabled={currentPage === 1} className="pre&nextpage-button-conv">
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage * itemsPerPage >= conversations.length} className="pre&nextpage-button-conv">
          Next
        </button>
      </div>
    
    
    </div>
  );
}

export default List;