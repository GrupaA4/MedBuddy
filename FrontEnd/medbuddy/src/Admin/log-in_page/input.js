let Email;

let Password;

const emails = [];

const passwords = [];

function extractCredentials(){
    try {
        return fetch("users.json")
            .then(response => response.json())
            .then(users => {
                const emails = [];
                const passwords = [];
                users.forEach(user => {
                    emails.push(user.email);
                    passwords.push(user.password);
                });
                return { emails, passwords }; 
            })
            .catch(error => {
                console.error("A apărut o eroare:", error);
                throw error; 
            });
    } catch (error) {
        console.error('A apărut o eroare:', error);
        throw error; 
    }

}


document.getElementById("login").onclick = async function(){

    document.getElementById("myWarning").style.color = "red";

    const {emails, passwords} = await extractCredentials();

    Email = document.getElementById("email").value;
    Password = document.getElementById("password").value;
    if(!Email && !Password){
        document.getElementById("myWarning").textContent = `You must enter your email and password!`;
    }
    else if(!Email){
        document.getElementById("myWarning").textContent = `You must enter your email!`;
    }
    else if(!Email.endsWith("@yahoo.com") && !Email.endsWith("@gmail.com") && !Email.endsWith("@hotmail.com") && !Email.endsWith("@YAHOO.COM") && !Email.endsWith("@GMAIL.COM") && !Email.endsWith("@HOTMAIL.COM")){
        document.getElementById("myWarning").textContent = `Inavlid Email! Try Again!`;
    }
    else if(!Password){
        document.getElementById("myWarning").textContent = `You must enter your password!`;
    }
    else{
        
        let i = 0;
        let j = 0;

        let okEmail = false;
        let okPassword = false;
        let okFinal = false;

        for(let email of emails){
            i++;

            if(Email === email){
                okEmail = true;
                break;
            }
        }
    
        for(let password of passwords){
            j++

            if(Password === password){
                okPassword = true;
                break;
            }
        }
        
        if(i == j){
            okFinal = true;
        }

        if(!okEmail || !okPassword || !okFinal){
            document.getElementById("myWarning").textContent = `The user doesn't exist`;
        }
        else{
            document.getElementById("myWarning").style.color = "green";
            document.getElementById("myWarning").textContent = `The user exists`;
        }

        
    }
}