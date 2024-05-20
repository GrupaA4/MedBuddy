let currentPageIndex = 0;

const jsonDataPages = [
    [
      {
        "photo": "photo1.png",
        "name": "John Doe",
        "email": "john@example.com",
        "medicalLicense": "123456"
      },
      {
        "photo": "photo2.png",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "medicalLicense": "654321"
      },
      {
        "photo": "photo3.png",
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "medicalLicense": "112233"
      },
      {
        "photo": "photo4.png",
        "name": "Bob Brown",
        "email": "bob@example.com",
        "medicalLicense": "445566"
      },
      {
        "photo": "photo5.png",
        "name": "Jannete",
        "email": "bob@example.com",
        "medicalLicense": "445566"
      },


    ],
   
    [
      {
        "photo": "photo6.png",
        "name": "Michael Wilson",
        "email": "michael@example.com",
        "medicalLicense": "990011"
      },
      {
        "photo": "photo7.png",
        "name": "Michael Wilson",
        "email": "michael@example.com",
        "medicalLicense": "990011"
      },
      {
        "photo": "phot8.png",
        "name": "Michael Wilson",
        "email": "michael@example.com",
        "medicalLicense": "990011"
      },
      {
        "photo": "photo9.png",
        "name": "Michael Wilson",
        "email": "michael@example.com",
        "medicalLicense": "990011"
      },
      {
        "photo": "photo10.png",
        "name": "Michael Wilson",
        "email": "michael@example.com",
        "medicalLicense": "990011"
      },

    ]

  ];
  

  function populateDataForPage(pageIndex) {
    const jsonData = jsonDataPages[pageIndex];
    const containers = document.querySelectorAll('.container1__square');
    
    containers.forEach((container, index) => {
        if (jsonData[index]) {  
            const data = jsonData[index];
            container.querySelector('.name').textContent = data.name;
            container.querySelector('.email').textContent = data.email;
            container.querySelector('.medicalLicense').textContent = data.medicalLicense;
            container.querySelector('.container1__square__icon p').textContent = 'PHOTO: ' + data.photo;
           
        } else {
            container.style.display = 'none';  
        }
    });
  }
  
  
  document.querySelector('.container1__next').addEventListener('click', () => {
    currentPageIndex++;
    if (currentPageIndex >= jsonDataPages.length) {
      currentPageIndex = 0;
    }
    populateDataForPage(currentPageIndex);
  });
  
  // Function to handle click on "Before" button
  document.querySelector('.container1__before').addEventListener('click', () => {
    currentPageIndex--;
    if (currentPageIndex < 0) {
      currentPageIndex = jsonDataPages.length - 1;
    }
    populateDataForPage(currentPageIndex);
  });
  
  populateDataForPage(currentPageIndex);
