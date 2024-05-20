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

async function getData() {
    const readingArray = await getIds();

    console.log(readingArray);

    let i = 0;
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

                        console.log("Ca nume avem: " + userName);
                        console.log("Ca email avem: " + email);
                        console.log("Ca numar avem: " + phoneNumber);

                        document.getElementById(`ok_${i}`).innerHTML = `NAME: ${userName} <br>
                                                                   Email: ${email} <br>
                                                                   Phone: ${phoneNumber}`;
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