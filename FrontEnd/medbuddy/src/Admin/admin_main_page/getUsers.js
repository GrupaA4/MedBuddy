let userIdsArray = [];

async function getIds() {
    try {
        let response = await fetch("/medbuddy/getoldestusers/:userToStartFrom/:userToEndLoad");
        if (!response.ok) {
            console.log("Could not fetch resource from API");

            response = await fetch("ids.json");
            if (!response.ok) {
                throw new Error("Could not fetch resource");
            }

            const data = await response.json();
            const userIds = data.users;
            userIdsArray = userIds; 
            console.log(userIdsArray);
            return userIdsArray;
        } else{
            const data = await response.json();
            const userIds = data.users;
            userIdsArray = userIds; 
            console.log(userIdsArray);
            return userIdsArray;
        }
    } catch (error) {
        console.error(error);
        return []; 
    }
}

let userName;
let email;
let phoneNumber;
let photo;

async function getData() {
    const readingArray = await getIds();

    console.log(readingArray);

    const names = document.querySelectorAll('.name');
    const emails = document.querySelectorAll('.email');
    const phoneNumbers = document.querySelectorAll('.phone');
    const photos = document.querySelectorAll('.container1__square__icon p');

    let i = 0;
    let index = 0;
    for (let id of readingArray) {
        i++;
        console.log(i);
        try {
            let response = await fetch(`/medbuddy/viewprofile/:userId`);
            if (!response.ok) {
                console.log("Could not fetch resource from API");

                response = await fetch("users.json");
                if (!response.ok) {
                    throw new Error("Could not fetch resource asta");
                }

                const users = await response.json();
                users.forEach(user => {
                    if (id == user.id) {
                        userName = user.firstName + " " + user.lastName;
                        email = user.email;
                        phoneNumber = user.phoneNumber;
                        photo = user.photo;

                        
                        names[index].textContent = userName;
                        emails[index].textContent = email;
                        phoneNumbers[index].textContent = phoneNumber;
                        photos[index].textContent = photo;

                        index++;
                        
                    }
                });
            } else {
                const user = await response.json();
                if (id == user.id) {
                    userName = user.firstName + " " + user.lastName;
                    email = user.email;
                    phoneNumber = user.phoneNumber;

                    console.log("Ca nume avem: " + userName);
                    console.log("Ca email avem: " + email);
                    console.log("Ca numar avem: " + phoneNumber);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}



getData(); 

/* let userIdsArray = [];
const specificIds = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]; // ID-urile specifice pe care vrei să le preiei
let currentPage = 0;
const itemsPerPage = 10;

async function getIds() {
    try {
        let response = await fetch("/medbuddy/getoldestusers/:userToStartFrom/:userToEndLoad");
        if (!response.ok) {
            console.log("Could not fetch resource from API");

            response = await fetch("ids.json");
            if (!response.ok) {
                throw new Error("Could not fetch resource");
            }

            const data = await response.json();
            const userIds = data.users;
            userIdsArray = userIds; 
            console.log(userIdsArray);
            return userIdsArray;
        } else {
            const data = await response.json();
            const userIds = data.users;
            userIdsArray = userIds; 
            console.log(userIdsArray);
            return userIdsArray;
        }
    } catch (error) {
        console.error(error);
        return []; 
    }
}

let userName;
let email;
let phoneNumber;

async function getData() {
    const readingArray = await getIds();
    displayPage(readingArray, currentPage);
}

function displayPage(array, page) {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = specificIds.slice(start, end); // Preia doar ID-urile specifice pentru pagina curentă

    const names = document.querySelectorAll('.name');
    const emails = document.querySelectorAll('.email');
    const phoneNumbers = document.querySelectorAll('.phone');

    names.forEach(name => name.textContent = "");
    emails.forEach(email => email.textContent = "");
    phoneNumbers.forEach(phone => phone.textContent = "");

    pageItems.forEach(async (id, index) => {
        try {
            let response = await fetch(`/medbuddy/viewprofile/${id}`);
            if (!response.ok) {
                console.log("Could not fetch resource from API");

                response = await fetch("users.json");
                if (!response.ok) {
                    throw new Error("Could not fetch resource asta");
                }

                const users = await response.json();
                users.forEach(user => {
                    if (id == user.id) {
                        userName = user.firstName + " " + user.lastName;
                        email = user.email;
                        phoneNumber = user.phoneNumber;

                        names[index].textContent = userName;
                        emails[index].textContent = email;
                        phoneNumbers[index].textContent = phoneNumber;
                    }
                });
            } else {
                const user = await response.json();
                if (id == user.id) {
                    userName = user.firstName + " " + user.lastName;
                    email = user.email;
                    phoneNumber = user.phoneNumber;

                    names[index].textContent = userName;
                    emails[index].textContent = email;
                    phoneNumbers[index].textContent = phoneNumber;
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
}

document.getElementById('nextPageButton').addEventListener('click', () => {
    currentPage++;
    displayPage(userIdsArray, currentPage);
});

getData(); */