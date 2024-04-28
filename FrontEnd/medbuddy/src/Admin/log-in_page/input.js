let Email;

let Password;

document.getElementById("login").onclick = function(){
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
        document.getElementById("myWarning").textContent = ``;
    }

    console.log(Email);
    console.log(Password);
}